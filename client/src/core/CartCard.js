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
        <div>
             <div className="shadow-lg rounded-lg flex">
             <div className="">
             <img src={urlPhoto} alt="name" className="rounded-tl-lg rounded-tr-lg gridImage" />
             </div>
        <div className="p-3">
          <h3><Link to="/" className="text-xl">{name}</Link></h3>
          <h6>
          <button onClick={addToCart}>+</button>
          {product.count}
          <button onClick={removeOneFromCart}>-</button></h6>
          <div className="flex flex-row my-1">
            <Link to="/"  className=" text-gray-700 font-semibold rounded-md px-2 py-1 mr-2 text-xl" >&#x20B9;{price}</Link>
          </div>
          <div className="flex flex-col xl:flex-row justify-between">
            <button  onClick={removeFromCart}  className="bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-pink-600 hover:to-pink-600 flex flex-row justify-center" >
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
