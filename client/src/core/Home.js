import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Base  from './Base'
import DisplaySection from './DisplaySection'
import s1 from "../assets/s5.PNG"
import s2 from "../assets/s2.PNG"
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
        <div className="">
        <Base>
        <div className="container">
           <HeroSection/>
          {!err && !loading && <DisplaySection products={products}/> }
        </div>
        </Base> 
        </div>
    )
}

const HeroSection = () => {
  return (
      <div className="container p-0 bg-pink-lightest my-10 min-h-60">
      <div className="flex justify-center place-items-center">
      <div className="lg:block hidden">
        <img src={s1} alt="cover" className="h-85 w-90  rounded-tr-full"/>
      </div>
      {/* <div class="about-img">
              <img src={s2} alt=""/>
      </div> */}
      <div className="text-center">
      <h1
      className=" uppercase lg:text-5xl text-2xl text-center font-bold my-4 font-domine">
      Buy Handmade Accessiories</h1>
      <p 
      className="uppercase text-gray-darkest font-semibold tracking-wide text-center md:self-start md:text-left my-1">
      New Collection is here.</p>
      <p className="uppercase text-gray-darkest font-semibold tracking-wide text-center md:self-start md:text-left my-1 lg:mx-auto mx-2">Up your style game with these funky accessiories</p>
      <br/>
      <Link to="/shop" 
      className="bg-gradient-to-r 
      from-pink-darker to-pink-dark rounded-full py-3 px-6 text-white uppercase text-xl md:self-start my-5
      hover:underline hover:text-white
      ">Shop Now</Link>
      
      </div>
      <div className="lg:block hidden">
        <img src={s1} alt="cover" className="h-85 w-90  rounded-bl-full"/>
      </div>
      </div>
      </div>
  )
}


export default Home
