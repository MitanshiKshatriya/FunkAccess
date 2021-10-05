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
           </Switch>
       </BrowserRouter>
    )
}

export default Routes
