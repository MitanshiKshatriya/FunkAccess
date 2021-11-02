import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Base from '../core/Base'

import { isAuthenticated } from '../auth/helper/index'
import { getUserOrderDetails } from './helper/userapicalls'

const OrdersCard = ({product}) => {
    return (<div className="my-2">

        <h4 className="flex justify-around">
        <Link to={`/product/${product._id}`} className="underline"> <span>{product.name}</span></Link>
        <span className="px-3 py-2 bg-pink-dark text-white rounded-sm italic">{"Order Recieved"}</span>
        </h4>
            </div>
        )
}

const UserDashboard = () => {

    const [ order, setOrder ] = useState([])
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)

    const { token, user } = isAuthenticated()

    const preloadOrder = () => {
        setLoading(true)
        getUserOrderDetails(user._id,token)
        .then(data=>{
            if(data.err){
                setErr(data.err)
            }else{
            setOrder(data)
            }
            setLoading(false)
        })
        .catch(err=>{
            setErr('Some error occured')
            setLoading(false)
        })
    }

    const preload = () => {
        setLoading(true)
        if(user){
            if(!user.name || !user.email){
                setErr(true)
            }
            setLoading(false)
        }
        else{
            setErr('Some error occured')
            setLoading(false)
        }
        preloadOrder()
    }

    useEffect(() => {
        preload()
    }, [])

    const OrderDetails = () => {
        return (
        <div className="my-3">
                {
                    order.length > 0 ? (
                    <>
                    <h2 className='text-2xl text-center my-5 font-semibold underline'>Orders</h2>
                    {
                        order.map((o)=>(
                            <div className="my-2 mx-auto max-w-1/2">
                                <OrdersCard product={o}/>
                            </div>
                        ))
                    }
                    </>
                    ) :
                    (<div><h1 className="text-center text-p"><span>No orders found. </span>
                    <Link to="/shop" className="font-bold text-sm text-pink-dark hover:text-pink-darker underline">Shop Now</Link>
                    </h1></div>)
                }
                </div>
        )
    }

    const Details = () => {
        if(loading){
            return <div> <h1 className="text-center">Loading...</h1> </div>
        }else if(err){
            return <div> <h1 className="text-center text-red">{err}</h1> </div>
        }else{
            return (
            <div className="text-center">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="#BE185D">
  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
</svg>
                </div>
                <div className="my-3">
                    <h2 className='text-2xl'>{user.name}</h2>
                    <h2 className='text-xl my-1'>{user.email}</h2>
                </div>
            </div>
            )
        }
    }

    return (
        <Base title="UserDashboard page">
            <div className="">
            {Details()}
            <hr className="mx-20"/>
            {OrderDetails()}
            </div>
        </Base>
    )
}

export default UserDashboard
