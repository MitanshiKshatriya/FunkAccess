import React from 'react'
import AdminBase from '../core/AdminBase'
// import { isAuthenticated } from '../auth/helper'
// import { Link } from 'react-router-dom'

const AdminDashboard = () => {
    const styles = {
        navSpanStyle1: "text-bold text-2xl",
        navSpanStyle2: "text-bold text-2xl",
    }

    return(
        <AdminBase>
            <div>
            <h2 className="font-bold text-3xl text-left px-8 py-4 underline">Admin Details</h2>
            <p className="text-left  px-8 py-2"><span className={styles.navSpanStyle1}>Name: </span>
            <span className={styles.navSpanStyle2}>{"Hitesh Chaudhary"}</span></p>
            <p className="text-left  px-8 py-2"><span className={styles.navSpanStyle1}>Email: </span>
            <span className={styles.navSpanStyle2}>{"user2@test.com"}</span></p>
            </div>
        </AdminBase>
    )
}

export default AdminDashboard
