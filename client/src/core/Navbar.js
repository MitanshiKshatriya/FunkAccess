import React from 'react'
import {NavLink} from 'react-router-dom'



export default function Navbar(props) {
    
    const styles = {
        naItems: "text-gray-600 hover:text-purple-600 hover:no-underline p-3",
        navGradient: "bg-gradient-to-r" 
        +"from-purple-400 to-red-400 w-10 h-10"
        +"rounded-lg"
    }
    return (
        <div className=""> {/** */}
        <div className="md:flex md:flex-row md:justify-between text-center">
            <div className="flex flex-row justify-center">
            <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline-block" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
</svg>
            </div>
            <h1 className="md:text-3xl text-2xl ml-3.0 font-fontLogo">FunkAccess</h1>
            </div>
            <div className="mt-2">
                <NavLink exact to="/" 
                className={styles.naItems}
                activeClassName="nav-active"
                >Home</NavLink>
                <NavLink to="/shop" 
                className={styles.naItems}
                activeClassName="text-purple-500"
                >Shop</NavLink>
                <NavLink to="/contact" 
                activeClassName="text-purple-500"
                className={styles.naItems}
                >Contact</NavLink>
                <NavLink to="/signin" 
                activeClassName="text-purple-500"
                className={styles.naItems}>Signin</NavLink>
                <NavLink to="/cart" 
                className="bg-purple-700 text-gray-50 
                px-4 py-2.5 rounded-full hover:no-underline
                hover:text-gray-50
                hover:bg-purple-500
                ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
</svg>
                Cart ({props.cart})</NavLink>

            </div>
            </div>
        </div>
    )
}
