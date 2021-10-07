import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AdminBase from '../core/AdminBase'
import { Success, Failure } from '../core/Alerts'

import { getCategories, getProduct, updateProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'

const UpdateProduct = ({match}) => {

    const {user,token} = isAuthenticated()
    //added too prevent uncontrolled warning
    const [categories, setCategories]= useState([])
    const [values, setValues] = useState({
        name: "",
        desc: "",
        price: "",
        category:"default",
        stock:0,
        urlPhoto: "",
        // categories:[],
        getRedirect: false,
        createdProduct: "",
        err: false,
        success: false,
        loading: false,
    })

    const {name, desc, price, category, stock, urlPhoto, err, success, loading} = values;

    const preloadCategories = () => {
        getCategories().then(data=>{
            if(data.err){
                setValues({...values,err:data.err})
            } else {
                setCategories(data)
                
            }
        }).catch(err=>console.log(err))
    }

    const preloadProduct = (prodId) => {
        getProduct(prodId).then(data=>{
            if(data.err){
                setValues({...values,err:data.err})
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    desc: data.desc,
                    price: data.price,
                    category: data.category,
                    stock: data.stock,
                    urlPhoto: data.urlPhoto,
                })
                preloadCategories()
            }
        })
    }

    useEffect(() => {
       preloadProduct(match.params.prodId)
    }, [])

    const handleChange = name => event => {
        setValues({...values, err: false, [name]:event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error:"", loading: true, success: false})
        const product = {name,desc,price,
            category,stock,urlPhoto}
        updateProduct(match.params.prodId, user._id, 
            token, product).then(data=>{
                setValues({...values,loading:false})
                if(data.err){
                    setValues({...values,err:data.err})
                }else{
                    setValues({
                        ...values, success: true
                    })
                }
            }).catch(err=>console.log(err))

    }

    const UpdateProductForm = () => {
        return (
        <div className="mt-4 mb-2">
        <div className="m-3">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Product Name"
          onChange={handleChange("name")}
          value={name}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
        Description
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Description"
          onChange={handleChange("desc")}
          value={desc}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
        Price
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" step="0.01" placeholder="Price"
          onChange={handleChange("price")}
          value={price}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
        Category
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Category"
          onChange={handleChange("category")}
          value={category}
      >
      <option value="default" disabled>
      Select</option>
      { categories &&
      categories.map((cate,index)=>(
          <option key={index} value={cate._id}>
              {cate.name[0].toUpperCase()+
              cate.name.slice(1).toLowerCase()}
          </option>
      ))
       }
      </select>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
        Stock
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Stock"
          onChange={handleChange("stock")}
          value={stock}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="urlPhoto">
        Image Link
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Image Link"
          onChange={handleChange("urlPhoto")}
          value={urlPhoto}
      />
    </div>

    <button 
      className={"hover:bg-purple-500 bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"} type="button"
      onClick={onSubmit}
      disabled={loading}
      style={{cursor: loading ? "progress": "pointer"}}
      >
        Update Product
      </button>
      <Link to="/admin/dashboard"
      // className="hover:bg-purple-500 bg-purple-700 text-white font-bold py-2 px-4 md:mx-3 my-2 rounded focus:outline-none focus:shadow-outline md:inline-block block" 
      className = "align-baseline font-bold text-sm text-purple-800 hover:text-purple-500 underline px-4"
      
      >
        Admin Dashboard
      </Link>
    </form>
    <p className="max-w-3/4"style={{wordBreak:'break-all'}}>{JSON.stringify(values)}</p>
    </div>
    </div>
        )
    }

    return (
    <AdminBase>
    <Success msg={"product created successfully"} bool={success}/>
    <Failure msg={err} bool={err}/>
    {UpdateProductForm()}
    </AdminBase>
    )
}

export default UpdateProduct
