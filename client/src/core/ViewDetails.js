import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Base  from './Base'
import { addItemToCart } from './helper/cartHelper'

import { getProduct } from '../admin/helper/adminapicall'
import { ErrorFS } from './Test'

const ViewDetails = ({match, history}) => {
    const [product, setProduct] = useState()
    const [redirect, setRedirect] = useState(false)

    const getARedirect = (redirect) => {
        if(redirect){
          return <Redirect to="/cart"/>
        }
    }

    const addToCart = () => {
        addItemToCart(product,()=>setRedirect(!redirect))
    }

    const preload = () => {
        getProduct(match.params.prodId)
        .then(data=>{
            if(data.err){
                console.log(data.err)
            }else{
                setProduct(data)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const ViewDetailsCard = () => {
        if(product){
          const {name,price,urlPhoto,desc} = product
          return (
              <div className="my-2 lg:mx-20">
                   <div className="shadow-lg rounded-lg customCard">
                   <div className="customCardImg">
                   <img src={urlPhoto} alt="name" className="rounded-tl-lg rounded-tr-lg gridImage" />
                   </div>
              <div className="p-2 customCardP">
                <h3><p className="text-2xl">{name}</p></h3>
                <div className="flex flex-row my-1">
                  <p  className=" text-gray-darkest font-semibold rounded-md px-2 py-1 mr-2 text-xl" >&#x20B9;{price}</p>
                </div>
                <div className="flex flex-row my-1">
                  <p className=" text-gray-darkest font-semibold rounded-md px-2 py-1 mr-2 text-xl" >{desc}</p>
                </div>
                <div className="flex flex-col xl:flex-row justify-between">
                <button  onClick={addToCart}  className="bg-gradient-to-r from-pink-dark to-pink-dark rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-dark hover:to-pink flex flex-row justify-center" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to cart
            </button>
            
          </div>
              </div>
            </div>
              </div>
          ) 
          }else{
              return <ErrorFS msg='Something went wrong'/>
          }
      }
    
    useEffect(() => {
    preload()
    }, [])

    return (
        <Base>
        <div>
            {getARedirect(redirect)}
            {ViewDetailsCard()}
            <div className="text-center mx-10" >
            <button className="text-center mx-10 my-3 font-bold text-pink-dark hover:text-pink-darker underline px-4 text-2xl"
            onClick = {()=>{history.goBack()}}
            >
            Go Back
            </button>
            </div>
        </div>
        </Base>
    )
}

export default ViewDetails
