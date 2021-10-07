import React from 'react'
import Base from './Base'
import { Link } from 'react-router-dom'

const AdminBase = ({children}) => {
    const styles = {
        adminNavItem: 'block px-8 py-3 border-b-2 font-bold bg-white text-purple-700 cursor-pointer hover:underline',
        linkStyle: "hover:underline hover:text-purple-700",
        linkStyle1: "hover:underline hover:text-white",
        navSpanStyle1: "text-bold text-2xl",
        navSpanStyle2: "text-bold text-2xl",
    }
    return (
        <Base>
        <div className="flex flex-col justify-center items-center">
        <h1 className="font-domine text-4xl underline text-purple-900 mb-4">Admin Panel</h1>
        <div className="md:flex md:flex-row md:justify-around bg-purple-200 shadow min-w-3/4">
        <div className="bg-purple-300 shadow-lg">
            <h2 className="font-bold text-center px-8 py-4 border-b-2 bg-purple-700 text-white">
            <Link to="/admin/orderes" className={styles.linkStyle1}>Admin Navigation</Link></h2>
            <ul className="list-none border-b-2">
                <li className={styles.adminNavItem}>
                <Link to="/admin/create/category" className={styles.linkStyle}>Create Categories</Link></li>
                <li className={styles.adminNavItem}>
                <Link to="/admin/categories" className={styles.linkStyle}>Manage Categories</Link></li>
                <li className={styles.adminNavItem}>
                <Link to="/admin/create/product" className={styles.linkStyle}>Create Product</Link></li>
                <li className={styles.adminNavItem}>
                <Link to="/admin/products" className={styles.linkStyle}>Manage Products</Link></li>
                <li className={styles.adminNavItem}>
                <Link to="/admin/orderes" className={styles.linkStyle}>Manage Orderes</Link></li>
            </ul>
        </div>
        <div className="flex-grow">
            {children}
        </div>
        <div>

        </div>
        </div>
        </div>
        </Base>
    )
}

export default AdminBase
