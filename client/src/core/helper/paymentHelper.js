import { API } from "../../backend";

export const getmeToken = async (userId, token, user) => {
    console.log(userId)
    try {
        const response = await fetch(`${API}/payment/gettoken/${userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
        );
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
} 

export const proccessPayment = async (userId, token, paymentInfo) => {
    try {
        const response = await fetch(`${API}/payment/braintree/${userId}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentInfo)
        }
        );
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
}