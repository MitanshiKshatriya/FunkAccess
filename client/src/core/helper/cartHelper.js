export const addItemToCart = (item, next) => {
    console.log(item)
    let cart = []
    if(typeof window != undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next()
    }
}

export const loadCart = () => {
    if (typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if(typeof window!== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i)=>{
            if(product._id === productId){
                cart.splice(i,1)
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
    }
}

// emptying cart
export const cartEmpty = (next) => {
    let cart = []
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        localStorage.setItem("cart",JSON.stringify(cart))
        next()
    }

}

// get number of items in cart
// update to context?
export const countCartItems = () => {
    let cart = []
    if(typeof window !== undefined){
        cart = localStorage.getItem("cart")
        try{
            let c = JSON.parse(cart)
            if(c === null || c.length === undefined)
            return 0
            else
            return c.length
        }
        catch(e){
            return 0
        }
    }
}