const express = require('express');
const router = express.Router();


const passport = require('passport');

const StudentProfile = require('../models/StudentProfile');
const WorkerProfile = require('../models/WorkerProfile');


router.get('/test', (req, res) =>{
	res.json({msg: 'Profile workds'});
});

router.get('/user/:user_id', (req, res) =>{
	const errors = {};
	StudentProfile.findOne({user: req.params.user_id})
		.populate('user', ['name'])
		.then(profile => {

			if(!profile){

				errors.noprofile = req.params.user_id;
				res.status(404).json(errors);
			}
		})
		.catch(err => res.status(404).json(errors))

});


//look up all student profile
router.get('/all', (req, res)=>{
	StudentProfile.find({})
  		.then(profile => {
  			if(profile){
  				return res.json(profile);
  			}
  		})
  		.catch(err => console.log(err));
});


// look up student profile by id
router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
	const errors = {};

	StudentProfile.findOne({user: req.user.id})
		.then(studentprofile => {
			if(!studentprofile){
				errors.noprofile = 'there is not such profile';
				errors.id = req.user.id;
				return res.status(404).json(errors);
			}
			res.json(studentprofile);
		})
		.catch(err => res.status(404).json(err));
});





// register worker profile
router.post('/register', (req, res)=>{
		const errors = {};

		const workerprofile = {};
		emailkey = req.body.email;
		if(req.body.name) workerprofile.name = req.body.name;
		if(req.body.email) workerprofile.email = req.body.email;
		if(req.body.location) workerprofile.location = req.body.location;
		if(req.body.company) workerprofile.company = req.body.company;
		//if(typeof req.body.referred !== 'undefined') studentprofile.referred = req.body.referred.split(',');
		
		WorkerProfile.findOne({emailkey})
			.then(profile => {
				if(profile){
					WorkerProfile.findOneAndUpdate({user: req.user.id}, { $set: workerprofile },{new : true})
						.then(profile => res.json(profile));
				}else{
					new WorkerProfile(workerprofile).save()
						.then(profile => res.json(profile));
				}
			})
})





module.exports = router;