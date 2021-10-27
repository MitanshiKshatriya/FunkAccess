const upsert = (prod_item,cart) => {
    const i = cart.findIndex(_item => _item._id === prod_item._id);
    if (i > -1) cart[i].count = cart[i].count+1; // (2)
    else { 
        prod_item.count = 1
        cart.push({...prod_item}) 
    }
    // return cart
}

export const addItemToCart = (item, next) => {
    console.log(item)
    let cart = []
    if(typeof window != undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        // cart.push({
        //     ...item
        // })
        upsert(item,cart)
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

export const removeOneItemFromCart = (productId) => {
    let cart = []
    if(typeof window!== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i)=>{
            if(product._id === productId){
                if(product.count === 1)
                cart.splice(i,1)
                else
                product.count = product.count - 1
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
            {
                let total = 0;
                c.map( p =>
                {
                total += (p.count)
                }
                )
                return total
            }
        }
        catch(e){
            return 0
        }
    }
}