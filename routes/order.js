const express = require('express')
const router = express.Router()


const { getOrderById, createOrder, getAllOrdersAdmin, getOrderStatus, updateStatus } = require("../controllers/order")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user")
const { updateStockAndInventory } = require("../controllers/product")

//params
router.param("userId",getUserById)
router.param("orderId", getOrderById)

//routes

//create
router.post("/order/create/:userId",
	isSignedIn, isAuthenticated,
	pushOrderInPurchaseList,
	updateStockAndInventory,
	createOrder
	)

//read
router.get("/order/admin/all/:userId",
	isSignedIn, isAuthenticated, isAdmin,
	getAllOrdersAdmin
	)

//status of order
router.get("/order/admin/status/:userId",
	isSignedIn, isAuthenticated, isAdmin,
	getOrderStatus
	)

//update order status
router.put("/order/admin/:orderId/status/:userId",
	isSignedIn, isAuthenticated, isAdmin,
	updateStatus
	)



module.exports = router;