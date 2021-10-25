import { API } from "../../backend";
import axios from 'axios'

export const createOrder = async (userId, token, orderData) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    try {
        const response = await axios.post(
            `${API}/order/create/${userId}`,
            {order: orderData},
            config
            )
        return response.data
    } catch(err){
        return err.response.data
    }
}