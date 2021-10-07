import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AdminBase from '../core/AdminBase'
import { Success, Failure } from '../core/Alerts'

import { getCategory, updateCategory } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'

const UpdateCategory = ({match}) => {

    const {user, token} = isAuthenticated()

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    const preload = (cateId) => {
        setLoading(true)
        getCategory(cateId).then(data=>{
            setLoading(false)
            if(data.err){
                console.log(err)
            }else{
                setName(data.name)
            }
        }).catch(err=>console.log(err))
    }

    useEffect(() => {
        preload(match.params.cateId)
    }, [])

    const handleChange = (event) => {
        setErr("")
        setName(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        updateCategory(match.params.cateId, user._id, token, {name: name}).then(data=>{
            setLoading(false)
            if(data.err){
                setErr(data.err)
            }else{
                setSuccess(true)
            }
        }).catch(err=>console.log(err))
    }

    const UpdateCategoryForm = () => {
        return (
            <div className="mt-4 mb-2">
            <div className="m-3">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Category
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="name" placeholder="For ex. Necklace"
              onChange={handleChange}
              value={name}
          />
        </div>
        <button 
          className={"hover:bg-purple-500 bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"} type="button"
          onClick={onSubmit}
          disabled={loading}
          style={{cursor: loading ? "progress": "pointer"}}
          >
            Update Category
          </button>
          <Link to="/admin/dashboard"
          // className="hover:bg-purple-500 bg-purple-700 text-white font-bold py-2 px-4 md:mx-3 my-2 rounded focus:outline-none focus:shadow-outline md:inline-block block" 
          className = "align-baseline font-bold text-sm text-purple-800 hover:text-purple-500 underline px-4"
          
          >
            Admin Dashboard
          </Link>
        </form>
        </div>
        </div>
            )
    }

    return (
        <div>
        <AdminBase>
        <Success msg={"category updated successfully"} bool={success}/>
        <Failure msg={"Could not create category"} bool={err}/>
        {UpdateCategoryForm()}
        <p>{name}</p>
        </AdminBase>  
        </div>
    )
}

export default UpdateCategory
