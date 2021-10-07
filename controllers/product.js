const Product = require('../models/product')
const { validationResult } = require('express-validator')
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

//params get product by id
exports.getProductById = (req,res,next,id) => {
	Product.findById(id)
	.exec((err,product)=>{
		if(err || !product){
			res.status(400).json({
				err: "No such product found in DB"
			})
		}
		req.product = product
		next()
	})
}

//create product
exports.createProductFile = (req,res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true

	form.parse(req, (err, fields, file) => {

		if(err){
			return res.status(400).json({
				err: `problem with image: ${err}`
			})
		}

		// Destructuring the fields
		const { name,desc,price,category,
			stock, urlPhoto } = fields

		if(!name || !desc || !price || !category
			|| !stock || !urlPhoto){
			return res.status(400).json({
				err: "Please include all fields"
			})
			}


		//TODO: restrictions on field
		let product = new Product(fields)

		//hande]le file here
		if(file.photo!=undefined){
		if(file.photo.size > 3*1024*1024){
			return res.status(400).json({
				err: "File size is above 3mb"
			})
		}
		product.photo.data = fs.readFileSync(
			file.photo.path)

		product.photo.contentType = file.photo.type
		}

		console.log(product)
		//save to the db
		product.save((err,product)=>{
			if(err){
				return res.status(400).json({
					err: "Could not save product to DB"
				})
			}

			res.json({
				msg: "Prouct saved succssfully! "+product
			})
		})

	})
}

//create product
exports.createProduct = (req,res) => {
	const product = new Product(req.body)
	
	const validationErrors = validationResult(req)
	if(!validationErrors.isEmpty()){
		console.log(validationErrors.array())
		return res.status(400).json({
			err: validationErrors.array()[0].msg
		})
	}

	product.save((err,prod)=>{
		if(err){
			return res.status(400).json({
				err: "Not able to save product in DB"
			})
		}
		return res.json(prod)
	})
}


//get product
exports.getProduct = (req,res) => {
	req.product.photo = undefined
	return res.json(req.product)
}

//handling binary data loading middleware
exports.photo = (req,res,next) => {
	if(req.product.photo && req.product.photo.data){
		res.set("Content-Type",req.product.contentType)
		return res.send(req.product.contentType)
	}
	next()
}

//delete product
exports.removeProduct = (req,res) => {
	let product = req.product
	product.remove((err,deletedProduct)=>{
		if(err){
			return res.status(400).json({
				err: "Failed to delted product"
			})
		}
		res.json({
			msg: "Product delted succssfully",
			deletedProduct
		})
	})
}

//update product
exports.updateProduct1 = (req,res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true

	form.parse(req, (err, fields, file) => {

		if(err){
			return res.status(400).json({
				err: `problem with image: ${err}`
			})
		}



		//TODO: restrictions on field
		let product = req.product
		// updates field in products from
		// fields
		product = _.extend(product, fields)

		//handele file here
		if(file.photo!=undefined){
		if(file.photo.size > 3*1024*1024){
			return res.status(400).json({
				err: "File size is above 3mb"
			})
		}
		product.photo.data = fs.readFileSync(
			file.photo.path)

		product.photo.contentType = file.photo.type
		}

		console.log(product)
		//save to the db
		product.save((err,product)=>{
			if(err){
				return res.status(400).json({
					err: "Update product to DB failed"
				})
			}

			res.json({
				msg: "Prouct updated succssfully! "+product
			})
		})

	})
}

//create product
exports.updateProduct = (req,res) => {
	let product = req.product
	product = _.extend(product, req.body)

	const {name,desc,price,category,stock,urlPhoto} = product
	if(!name || !desc || !price || !category || !stock || !urlPhoto){
		return res.status(400).json({
			err: "Some fields are missing"
		})
	}

	product.save((err,prod)=>{
		if(err){
			return res.status(400).json({
				err: "Not able to update product in DB"
			})
		}
		return res.json(prod)
	})
}


//get all product
exports.getAllProduct = (req,res) => {
	let limit = req.query.limit ? 
	parseInt(req.query.limit) : 8

	let sortBy = req.query.sortBy ? 
	req.query.sortBy : "_id"

	let orderBy = req.query.orderBy ?
	req.query.orderBy : "asc"

	Product.find()
	.select("-photo")
	.limit(limit)
	.sort([[sortBy, orderBy]])
	.exec((err,products)=>{

		if(err){
			return res.status(400).json({
				err: "No product found"
			})
		}


		res.json(products)

	})
}

// get all unique category
exports.getAllUniqueCategory = (req,res) => {
	Product.distinct("category", {},
		(err,categories)=>{
			if(err){
				res.status(400).json({
					err: "no category found"
				})
			}
			res.json(categories)
		}
		)
}


//middleware handle purchases
//update stock(-qty) && sold(+qty)
exports.updateStockAndInventory = (req,res,next) => {
	
	let myOperations = req.body.order.products
	.map(prod => {
		return {
			updateOne: {
				filter: {_id: prod._id},
				//prod.count coming from frontend
				update: {$inc: 
					{stock: -prod.count, 
					sold: +prod.count}
				}
			}
		}
	})

	Product.bulkWrite(myOperations,{}, 
		(err,products)=>{
			if(err){
				res.status(400).json({
					err: "Bulk Operation failed"
				})
			}

			next()

		})
}

