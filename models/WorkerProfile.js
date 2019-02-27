const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema

const WorkerProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	name:{
		type: String,
		require: true
	},
	email:{
		type: String,
		require: true
	},
	company: {
		type: String,
		require: true
	},
	location: {
		type: String,
		require: true
	},
	referred: {
		type:[String],
	}
});

module.exports = WorkerProfile = mongoose.model('WorkerProfile', WorkerProfileSchema);