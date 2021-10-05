const User = require('../models/user')
const { validationResult } = require('express-validator')
const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')


const signup = (req,res) => {
	// console.log("REQ BODY",req.body)
	const user = new User(req.body)
	const validationErrors = validationResult(req)

	if(!validationErrors.isEmpty()){
		return res.status(400).
		json({err:validationErrors.array()[0].msg})
	}
	

		user.save((err,user)=> {
		if(err){
			return res.status(400).json({
				err: err.keyPattern.email === 1 ? 
				"user already exists" : "custom err msg"+err
			})
		}
		return res.status(200).json({
			name: user.name,
			email: user.email,
			_id: user._id
		})
	})

	
	
}


const signin = (req,res) => {
	const { email, password } = req.body;

	const validationErrors = validationResult(req)

	if(!validationErrors.isEmpty()){
		return res.status(400).
		json({errors:validationErrors.array()[0].msg})
	}

	User.findOne({email}, (err,user)=>{
		if(err){
			return res.status(500).json({
				err: "Some error occured"
			})
		}
		if(!user){
			// console.log(user) - null
			return res.status(400).json({
				err: "User not found"
			})
		}

		if(!user.authenticate(password)){
			return res.status(400).json({
				err: "Email and Password do not match"
			})
		}

		// CREATE TOKEN
		const token = jwt.sign({_id: user._id,email:user.email},process.env.SECRET)

		//PUT TOKEN IN COOKIE
		res.cookie("token",token,{expire: new Date() + 9999});

		//SEND RESPONSE TO FRONTEND
		const {_id,name,email,role} = user;
		return res.json({token, user: {_id,name,email,role}})

	})


}


const signout = (req,res) => {
	res.clearCookie("token")
	res.json({
		msg: "User signout successfully"
	})
} 

// check if protected routes
const isSignedIn = expressJwt({
	secret: process.env.SECRET,
	algorithms:['HS256'],
	requestProperty: 'auth'
})

// custom middleware
const isAuthenticated = (req,res,next) => {
	// req.profile sent in frontend
	let checker = req.profile && req.auth 
				&& req.profile._id == req.auth._id
	if(!checker){
		return res.status(403).json({
			err: "Access Denied"
		})
	}
	next()
}

const isAdmin = (req,res,next) => {
	if(req.profile.role === 0){
		return res.status(403).json({
			err: "You are not Admin Access Denied"
		})
	}
	next()
}


module.exports = {signout, signup, signin, isSignedIn, isAuthenticated, isAdmin}