const express = require("express")
const router = express.Router()
const { signup, signout, signin, isSignedIn } = require("../controllers/auth")
const { check } = require('express-validator')

router.post("/signup",[

	check("name").notEmpty().withMessage("Name cannot be empty"),
	check("email").isEmail().withMessage("Please enter a valid email"),
	check("password").isLength({min:2}).withMessage("Password minimum length is 2"),


	], 
	signup
);

router.post(
	"/signin",[
	check("email").isEmail().withMessage("Please enter a valid email"),
	check("password").notEmpty().withMessage("Password should not be empty"),
	],
	signin
	)


router.get("/signout",signout)

router.get("/testroute", isSignedIn, (req,res)=>res.send(req.auth))

module.exports = router