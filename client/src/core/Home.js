import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer  from './Footer'
import Navbar from './Navbar'
import DisplaySection from './DisplaySection'
import s1 from "../assets/s5.PNG"
import { getProducts } from './helper/coreapicalls'
const Home = () => {

    const [products, setProducts] = useState([])
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)

    const loadAllProducts = () => {
      setLoading(true)
      getProducts().then(data=>{
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
        <div className="container h-8 mx-auto p-4">
        <Navbar cart={0}/>
           <HeroSection/>
          {!err && !loading && <DisplaySection products={products}/> }
        <Footer/>  
        </div>
    )
}

const HeroSection = () => {
  return (
      <div className="container p-0 bg-purple-200 bg-gradient-to-br from-purple-400 via-purple-200 to-purple-400 my-10">
      <div className="flex justify-center items-center">
      <div className="">
        <img src={s1} alt="cover" className="h-85 w-90  rounded-tr-full"/>
      </div>
      <div className="text-center">
      <h1
      className=" uppercase text-5xl text-center font-bold my-4 font-domine">
      Buy Handmade Accessiories</h1>
      <p 
      className="uppercase text-gray-700 font-semibold tracking-wide text-center md:self-start md:text-left my-1">
      New Collection is here.</p>
      <p className="uppercase text-gray-700 font-semibold tracking-wide text-center md:self-start md:text-left my-1">Up your style game with these funky accessiories</p>
      <br/>
      <Link to="/shop" 
      className="bg-gradient-to-r 
      from-purple-700 to-pink-500 rounded-full py-3 px-6 text-white uppercase text-xl md:self-start my-5
      hover:no-underline hover:text-white
      ">Shop Now</Link>
      
      </div>
      <div className="">
        <img src={s1} alt="cover" className="h-85 w-90  rounded-bl-full"/>
      </div>
      </div>
      </div>
  )
}


export default Home
