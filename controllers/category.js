const Category = require("../models/category")
const { validationResult } = require('express-validator')

exports.getCategoryById = (req,res,next,id) => {
	Category.findById(id)
	.exec((err, category) => {

		if(err || !category){
			return res.status(400).json({
				err: "No category was found in DB"
			})
		}
		req.category = category;
		next()
	})

	
} 

// exports.getCategoryById = (req,res,next,id) => {
// 	Category.findById(id)
// 	.exec((err,category) => {

// 		if(err || !category){
// 			return res.status(400).json({
// 				err: "No category was found in DB"
// 			})
// 		}
// 		//storing user in req
// 		console.log(category)
// 		req.category = category;
// 		next();

// 	})
// }

exports.createCategory = (req,res) => {

	const category = new Category(req.body);
	console.log(req.body)
	const validationErrors = validationResult(req)
	if(!validationErrors.isEmpty()){
		return res.status(400).json({
			err: validationErrors.array()[0].msg
		})
	}

	category.save((err,cat)=>{
		if(err){
			return res.status(400).json({
				err: "Not able to save category in DB"
			})
		}
	})
	res.json({category})


}

exports.getCategory = (req,res) => {
	return res.json(req.category)
}

exports.getAllCategory = (req,res) => {
	Category.find({})
	.exec((err,categories)=>{
		if(err || !categories){
			return res.status(400).json({
				err: "No categories found in DB"
			})
		}
		res.json(categories)
	})
	
}

exports.updateCategory = (req,res) => {
	const category = req.category;
	category.name = req.body.name

	category.save((err,updatedCategory)=>{
		if(err){
			return res.status(400).json({
				err: "Failed to update category"
			})
		}
		res.json(updatedCategory)
	})

}

exports.removeCategory = (req,res) => {
	const category = req.category;

	category.remove((err,category) => {
		if(err){
			return res.status(400).json({
				err: "Failed to delete category"
			})
		}
		return res.json({
			msg: "Successfully deleted"
		})
	})
}

