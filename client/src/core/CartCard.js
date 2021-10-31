import React from 'react'
import { Link } from 'react-router-dom'
import { addItemToCart, removeItemFromCart, removeOneItemFromCart } from './helper/cartHelper'

const CartCard = ({ 
  product,  
  reload = undefined , 
  setReload = f => f // get f back
}) => {
    const {name,price,urlPhoto} = product
    const addToCart = () => {
      addItemToCart(product,()=>setReload(!reload))
    }
    const removeFromCart = () => {
        removeItemFromCart(product._id)
        setReload(!reload)
    }
    const removeOneFromCart = () => {
      removeOneItemFromCart(product._id)
      setReload(!reload)
  }
    return (
        <div className="my-2">
             <div className="shadow-lg rounded-lg customCard">
             <div className="customCardImg">
             <img src={urlPhoto} alt="name" className="rounded-tl-lg rounded-tr-lg gridImage" />
             </div>
        <div className="p-2 customCardP">
          <h3><Link to="/" className="text-2xl">{name}</Link></h3>
          <h6>
          <button onClick={addToCart} className="p-2 text-xl">+</button>
          <span className="border-2 p-2 border-pink-lightest">{product.count}</span>
          <button onClick={removeOneFromCart} className="p-2 text-xl">-</button></h6>
          <div className="flex flex-row my-1">
            <Link to="/"  className=" text-gray-darkest font-semibold rounded-md px-2 py-1 mr-2 text-xl" >&#x20B9;{price}</Link>
          </div>
          <div className="flex flex-col xl:flex-row justify-between">
            <button  onClick={removeFromCart}  className="bg-gradient-to-r from-pink-darker to-pink-dark rounded-full lg:py-2 lg:px-4 lg:my-2 p-2 text-sm text-white hover:bg-pink-dark hover:from-pink-dark hover:to-pink-dark flex flex-row justify-center" >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
              Remove from Cart
            </button>
            
          </div>
        </div>
      </div>
        </div>
    )
}

export default CartCard
