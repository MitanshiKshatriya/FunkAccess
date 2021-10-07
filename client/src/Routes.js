import React from 'react'
import {BrowserRouter, Switch, Route }
from "react-router-dom" 

import PrivateRoutes from './auth/helper/PrivateRoutes'
import AdminRoutes from './auth/helper/AdminRoutes'

import Home from "./core/Home"
import Signin from './user/Signin'
import Signup from "./user/Signup"
import Profile from "./user/Profile"
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import ManageCategories from './admin/ManageCategories'

const Routes = () => {
    return (
       <BrowserRouter>
           <Switch>
               <Route path="/" exact component={Home}/>
               <Route path="/signup" exact component={Signup}/>
               <Route path="/signin" exact component={Signin}/>
               <PrivateRoutes path="/profile" exact component={Profile}/>
               <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard}/>
               <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard}/>
               <AdminRoutes path="/admin/create/product" exact component={AddProduct}/>
               <AdminRoutes path="/admin/create/category" exact component={AddCategory}/>
               <AdminRoutes path="/admin/products" exact component={ManageProducts}/>
               <AdminRoutes path="/admin/categories" exact component={ManageCategories}/>
               <AdminRoutes path="/admin/orders" exact component={AdminDashBoard}/>
           </Switch>
       </BrowserRouter>
    )
}

export default Routes
