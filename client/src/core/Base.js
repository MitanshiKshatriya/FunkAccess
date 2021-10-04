import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'

export function Base({children}){
    return(
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}


export function Footer(){
    const styles = {
        footerItem: "mx-2.5"
    }
    return(
    <div className="border-t-2 border-grey-300 
    md:flex md:flex-row md:justify-between
    text-center
     py-5 text-sm mt-auto">
        <div className="mb-4">
        <Link to="/" 
        className={styles.footerItem}>Home</Link>
        <Link to="/privacypolicy"
        className={styles.footerItem}>Privacy Policy</Link>
        <Link to="/terms"
        className={styles.footerItem}>Terms Of Services</Link>
        </div>
        <p>&copy; Copyright Reserved 2021</p>
    </div>
    )
}
