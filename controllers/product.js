const Product = require('../models/product')

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