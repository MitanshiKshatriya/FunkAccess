import axios from "axios"

import { API } from '../../backend'

export const getUserOrderDetails = async (userId, token) => {

    const config = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    try{
        const response = await axios.get(`${API}/user/orders/${userId}`,config)
        return response.data
    }
    catch(err){
        return err.response.data
    }

}