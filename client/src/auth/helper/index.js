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

export const signout = async next => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        // Setting cart as empty after signout
        localStorage.setItem("cart",JSON.stringify([]))
        next();

        try {
            const response = await axios.get(`${API}/signout`)
            return console.log(response)
        } catch (err) {
            return console.log(err)
        }
    }  
}

export const signin = async user => {
    try {
        const response = await axios.post(`${API}/signin`, user)
        return response.data
    } catch (err) {
        return err.response.data
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


