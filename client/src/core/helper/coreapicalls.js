import { API } from '../../backend'
import axios from 'axios'

export const getProducts = async () => {

    try{
        const response = await axios.get(`${API}/products?limit=18`)
        return response.data
    } 
    catch(err){
        return err.response.data
    }

}