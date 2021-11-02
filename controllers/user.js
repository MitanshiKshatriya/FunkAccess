const mongoose = require('mongoose')
const User = require('../models/user')
const { Order } = require('../models/order')

const getUserById = (req,res,next,id) => {
	User.findById(id)
	.exec((err,user) => {

		if(err || !user){
			return res.status(400).json({
				err: "No user was found in DB"
			})
		}
		//storing user in req
		req.profile = user;
		next();

	})
}

const getUser = (req,res) => {
	//TODO: get back here for password hc way:
	// putting undefined in value 
	// doesnt make the key show up? or just reqbin 
	req.profile.encry_password = undefined;
	req.profile.salt = undefined;
	return res.json(req.profile)
}

const getAllUsers = (req,res) => {
	User.find({})
	.exec((err,users)=>{
		if(err || !users){
			return res.status(400).json({
				err: "No users found"
			})
		}
		res.json(users)
	})
}

const updateUser = (req,res) => {
	User.findByIdAndUpdate(
		{_id: req.profile._id},
		{$set: req.body},
		{new: true, useFindAndModify: false},
		(err,user) => {
			if(err){
				return res.status(400).json({
					err: "Update unsuccessful"
				})
			}
			user.salt = undefined;
			user.encry_password = undefined;
			res.json(user)
		}
		)
}

const userPurchaseList = (req,res) => { 

	// Order.find({user: req.profile._id})
	// // .populate("user","_id name")
	// .exec((err,order)=>{
	// 	if(err || !order){
	// 		return res.status(400).json({
	// 			err: "No order in this account"
	// 		})
	// 	}

	// 	return res.json(order);
	// })

	User.findById(req.profile._id)
	.exec((err,doc)=>{
		if(err || !doc){
				return res.status(400).json({
						err: "No order in this account"
					})
				}
		
		return res.json(doc.purchases);
	})


 }

const pushOrderInPurchaseList = (req,res,next) => {

	let purchases = []

	req.body.order.products.forEach(product=>{
		purchases.push({
			_id: product._id,
			name: product.name,
			urlPhoto: product.urlPhoto,
			descripton: product.description,
			category: product.category,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id 
		})
	})

	// store this in DB
	User.findOneAndUpdate(
		{_id: req.profile._id},
		{$push: {purchases: purchases}},
		// new true get updated object
		{new: true},
		(err, purchases) => {
			if(err){
				return res.status(400)
				.json({
					err: "Unable to save purchase list"
				})
			}
		}
		)
	next()
}

	


module.exports = { 
	getUserById, 
	getUser, 
	getAllUsers, 
	updateUser, 
	userPurchaseList,
	pushOrderInPurchaseList
}