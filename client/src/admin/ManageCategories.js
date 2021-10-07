import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import AdminBase from '../core/AdminBase'

import { isAuthenticated } from '../auth/helper'
import { getCategories, deleteCategory } from './helper/adminapicall'

const ManageCategories = () => {

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

    const CategoriesTable = () => {
        return (
            <div>
                <table className="table-auto">
  <thead>
    <tr>
      <th>Name</th>
      <th>Options</th>
    </tr>
  </thead>
  <tbody>
  { categories && categories.map((cate,idx)=>(
    <tr key={idx}>
      <td>{cate.name}</td>
      <td>
          <button onClick={()=>{handleDelete(cate._id)}} className="inline-block">         
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
</svg></button>
<Link to={`/admin/category/update/${cate._id}`} className="inline-block"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
</svg></Link>
      </td>
    </tr>
    ))
    }
  </tbody>
</table>
            </div>
        )
    }

    return (
        <AdminBase>
            {CategoriesTable()}
        </AdminBase>
    )
}

export default ManageCategories
