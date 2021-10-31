import React from 'react'
import {BrowserRouter, Switch, Route }
from "react-router-dom" 

import PrivateRoutes from './auth/helper/PrivateRoutes'
import AdminRoutes from './auth/helper/AdminRoutes'

import Home from "./core/Home"
import Cart from "./core/Cart"
import Test from "./core/Test"
import Signin from './user/Signin'
import Signup from "./user/Signup"
import Profile from "./user/Profile"
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import ManageCategories from './admin/ManageCategories'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import ShopCategory from './core/ShopCategory'
import Shop from './core/Shop'
import ViewDetails from './core/ViewDetails'

const Routes = () => {
    return (
       <BrowserRouter>
           <Switch>
               <Route path="/" exact component={Home}/>
               <Route path="/cart" exact component={Cart}/>
               <Route path="/signup" exact component={Signup}/>
               <Route path="/signin" exact component={Signin}/>
               <Route path="/test" exact component={Test}/>
               <Route path="/shop" exact component={Shop}/>
               <Route path="/shop/:cateId" exact component={ShopCategory}/>
               <Route path="/product/:prodId" exact component={ViewDetails}/>
               <PrivateRoutes path="/profile" exact component={Profile}/>
               <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard}/>
               <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard}/>
               <AdminRoutes path="/admin/create/product" exact component={AddProduct}/>
               <AdminRoutes path="/admin/create/category" exact component={AddCategory}/>
               <AdminRoutes path="/admin/products" exact component={ManageProducts}/>
               <AdminRoutes path="/admin/product/update/:prodId" exact component={UpdateProduct}/>
               <AdminRoutes path="/admin/categories" exact component={ManageCategories}/>
               <AdminRoutes path="/admin/category/update/:cateId" exact component={UpdateCategory}/>
               <AdminRoutes path="/admin/orders" exact component={AdminDashBoard}/>
           </Switch>
       </BrowserRouter>
    )
}

export default Routes
