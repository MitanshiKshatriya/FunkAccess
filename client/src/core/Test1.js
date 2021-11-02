import React, { useState, useEffect } from 'react'
import Base  from './Base'
import { ProductsGallery } from './DisplaySection'
import { getProducts, getFilteredProducts } from './helper/coreapicalls'
import { getCategories } from '../admin/helper/adminapicall'
import { NotProductsFound } from './Test'

const Shop = ({match}) => {

    const [products, setProducts] = useState([])
    const [ categories,setCategories ] = useState([])
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [filters,setFilters] = useState({
        category_id: '',
        orderBy: ''
    })

    const preloadCategories = () => {
        getCategories().then(data=>{
            if(data.err){
                setErr(err)
            } else {
                setCategories(data)
            }
        }).catch(err=>console.log(err))
    }


    const loadAllProducts = () => {
      setLoading(true)
      preloadCategories()
      getProducts({limit:4,category_id:match.params.cateId}).then(data=>{
        // console.log(data,err)
        setLoading(false)
        if(data.err){
          setErr(data.err)
        }else{
          setProducts(data)
        }
      })
    }

    const loadFilteredProducts = () => {
        setLoading(true)
        getFilteredProducts(
            {limit:4,
            category_id:filters.category_id,
            orderBy:filters.orderBy
        }).then(data=>{
        // console.log(data,err)
        setLoading(false)
        if(data.err){
          setErr(data.err)
        }else{
          setProducts(data)
        }
      })
    }

    const handleChange = name => event => {
        setFilters({...filters, [name]:event.target.value})
    }

    const FilterOptions = () => {
        return (
            <div className='mx-10 grid grid-flow-row grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                <div className="mb-4">
      <label className="text-gray-darkest text-sm font-bold mb-2" htmlFor="price">
        Category
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darkest leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Category"
          onChange={handleChange("category_id")}
            value={filters.category_id}
      >
      <option value={''}>
      All</option>
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
      <label className="text-gray-darkest text-sm font-bold mb-2" htmlFor="price">
        Sort By Price
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darkest leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Category"
          onChange={handleChange("orderBy")}
        value={filters.orderBy}
      >
      <option value={''}>
      Custom</option>
          <option value={'desc'}>
             High to Low
          </option>
          <option value={'asc'}>
        Low to High</option>
      </select>
    </div>
    <div className="mb-4">
    <label className="text-white block text-sm font-bold mb-2" htmlFor="price">
        Sort By Price
      </label>
    <button className="hover:bg-pink-darker bg-pink-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="button"
    onClick={loadFilteredProducts}
    >
    Show Products
    </button></div>
            </div>
        )
    }

    useEffect(()=>{
      loadAllProducts()
    },[])

    return (
        <Base>
        <div className="">
        <FilterOptions/>
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
