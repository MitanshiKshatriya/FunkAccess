import React, { useState, useEffect } from 'react'
import Base  from './Base'
import { ProductsGallery } from './DisplaySection'
import { getProducts } from './helper/coreapicalls'
import { NotProductsFound } from './Test'

const Shop = ({match}) => {

    const [products, setProducts] = useState([])
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    const loadAllProducts = () => {
      setLoading(true)
      getProducts({limit:20,category_id:match.params.cateId}).then(data=>{
        // console.log(data,err)
        setLoading(false)
        if(data.err){
          setErr(data.err)
        }else{
          setProducts(data)
        }
      })
    }

    useEffect(()=>{
      loadAllProducts()
    },[])

    return (
        <Base>
        <div className="">
        {  products && products.length>0 ?
            <ProductsGallery products={products}/>
            :
            <NotProductsFound/>
        }
        </div>
        </Base>
    )
}

export default Shop
