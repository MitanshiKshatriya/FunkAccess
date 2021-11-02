import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { authenticate, signin, isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { Failure } from '../core/Alerts'


const SignIn = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        err:"",
        loading: false,
        didRedirect: false
    })

    const setErr = (err) => {setValues({...values,err:err})}

    const { email, password, err, loading, didRedirect} = values;
    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, err: false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        console.log("geeting clicked")
        setValues({...values, err:false, loading: true})
        signin({email,password})
        .then(data=>{
          // console.log("data = "+JSON.stringify(data))
            if(data.err){
                setValues({...values,err:data.err, loading:false})
            }
            else{
                authenticate(data,()=>{
                  setValues({
                    ...values,
                    didRedirect: true
                  })
                })
            }

        })
        .catch(err=>console.error("ERROR = "+err))
    }

    const performRedirect = () => {
      if(didRedirect){
        if(user && user.role===1){
          return <Redirect to="/admin/dashboard"/>
        }
        else{
          return <Redirect to="/user/dashboard"/>
        }
      }
      
    }

    const SignInForm = () => {
    return (
        <div>
        <div className="flex flex-col justify-center items-center">
  <form className="bg-white shadow-md rounded md:min-w-1/2 px-8 pt-6 pb-8 mb-4">
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
        <Link to="/signup"
        className="align-baseline font-bold text-sm text-pink-darkest hover:text-pink-darker"
        >Are you a new user? <span className="underline">Sigup</span></Link>
    </div>
    <div className="flex items-center justify-between">
      <button 
      className={"hover:bg-pink-darker bg-pink-darkest text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"} type="button"
      onClick={onSubmit}
      disabled={loading}
      style={{cursor: loading ? "progress": "pointer"}}
      >
        Sign In
      </button>
    </div>
  </form>
  
</div>
<br/>
<br/>
        </div>
    ) 
  }

    return (
        <Base>
        <Failure msg={err} bool={err} setBool={setErr}/>
        {SignInForm()}
        {performRedirect()}
        {/* <p>{JSON.stringify(values)}</p> */}
        </Base>
        
    )
}

export default SignIn
