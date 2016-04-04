var models 	= require('./../models');
var bcrypt	= require('bcrypt-nodejs');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();


//register a new user
router.post('/register',function(req,res){
	console.log('Registration Endpoint');
	var __user = req.body;
	
	//check if user is already registered
	var where = {where:{email:__user.email}};
	models.Users.find(where)
	.then(function(user){
		if(!user){
			//user does not exist
			//encrypt password
			bcrypt.genSalt(10, function(err, salt){
				 bcrypt.hash(__user.password, salt, function(){
				  }, function(err, hash) {
		        	__user.password = hash;
		        	models.Users.create(__user)
		        	.then(function(user){
		        		//remove password from response
		        		delete user.password;
		        		res.json({user:user,msg:'Account Created'});
		        	})
		    	});
			});
		}else{
			res.json({user:null,msg:'Email is already registered'})
		}
		
	});
});

router.post('/authenticate',function(req,res){
	console.log('Authentication Endpoint');
	var __user = req.body;

	var where = {where:{email:__user.email}};
	models.Users.find(where)
	.then(function(user){
		if(user){
			//check incoming password against encrypted version
			bcrypt.compare(__user.password, user.password, function(err, valid) {
			    if(valid){
			    	//remove password from response
			    	delete user.password;
			    	//set web token
			    	var user_obj = {email:user.email};
			    	var token = jwt.sign(user_obj,'randomsalt');
					res.set('authentication',token);
			    	res.json({user:user,msg:'Authenticated'});
			    }
			    else{
			    	res.json({user:null,msg:'Email/Password is incorrect'})
			    }
			});
		}
		else{
			res.json({user:null,msg:'Email/Password is incorrect'})
		}
	})

})

module.exports = router;
