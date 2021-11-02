import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Base from './Base'
import CartCard from './CartCard'

import { loadCart } from './helper/cartHelper'
import Payment from './Payment'

const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
            {products && products.map((product,idx)=>{
                return <CartCard key={idx} 
                product={product} 
                show={false} 
                qty={1}
                setReload = {setReload}
                reload = {reload}
                 />
            })}
            </div>
        )
    }

    // const loadCheckout = () => {
    //     return (
    //         <div>This section is to checkout</div>
    //     )
    // }
    
    return (
        <Base>
        <h1 className="text-5xl text-center">Your Cart</h1>
        <div className="customCart lg:mx-32">
        <div className="customCartInfo">
        {products.length > 0 ? 
        loadAllProducts(products) : 
        <h3 className="font-bold text-sm text-pink-dark hover:text-pink-darker underline">Cart is empty.<Link to="/shop">SHOP NOW!</Link></h3>
        }
        </div>
        <div className="customCartPayment">
        <Payment products={products} reload={reload} setReload={setReload}/>
        </div>
            {/*  */}
        </div>
        </Base>
    )
}

export default Cart