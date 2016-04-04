var express 	= require('express');
var models	 	= require('./../models');
var randomString = require('random-string');
var jwt 		 = require('jsonwebtoken');
var router 		= express.Router();


router.post('/login',function(req,res){
	var where = {where:{email:req.body.email,password:req.body.password}};
	models.Users.find(where).then(function(user){
		var user_obj = {email:user.email,id:user.id};
		var token = jwt.sign(user_obj,'Fv1f3Y37S3RorBbT4PumpWVHejaEYnGs');
			res.set('authentication',token);
	        res.json({
	        	user:user
	        });
	});
});


module.exports = router;


















// //endpoint:  http://localhost:8080/users
// router.get('/',function(req,res){
// 	models.Users.findAll().then(function(users){
// 		res.json(users);
// 	})
// })

// //Add a new user
// //endpoint:  http://localhost:8080/users
// router.post('/',function(req,res){
// 	var user = req.body;
// 		user.status='active';
// 	models.Users.create(user).then(function(user){
// 		res.json(user);
// 		user:user;
// 	})
// })

// //get by Id
// router.get('/:userId',function(req,res){
// 	var where = {where:{id:req.params.userId}}
// 	models.Users.find(where).then(function(user){
// 		res.json(user);
// 	})
// })

// //update a user info
// router.put('/:userId',function(req,res){
// 	var where = {where:{id:req.params.userId}}
// 	var __user = req.body;

// 	models.Users.find(where).then(function(user){
// 		user.updateAttributes({
// 			email: __user.email,
// 			name: __user.name,
// 			password: __user.password,
// 		});
// 		__user.id = user.id;
// 		res.json(__user);
// 	});
// })

// //delete by Id
// router.delete('/:userId',function(req,res){
// 	console.log('delete');
// 	var where = {where:{id:req.params.userId}}
// 	models.Users.find(where).then(function(user){
// 		user.destroy();
// 		res.json({
// 			deleted:true
// 		});
// 	});
// });