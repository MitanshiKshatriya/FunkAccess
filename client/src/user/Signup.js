import React, { useState } from 'react'
// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'
import Base from '../core/Base'
import { Success, Failure } from '../core/Alerts'


const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        err:"",
        success:false
    })

    const setErr = (err) => {setValues({...values,err:err})}
    const setSuccess = (success) => {setValues({...values,success:success})}

    const {name, email, password, err, success} = values;

    const handleChange = name => event => {
        setValues({...values, err: false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, err:false})
        signup({name,email,password})
        .then(data=>{
          // console.log("data = "+JSON.stringify(data))
            if(data.err){
                setValues({...values,err:data.err, success:false})
            }
            else{
                setValues({
                  ...values,
                    name: "",
                    password: "",
                    err:"",
                    success:true
                })
            }

        })
        .catch(err=>console.error("ERROR = "+err))
    }

    const SignupForm = () => {
    return (
        <div>
        <div className="flex flex-col justify-center items-center">
  <form className="bg-white shadow-md rounded md:min-w-1/2 px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-darkest text-sm font-bold mb-2" htmlFor="name">
        Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darkest leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name"
          onChange={handleChange("name")}
          value={name}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-darkest text-sm font-bold mb-2" htmlFor="email">
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-darkest leading-tight focus:outline-none focus:shadow-outline" id="email" type="name" placeholder="email"
          onChange={handleChange("email")}
          value={email}
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-darkest text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-darkest mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"
          onChange={handleChange("password")}
          value={password}
      />
      <p className="text-red-500 text-xs italic">{/**error */}</p>
    </div>
    <div className="my-3">
        <Link to="/signin"
        className="align-baseline font-bold text-sm text-pink-darkest hover:text-pink-darker"
        >Already a user? <span className="underline">Sigin</span></Link>
    </div>
    <div className="flex items-center justify-between">
      <button className="hover:bg-pink-darker bg-pink-darkest text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
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
        <Success msg={`Account successfully created`} bool={success} setBool={setSuccess}/>
        <Failure msg={err} bool={err} setBool={setErr}/>
        {SignupForm()}
        {/* <p>{JSON.stringify(values)}</p> */}
        </Base>
        
    )
}

export default Signup
