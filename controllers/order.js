// const { Order, ProductCart } = require("../models/order")
const mongoose = require('mongoose')
const Order  = mongoose.model('Order')
const ProductCart  = mongoose.model('ProductCart')

exports.getOrderById = (req,res,next) => {
	Order.findById(id)
	.populate("products.product", "name price")
	.exec((err,order)=> {
		if(err){
			return res.status(400).json({
				err: "No order found in DB"
			})
		}
		req.order = order
		next()
	})
}

exports.createOrder = (req,res) => {
	req.body.order.user = req.profile
	const order = new Order(req.body.order)

	order.save((err,o)=>{
		if(err){
			console.log(err)
			return res.status(400).json({
				err: "Failed to save in your DB"
			})
		}
		res.json(o)
	})
}

exports.getAllOrdersAdmin = (req,res) => {
	Order.find()
	.populate("user","_id name")
	.exec((err, order) => {

		if(err){
			res.status(400).json({
				err: "No orders found in DB"
			})
		}
		res.json(order)

	})
}

exports.getOrderStatus = (req,res) => {
	return res.json(Order.schema.path("status").enumValues)
}

exports.updateStatus = (req,res) => {
	Order.update(
		{_id: req.body.orderId},
		{$set: {status: req.body.status}},
		(err, order)=>{
			if(err){
				return res.status(400).json({
					err: "Cannot update order"
				})
			}
			return res.json(order)
		}
		)
}
	
