const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
	name:{
		type: String,
		require: true
	},
	email:{
		type: String,
		require: true
	},
	password:{
		type: String,
		require: true
	},
	studentOrNot: {
		type: Boolean
	},
	date: {
		type: Date,
		require: true
	}	
});

module.exports = User = mongoose.model('User', UserSchema);