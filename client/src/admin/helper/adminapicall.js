import { API } from "../../backend"
import axios from 'axios'

// create category
export const createCategory = async (userId, token, category) => {
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    } 
    try {
        console.log("recieved the category: ",category)
        const response = await axios.post(`${API}/category/create/${userId}`, category , config)
        return response.data
    } catch (err) {
        return err.response.data
    }
    
}

//get all categories
export const getCategories = async () => {
    try{
        const response = await axios(`${API}/categories`)
        return response.data
    }catch(err){
        return err.response.data
    }
}

// product calls

//create product
export const createProduct = async (userId, token, product) =>{
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.post(`${API}/product/create/${userId}`,product,config)
        return response.data
    }catch(err){
        return err.response.data
    }
}

// get all products
export const getProducts = async () => {
    try{
        const response = await axios(`${API}/products`)
        return response.data
    }catch(err){
        return err.response.data
    }
}

// get a product
export const getProduct = async (productId) => {
    try {
        const response = await axios(`${API}/product/${productId}`)
        return response.data
    } catch (err) {
        return err.response.data
    }
}

//udate a product
export const updateProduct = async (productId, userId, token, product) =>{
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.put(`${API}/product/${productId}/${userId}`,product,config)
        return response.data
    }catch(err){
        return err.response.data
    }
}

// delete a product
export const deleteProduct = async (productId, userId, token) =>{
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try{
        const response = await axios.delete(`${API}/product/${productId}/${userId}`,config)
        return response.data
    }catch(err){
        return err.response.data
    }
}