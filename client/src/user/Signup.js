import React, { useState } from 'react'
// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'
import Base from '../core/Base'



const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        lastname: "",
        password: "",
        err:"",
        success:false
    })

    const {name, lastname, email, password, err, success} = values;

    const handleChange = name => event => {
        setValues({...values, err: false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, err:false})
        signup({name,lastname,email,password})
        .then(data=>{
            if(data.err){
                setValues({...values,err:data.err, success:false})
            }
            else{
                setValues({
                    name: "",
                    lastname: "",
                    password: "",
                    err:"",
                    success:true
                })
            }
        })
        .catch(err=>console.error(err))
    }

    const SignupForm = () => {
    return (
        <div>
        <div className="flex flex-col justify-center items-center">
  <form className="bg-white shadow-md rounded md:min-w-1/2 px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
        First Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name"
          onChange={handleChange("name")}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
        Last Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="last name"
          onChange={handleChange("lastname")}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email"
          onChange={handleChange("email")}
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"
          onChange={handleChange("password")}
      />
      <p className="text-red-500 text-xs italic">{/**error */}</p>
    </div>
    <div className="my-3">
        <Link to="/signin"
        className="align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >Already a user? <span className="underline">Sigin</span></Link>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
      onClick={onSubmit}
      >
        Sign Up
      </button>
      {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a> */}
    </div>
  </form>
  
</div>
<br/>
<br/>
        </div>
    ) }

    return (
        <Base>
            {SignupForm()}
            <p>{JSON.stringify(values)}</p>
        </Base>
        
    )
}

export default Signup
