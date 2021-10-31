import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AdminBase from '../core/AdminBase'
import { Success, Failure } from '../core/Alerts'

import { getCategories, createProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'

const AddProduct = () => {

    const {user,token} = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        desc: "",
        price: "",
        category:"default",
        stock:0,
        urlPhoto: "",
        categories:[],
        getRedirect: false,
        createdProduct: "",
        loading: false,
    })

    const [ success, setSuccess ] = useState(false)
    const [ err, setErr ] = useState(false)

    const {name, desc, price, category, categories, stock, urlPhoto, loading} = values;

    const preload = () => {
        getCategories().then(data=>{
            if(data.err){
                setValues({...values})
                setErr(data.err)
            } else {
                setValues({...values, categories: data})
                
            }
        })
    }

    useEffect(() => {
       preload() 
    }, [])

    const handleChange = name => event => {
        setValues({...values, [name]:event.target.value})
        setErr("")
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values,loading:true})
        setErr("")
        setSuccess(false)
        const product = {name,desc,price,
            category,stock,urlPhoto}

        createProduct(user._id, token, product )
        .then(data=>{
            // console.log("HERE WE GOOOO = ",data);
            setValues({...values,loading:false})
            if(data.err){
                setValues({...values})
                setErr(data.err)
            }else{
                setValues({
                    ...values,
                    name: "",
                    desc: "",
                    price: "",
                    category: "default",
                    stock: "",
                    urlPhoto: "",
                })
                setSuccess(true)
            }
        }).catch(err=>console.log(err))
    }

    const AddProductForm = () => {
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
      className={"hover:bg-pink-darker bg-pink-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"} type="button"
      onClick={onSubmit}
      disabled={loading}
      style={{cursor: loading ? "progress": "pointer"}}
      >
        Add Product
      </button>
      <Link to="/admin/dashboard"
      className = "align-baseline font-bold text-sm text-pink-dark hover:text-pink-darker underline px-4"
      
      >
        Admin Dashboard
      </Link>
    </form>
    {/* <p className="max-w-3/4"style={{wordBreak:'break-all'}}>{JSON.stringify(values)}</p> */}
    </div>
    </div>
        )
    }

    return (
    <AdminBase>
    <Success msg={"product created successfully"} bool={success} setBool={setSuccess}/>
    <Failure msg={err} bool={err} setBool={setErr}/>
    {AddProductForm()}
    </AdminBase>
    )
}

export default AddProduct
