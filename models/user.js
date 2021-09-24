const mongoose = require('mongoose');
const crypto = require('crypto');
const {v4: uuidv4} = require('uuid');
const Schema = mongoose.Schema 

var userSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: 32,
	},
	lastname: {
		type: String,
		maxlength: 32,
	},
	email:{
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	userinfo:{
		type:String,
		trim:true
	},
	//TODO: come back here
	encry_password: {
		type: String, 
		trim: true
	},
	salt: String,
	role:{
		// higher num higher privelege
		type: Number,
		default: 0
	},
	purchases: {
		type: Array,
		default: []
	}
}, { timestamps: true })

userSchema.virtual("password")
	.set(function(password){
		this._password = password
		this.salt = uuidv4()
		this.encry_password = this.securePassword(password,this.salt)
	})
	.get(function(){
		console.log("hello can u heear me: "+this._password.length)
		return this._password
	})

userSchema.methods = {

	authenticate: function(plainpassword){
		return this.securePassword(plainpassword)===this.encry_password
	},
	securePassword: function(plainpassword){
		if(!plainpassword) return "";

		try{
			return crypto.createHmac('sha256', this.salt)
               .update(plainpassword)
               .digest('hex');
		} catch(err){
			return "";
		}


	}
}

module.exports = mongoose.model('User',userSchema)