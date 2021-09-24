const express = require('express');
const router = express.Router();
const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")

// populate req.profile obejct
router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, 
	isAuthenticated, getUser)

// router.get("/users",
// 	isSignedIn, isAuthenticated, isAdmin, 
// 	getAllUsers)

router.put("/user/:userId",
	isSignedIn,isAuthenticated,
	updateUser
	)

router.get("/user/orders/:userId", 
	isSignedIn, isAuthenticated,
	userPurchaseList
	)


module.exports = router;
