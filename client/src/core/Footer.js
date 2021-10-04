import React from 'react'
import {Link} from 'react-router-dom'

const Footer = ({footerClass}) => {
    const styles = {
        footerItem: "mx-2.5"
    }
    return (
    <div className={"border-t-2 border-grey-300" +
    "md:flex md:flex-row md:justify-between" +
    "text-center"+
     "py-3 text-sm mt-auto "+footerClass}>
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

export default Footer
