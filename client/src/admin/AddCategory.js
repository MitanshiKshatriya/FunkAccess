import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AdminBase from '../core/AdminBase'
import { Success, Failure } from "../core/Alerts"

import { isAuthenticated } from '../auth/helper'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {
    const [ name, setName ] = useState("")
    const [ err, setErr ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ success, setSuccess ] = useState(false)

    const {user, token} = isAuthenticated()

    const handleChange = (event) => {
      setErr("")
      setName(event.target.value)
    }

    const onSubmit = (event) => {
      event.preventDefault()
      setErr("")
      setSuccess(false)
      setLoading(true)
      //backend request fired
      createCategory(user._id, token, {name:name})
      .then(data=>{
        console.log("recieved the data in add category: ",data)
        setLoading(false)
        if(data.err){
          setErr(true)
          setSuccess(false)
        } else {
          setErr("")
          setName("")
          setSuccess(true)
        }
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
      })

    }

    const AddCategoryForm = () => {
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
      className={"hover:bg-pink-darker bg-pink-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"} type="button"
      onClick={onSubmit}
      disabled={loading}
      style={{cursor: loading ? "progress": "pointer"}}
      >
        Add Category
      </button>
      <Link to="/admin/dashboard"
      // className="hover:bg-purple-500 bg-purple-700 text-white font-bold py-2 px-4 md:mx-3 my-2 rounded focus:outline-none focus:shadow-outline md:inline-block block" 
      className = "align-baseline font-bold text-sm text-pink-dark hover:text-pink-darker underline px-4"
      
      >
        Admin Dashboard
      </Link>
    </form>
    </div>
    </div>
        )
    }

    return (
        <AdminBase>
        <Success msg={"category created successfully"} bool={success}/>
        <Failure msg={"Could not create category"} bool={err}/>
        {AddCategoryForm()}
        <p>{name}</p>
        </AdminBase>
    )
}

export default AddCategory
