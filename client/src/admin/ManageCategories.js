import React, { useState, useEffect} from 'react'

import AdminBase from '../core/AdminBase'
import CategoriesTable from './CategoriesTable'

import { isAuthenticated } from '../auth/helper'
import { getCategories, deleteCategory } from './helper/adminapicall'

const Test = () => {

    const {user,token} = isAuthenticated()

    const [categories,setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState(false)

    const preload = () => {
        setLoading(true)
        getCategories().then(data=>{
            setLoading(false)
            if(data.err){
                setErr(data.err)
            }else{
                setCategories(data)
                setSuccess(true)
            }
        }).catch(err=>console.log(err))
    }

    const handleDelete = (cateId) => {
        deleteCategory(cateId,user._id,token).then(data=>{
            if(data.err){
                setErr(data.err)
            }else{
                preload();
            }
        }).catch(err=>console.log(err))
    }

    useEffect(() => {
        preload()
    }, [])

    return (
        <AdminBase>
            <CategoriesTable categories={categories} handleDelete={handleDelete}/>
        </AdminBase>
    )
}

export default Test
