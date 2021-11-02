import React, { useState } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import { Transition } from '@headlessui/react'

import { signout,isAuthenticated } from '../auth/helper/index'
import { countCartItems } from './helper/cartHelper'

const Test = ({history}) => {
    const [ isOpen, setIsOpen ] = useState(false)

    const { user } = isAuthenticated()

    const authLinks = (additionalClassNames) => {
        if(user){
            return (
                <>
                  <NavLink to="/user/dashboard" 
                activeClassName="text-purple-500"
                className={`hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium ${additionalClassNames}`}>
                Account</NavLink> 
                <span
                style={{cursor:'pointer'}}
                className={`hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium ${additionalClassNames}`}
                onClick={()=>{
                    console.log("clicked")
                    signout(()=>{
                        history.push("/")
                    })
                    
                }}
                >Signout</span>  
                </>
            )
        }
        else{
            return (
                <>
            <NavLink to="/signin" 
                activeClassName="text-purple-500"
                className="hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium">
                Signin</NavLink>
                <NavLink to="/signin" 
                activeClassName="text-purple-500"
                className="hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium">
                Signup</NavLink>
            </>
            )
        }

    }

    return (
        <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* LOGO */}
                    <div className="flex items-center"> {/* flex used to align logo vertically */}
                        <div className="flex-shrink-0">
                       <NavLink to="/" className="font-fontLogo text-gray-darkest text-2xl hover:no-underline">FunkAccess</NavLink>
                        </div>
                    </div>
                    {/* LOGO */}
                    {/* NAV ITEMS DESKTOP */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink to="/" className="hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                            <NavLink to="/shop" className="hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium">Shop</NavLink>
                            {authLinks('')}
                            <NavLink to="/" className="hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            Cart ({countCartItems()})
                            </NavLink>

                        </div>
                    </div>
                    {/* NAV ITEMS DESKTOP */}
                    {/* Hamburger Icon */}
                <div className="-mr-2 flex md:hidden">
                    <button
                    onClick={()=> setIsOpen(!isOpen)}
                    type="button"
                    className="bg-pink-dark inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-pink-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-dark focus:ring-white"
                    >
                         <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                    </button>
                </div>
                {/* Hamburger Icon */}
                </div>
                
            </div>
            {/* MOBILE VIEW MENU */}
            <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink to="/" className="hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium block">Home</NavLink>
                            <NavLink to="/shop" className="hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium block">Shop</NavLink>

                            {authLinks(' block')}
                            <NavLink to="/" className="hover:bg-white hover:text-pink-lighter hover:no-underline text-gray-darkest px-3 py-2 rounded-md text-sm font-medium block">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            Cart ({countCartItems()})
                            </NavLink> 
                            </div>
                        </div>
                )}
            </Transition>
            {/* MOBILE VIEW MENU */}
        </div>
    )
}

export default withRouter(Test)
