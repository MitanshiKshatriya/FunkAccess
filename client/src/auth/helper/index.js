import {API} from '../../backend'
import axios from 'axios'

const config = {
    headers: {
        "Content-type": "application/json"
    }
}

export const signup = async user => {
    try {
        const response = await axios.post(`${API}/signup`, user, config)
        // console.log("RESPONSE = "+JSON.stringify(response.data))
        return response.data
    } catch (err) {
        // console.log("ERROR = "+JSON.stringify(err.response.data))
        return err.response.data
    }
    
}

export const signout = async user => next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();
    }  
}

export const signin = async user => {
    try {
        const response = await axios.post(`${API}/signin`, user)
        return response
    } catch (err) {
        console.log(err)
    }
}

export const authenticate = (data,next) => {
    if(typeof window!== "undefined")
    {
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}


export const isAuthenticated = () => {
    if(typeof window === "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false;
    }
}


