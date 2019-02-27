const Validator = require('validator');
const isEmpty = require('../validation/is-empty');

module.exports = function validateLoginInput(data){
	let errors = {};

	data.email = isEmpty(data.email) ? "" : data.email;
	data.password = isEmpty(data.password) ? "" : data.password;
	

	

	if(!Validator.isEmail(data.email)){
		errors.email = 'email is not email';
	}

	if(Validator.isEmpty(data.email)){
		errors.email = 'email is empty';
	}

	if(!Validator.isLength(data.password, {min: 6, max: 25})){
		errors.password = 'password must be 6 - 25';
	}

	

	if(Validator.isEmpty(data.password)){
		errors.password = 'password is empty';
	}
	



	return {
		errors,
		isValid: isEmpty(errors)
	}
}