import { API } from "../../backend"
import axios from 'axios'

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