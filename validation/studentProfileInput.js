const Validator = require('validator');
const isEmpty = require('../validation/is-empty');


module.exports = function validateStudentProfile(data){
	let errors = {};

	//data.name = isEmpty(data.name) ? "" : data.name;
	//data.email = isEmpty(data.email) ? "" : data.email;
	data.skills = isEmpty(data.skills) ? "" : data.skills;


	// if(!Validator.isLength(data.name, {min: 2, max: 30})){
	// 	errors.name = 'name must be between 2 to 30';
	// }

	// if(Validator.isEmpty(data.name)){
	// 	errors.name = 'name is empty';
	// }

	// if(Validator.isEmpty(data.email)){
	// 	errors.email = 'email is empty';
	// }

	// if(!Validator.isEmail(data.email)){
	// 	errors.email = 'email is not email';
	// }

	if(Validator.isEmpty(data.skills)){
		errors.skills = 'skills is empty';
	}


	return {
		errors,
		isValid: isEmpty(errors)
	}
}