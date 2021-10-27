import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Base from './Base'
import CartCard from './CartCard'

import { loadCart } from './helper/cartHelper'
import Payment from './Payment'

const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
            <h2>This section is to load product</h2>
            {products && products.map((product,idx)=>{
                return <CartCard key={idx} 
                product={product} 
                show={false} 
                qty={1}
                setReload = {setReload}
                reload = {reload}
                 />
            })}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>This section is to checkout</div>
        )
    }
    
    return (
        <Base>
        <div className="flex">
        {products.length > 0 ? 
        loadAllProducts(products) : 
        <h3>Cart is empty.<Link>SHOP NOW!</Link></h3>
        }
        <Payment products={products} reload={reload} setReload={setReload}/>
            {/*  */}
        </div>
        </Base>
    )
}

export default Cart