import { API } from "../../backend";

export const getmeToken = (userId, token) => {
    return fetch(`${API}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`

    }
}
    )
    .then(response=> response.json())
    .catch(err=> console.log(err))
} 

export const proccessPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/payment/braintree/${userId}`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
    
        },
        body: JSON.stringify(paymentInfo)
    }
        )
    .then( response => {
        return response.json()
    } )
    .catch(err=> console.log(err))
}