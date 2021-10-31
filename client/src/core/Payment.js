import React, { useState, useEffect } from 'react'

// import { Link } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react"

import { loadCart, cartEmpty } from './helper/cartHelper'
import { getmeToken, processPayment } from "./helper/paymentHelper"
import { createOrder } from "./helper/orderHelper"
import { isAuthenticated } from '../auth/helper'

const Payment = ({products, reload = undefined, setReload = f => f}) => {
    
    const [info, setInfo] = useState({
        success: false,
        clientToken: null,
        err: "",
        instance: {}
    })
    const [uiLoading, UiLoading] = useState(false)
    const [ paymentProcessLoading, setPaymentProcessLoading ] = useState(false)

    const isAuth = isAuthenticated()

    const userId = isAuth && isAuth.user._id
    const token = isAuth && isAuth.token
    const user = isAuth && isAuth.user

    const getToken = (userId, token) => {
        UiLoading(true)
        getmeToken(userId, token, user)
        .then(info=>{
            UiLoading(false)
            if(info.err){
                setInfo({...info, err: info.error})
            }else{
                const clientToken = info.clientToken
                // setInfo({clientToken:clientToken})
                setInfo({clientToken})
            }
        }).catch(err=>{
            UiLoading(false)
            console.log(err)
        })
    }

    // const buy = () => {
    //     // Send the nonce to your server
    //     const { nonce } = await this.instance.requestPaymentMethod();
    //     await fetch(`server.test/purchase/${nonce}`);
    // }

    const onPurchase = () => {
        setPaymentProcessLoading(true)
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data=>{
                nonce = data.nonce
                const paymentData = {
                    PaymentMethodNonce: nonce,
                    amount: getAmount()
                }
                processPayment(userId, token, paymentData)
                .then(response=>{
                    setPaymentProcessLoading(false)
                    setInfo({...info, success: response.sucess})
                    const orderData = {
                        products: products,
                        transaction_id: response.transaction_id,
                        amount: paymentData.amount
                    }
                    createOrder(userId, token, orderData)
                    window.alert("success")
                    cartEmpty(()=>{})
                    setReload(!reload)
                })
                .catch(err => {
                    setPaymentProcessLoading(false)
                    setInfo({err:err,success:false})
                    window.alert("transaction failed")
                })
            })
            .catch()
    }

    const getAmount = () => {
        let amount = 0;
        products.map( p =>
            {
                amount += (p.price*p.count)
            }
            )
        return amount
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const showbtdropIn = () => {
        if(!uiLoading){
        return (
            <div>
                {info.clientToken !== null 
                && products.length > 0 ?
                <div>
                <h2 className="text-2xl">Total payable amount is: &#8377;{getAmount()}</h2>
                <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button onClick={onPurchase} className="btn bg-pink-darker text-white 
                px-4 py-2.5 rounded-full hover:no-underline
                hover:text-white
                hover:bg-pink-dark
                ">Buy</button>
                </div> :
                (<div>
                {
                    !isAuth ?
                    <h3>Please Login </h3>
                    : products.length === 0 ?
                    <h3>Add somehting to cart</h3>
                    :
                    <h3>Some err occured</h3>
                }
                   
                </div>)
                }
            </div>
        )
        }
        else return <div><h3>Loading payment gateaway...</h3></div>
    }
    
    return (
        <div>
            {showbtdropIn()}
        </div>
    )
}

export default Payment
