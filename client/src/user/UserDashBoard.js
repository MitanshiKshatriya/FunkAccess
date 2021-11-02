import React, { useState, useEffect } from 'react'
import Base from '../core/Base'

import { isAuthenticated } from '../auth/helper/index'

const UserDashboard = () => {
    const [user,setUser] = useState({
        name: '',
        email: ''
    })

    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)

    const preload = () => {
        setLoading(true)
        const u   = isAuthenticated().user
        if(u){
            if(u.name && u.email){
                console.log("HERE")
                setUser({...user,email:u.email,name:u.name})
            }else{
                setErr(true)
            }
            setLoading(false)
        }
        else{
            setErr('Some error occured')
            setLoading(false)
        }
    }

    useEffect(() => {
        preload()
    }, [])

    const Details = () => {
        if(loading){
            return <div> <h1 className="text-center">Loading...</h1> </div>
        }else if(err){
            return <div> <h1 className="text-center text-red">{err}</h1> </div>
        }else{
            return (
            <div className="text-center">
                <div className="flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 20 20" fill="#BE185D">
  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
</svg>
                </div>
                <div className="my-3">
                    <h2 className='text-2xl'>{user.name}</h2>
                    <h2 className='text-xl my-1'>{user.email}</h2>
                </div>
            </div>
            )
        }
    }

    return (
        <Base title="UserDashboard page">
            <div className="">
            {Details()}
            </div>
        </Base>
    )
}

export default UserDashboard
