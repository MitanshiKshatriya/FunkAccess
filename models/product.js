// mongoose ObjectID to connect to another shchema
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		maxlength: 32,
	},
	desc:{
		type: String,
		trim: true,
		required: true,
		maxlength: 2000,
	},
	price:{
		type: Number,
		trim: true,
		required: true,
		maxlength: 32,
	},
	category:{
		type: ObjectId,
		ref: "Category",
		required: true
	},
	stock:{
		type: Number
	},
	sold:{
		type:Number,
		default:0
	},
	photo:{
		data: Buffer,
		contentType: String
	},
	urlPhoto:{
		type:String,
		required:true
	},
	size:{
		type: String
	}

}, { timestamps: true }
)


module.exports = mongoose.model("Product",productSchema)