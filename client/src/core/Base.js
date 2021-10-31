import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Base = ({children,className,footerClass,heading}) => {
    return(
        <div className="">
            <Navbar/>
            <div className="container">
            <h1 className="uppercase text-4xl text-center font-bold my-4 font-domine">
                {heading}
            </h1>
            <div className={className}>
            {children}
            </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default Base



