import React, { useState, useEffect } from 'react'

import AdminBase from '../core/AdminBase'
import ProductTable from './ProductTable'

import { isAuthenticated } from '../auth/helper'
import { getProducts  } from '../core/helper/coreapicalls'
import { deleteProduct  } from './helper/adminapicall'

const ManageProducts = () => {

    const [products, setProducts] = useState([])  
    const {user, token} = isAuthenticated()

    const preload = () => {
      getProducts().then(data=>{
        if(data.err){
          console.log(data.err)
        }else{
          setProducts(data)
        }
      })
      .catch(err=>console.log(err))
    }

    const handleDelete = (productId) => {
        deleteProduct(productId, user._id, token)
        .then(data=>{
          if(data.err){
            console.log(data.err)
          }else{
            // setProducts(data)
            preload()
          }
        }).catch(err=>console.log(err))
    }

    useEffect(() => {
      preload();
    }, [])

    return (
        <AdminBase>
        <ProductTable products={products} handleDelete={handleDelete}/>
        </AdminBase>
    )
}

export default ManageProducts
