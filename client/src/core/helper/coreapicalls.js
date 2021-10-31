import { API } from '../../backend'
import axios from 'axios'

export const getProducts = async (obj) => {
    console.log(obj)
    const limit = obj && obj.limit ? obj.limit : 4
    const category_id =  obj && obj.category_id ? obj.category_id : ''
    try{
        const response = await axios.get(`${API}/products?limit=${limit}&category_id=${category_id}`)
        return response.data
    } 
    catch(err){
        return err.response.data
    }

}

export const getFilteredProducts = async (obj) => {
    console.log(obj)
    const limit = obj && obj.limit ? obj.limit : 4
    const category_id =  obj && obj.category_id ? obj.category_id : ''
    const orderBy =  obj && obj.orderBy ? obj.orderBy : ''
    try{
        const response = await axios.get(`${API}/products?limit=${limit}&category_id=${category_id}&sortBy=price&orderBy=${orderBy}`)
        return response.data
    } 
    catch(err){
        return err.response.data
    }

}