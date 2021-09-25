const express = require('express')
const router = express.Router()

const { getProductById, createProduct, getProduct, photo, removeProduct, updateProduct, getAllProduct, getAllUniqueCategory } = require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

//all of params
router.param("userId",getUserById)
router.param("productId", getProductById)

//routes

//create route
router.post("/product/create/:userId",
	isSignedIn, isAuthenticated, isAdmin,
	createProduct
	)

//get one routes
router.get("/product/:productId", getProduct)
// for loading binary data on frontend
// router.get("/product/photo/:productId", photo)

//delete route
router.delete("/product/:productId/:userId",
	isSignedIn, isAuthenticated, isAdmin,
	removeProduct
	)

//update route
router.put("/product/:productId/:userId",
	isSignedIn, isAuthenticated, isAdmin,
	updateProduct
	)

//listing (get all) routes
router.get("/products",getAllProduct)

// get by categories
router.get("/products/categories", getAllUniqueCategory)

module.exports = router;