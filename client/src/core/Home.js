import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Base  from './Base'
import DisplaySection from './DisplaySection'
import s1 from "../assets/s5.PNG"
import s2 from "../assets/s2.PNG"
import { getProducts } from './helper/coreapicalls'
const Home = () => {

    // const [products, setProducts] = useState([])
    // const [err, setErr] = useState('')
    // const [loading, setLoading] = useState(false)

    // const loadAllProducts = () => {
    //   setLoading(true)
    //   getProducts({limit:4,category_name:'earrings'}).then(data=>{
    //     // console.log(data,err)
    //     setLoading(false)
    //     if(data.err){
    //       setErr(data.err)
    //     }else{
    //       setProducts(data)
    //     }
    //   })
    // }

    // useEffect(()=>{
    //   loadAllProducts()
    // },[])

    return (
        <div className="">
        <Base>
        <div className="container">
           <HeroSection/>
          {/* {!err && !loading && <DisplaySection products={products}/> } */}
          <CollectionsSection/>
        </div>
        </Base> 
        </div>
    )
}

const HeroSection = () => {
  return (
      <div className="container p-0 bg-pink-lightest  min-h-60">
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

const CollectionsSection = () => {
  return (
  <div className="flex lg:flex-row flex-col justify-center my-10">
  <div className="container p-0 bg-blue-light underline  lg:min-h-60 min-h-30 flex flex-col 
  text-center
  justify-center place-items-center">
    <h1 className="lg:text-4xl font-domine">
      <Link to='/shop/614d820cc1cb58ca65618e02'>
        Shop from our Earrings Collection
      </Link>
    </h1>
  </div>
  <div className="container p-0 bg-yellow-light underline  lg:min-h-60 min-h-30 flex flex-col 
  text-center
  justify-center place-items-center">
    <h1 className="lg:text-4xl font-domine">
      <Link to='/shop/615d7f87fa3fb32e73712903'>
        Shop from our Necklace Collection
      </Link>
    </h1>
  </div>
  <div className="container p-0 bg-purple-light underline  lg:min-h-60 min-h-30 flex flex-col 
  text-center
  justify-center place-items-center">
    <h1 className="lg:text-4xl font-domine">
      <Link to='/shop/614ed320682eeca4d6ea2b69'>
        Shop from our Nature Rings Collection
      </Link>
    </h1>
  </div>
  </div>
  )
}


export default Home
