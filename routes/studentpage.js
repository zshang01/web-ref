const express = require('express');
const router = express.Router();


const passport = require('passport');

const StudentProfile = require('../models/StudentProfile');
const WorkerProfile = require('../models/WorkerProfile');

const validateStudentProfile = require('../validation/studentProfileInput');
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');


// register student profile
router.post('/register', (req, res)=>{

		// const {errors, isValid} = validateStudentProfile(req.body);
		// if(!isValid){
		// 	return res.status(400).json(errors);
		// }
		//console.log(req);
		const studentprofile = {};
		
		
		emailkey = req.body.email;
		if(req.body.name) studentprofile.name = req.body.name;
		if(req.body.email) studentprofile.email = req.body.email;
		if(req.body.location) studentprofile.location = req.body.location;
		//if(typeof req.body.skills !== 'undefined') studentprofile.skills = req.body.skills.split(',');
		if(req.body.bio) studentprofile.bio = req.body.bio;
		//if(typeof req.body.applied !== 'undefined') studentprofile.applied = req.body.applied.split(',');
		console.log(emailkey)
		StudentProfile.findOne({emailkey})
			.then(profile => {
				console.log(profile);
				if(profile){
					StudentProfile.findOneAndUpdate({user: req.user.id}, { $set: studentprofile },{new : true})
						.then(profile => res.json(profile));
						return res.status(200);
				}else{
					new StudentProfile(studentprofile).save()
						.then(profile => res.json(profile));
						return res.status(200);
				}
			})
});


// applied a compnay from student
// and update the student
router.post('/applied', passport.authenticate('jwt', {session: false}), (req, res)=>{
		const {errors, isValid} = validateStudentProfile(req.body);
		
		const studentprofile = {};
		studentprofile.user = req.user.id;
		if(req.body.name) studentprofile.name = req.body.name;
		if(req.body.email) studentprofile.email = req.body.email;
		if(req.body.location) studentprofile.location = req.body.location;
		if(typeof req.body.skills !== 'undefined') studentprofile.skills = req.body.skills.split(',');
		if(req.body.bio) studentprofile.bio = req.body.bio;
		if(typeof req.body.applied !== 'undefined') {
			 studentprofile.applied = req.body.applied.split(',');

		}
		if(typeof req.body.applied === 'undefined') studentprofile.applied = [];
		console.log(studentprofile.applied);
		if(req.body.new_apply) {
			console.log(req.body.new_apply);
			studentprofile.applied.push(req.body.new_apply);
		
		}
		console.log(studentprofile.applied);
		StudentProfile.findOne({user: req.user.id})
			.then(profile => {
				if(profile){
					console.log("expeceted");
					StudentProfile.findOneAndUpdate({user: req.user.id}, { $set: studentprofile }, {new : true})
						.then(res.json(profile));
				}else{
					new StudentProfile(studentprofile).save()
						.then(profile => res.json(profile));
				}
			})
});


// look up all workers' profile
router.get('/all', (req, res)=>{
	const errors = {};
	const workers = {};
	WorkerProfile.find({})
  		.then(profile => {
  			if(profile){
  				return res.json(profile);
  			}
  		})
		
});



// look up woker based on company 

router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
	const errors = {};
	const profiles = {};
	WorkerProfile.find({company: req.company})
		.then(workerprofile => {
			if(!workerprofile){
				errors.noprofile = 'there is not such profile';
				errors.id = req.user.id;
				return res.status(404).json(errors);
			}
			profiles.push(workerprofile);
			
		})
		.catch(err => res.status(404).json(err));

	res.json(profiles);
});


// ask referred 
// then add the worker's id into studnet's object
router.post('/ask', passport.authenticate('jwt', {session: false}), (req, res) =>{
	const {errors, isValid} = validateStudentProfile(req.body);
		
		const studentprofile = {};
		studentprofile.user = req.user.id;
		if(req.body.name) studentprofile.name = req.body.name;
		if(req.body.email) studentprofile.email = req.body.email;
		if(req.body.location) studentprofile.location = req.body.location;
		if(typeof req.body.skills !== 'undefined') studentprofile.skills = req.body.skills.split(',');
		if(req.body.bio) studentprofile.bio = req.body.bio;
		if(typeof req.body.applied !== 'undefined') {
			 studentprofile.applied = req.body.applied.split(',');
		}
		studentprofile.asked = [];
		//console.log(studentprofile.asked);
		
		console.log(studentprofile.asked);
		if(req.body.asked) {
			console.log(req.body.asked);
			console.log(new ObjectId(req.body.asked));
			studentprofile.asked.push(new ObjectId(req.body.asked));
		}
		console.log(studentprofile.asked);
		StudentProfile.findOne({user: req.user.id})
			.then(profile => {
				if(profile){
					for(var i = 0; i < profile.asked.length; i++){
						studentprofile.asked.push(profile.asked[i]);
					}
					StudentProfile.findOneAndUpdate({user: req.user.id}, { $set: studentprofile }, {new : true})
						.then(res.json(profile));
				}else{
					new StudentProfile(studentprofile).save()
						.then(profile => res.json(profile));
				}
			})
});

       


// look up worker has already asked for referrel
router.get('/referred', passport.authenticate('jwt', {session: false}), (req, res)=>{
	const studentprofile = {};
	studentprofile.user = req.user.id;
	const Workers = {};
	StudentProfile.findOne({user: req.user.id})
			.then(profile => {
				if(profile){
					if(typeof profile.asked !== 'undefined'){
						const ids = [];
						for(var i = 0; i < profile.asked.length; i++){
							ids.push(profile.asked[i]);
						}
						console.log(ids.length);
						WorkerProfile.find({"user": ids})
							.then(worker =>{
								res.json(worker);
							})


					}
				}
			})
});

module.exports = router;