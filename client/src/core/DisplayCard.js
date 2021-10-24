import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { addItemToCart } from './helper/cardHelper';

const DisplayCard = ({name,price,imgLink,product}) => {

  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItemToCart(product,()=>setRedirect(true))
  }

  const getARedirect = (redirect) => {
    if(redirect){
      return <Redirect to="/cart"/>
    }
  }

    return (
        <div>
             <div className="shadow-lg rounded-lg">
        {getARedirect(redirect)}
        <Link to="/" >
          <img src={imgLink} alt="name" className="rounded-tl-lg rounded-tr-lg gridImage" />
        </Link>
        <div className="p-3">
          <h3><Link to="/" className="text-xl">{name}</Link></h3>
          <div className="flex flex-row my-1">
            <Link to="/"  className=" text-gray-700 font-semibold rounded-md px-2 py-1 mr-2 text-xl" >&#x20B9;{price}</Link>
          </div>
          <div className="flex flex-col xl:flex-row justify-between">
            <button  onClick={addToCart}  className="bg-gradient-to-r from-red-600 to-pink-500 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-pink-600 hover:from-pink-600 hover:to-pink-600 flex flex-row justify-center" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to cart
            </button>
            <Link to="/"  className="bg-purple-600 rounded-full py-2 px-4 my-2 text-sm text-white hover:bg-purple-700 flex flex-row justify-center" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              View Details
            </Link>
          </div>
        </div>
      </div>
        </div>
    )
}

export default DisplayCard
