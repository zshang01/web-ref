const Validator = require('validator');
const isEmpty = require('../validation/is-empty');

module.exports = function validateRegisterInput(data){
	let errors = {};

	data.name = isEmpty(data.name) ? "" : data.name;
	data.email = isEmpty(data.email) ? "" : data.email;
	data.password = isEmpty(data.password) ? "" : data.password;
	data.password2 = isEmpty(data.password2) ? "" : data.password2;


	if(!Validator.isLength(data.name, {min: 2, max: 30})){
		errors.name = 'name must be between 2 to 30';
	}

	if(Validator.isEmpty(data.name)){
		errors.name = 'name is empty';
	}

	if(Validator.isEmpty(data.email)){
		errors.email = 'email is empty';
	}

	if(!Validator.isEmail(data.email)){
		errors.email = 'email is not email';
	}

	if(!Validator.isLength(data.password, {min: 6, max: 25})){
		errors.password = 'password must be 6 - 25';
	}

	if(!Validator.isLength(data.password2, {min: 6, max: 25})){
		errors.password2 = 'comfirm password field';
	}

	if(!Validator.equals(data.password, data.password2)){
		errors.password2 = 'password must be matched';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	}
}