var express 	= require('express');
var models	 	= require('./../models');
var router 		= express.Router();

//endpoint:  http://localhost:8080/users
router.get('/',function(req,res){
	models.Users.findAll().then(function(users){
		res.json(users);
	})
})

router.get('/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	models.Users.find(where).then(function(user){
		res.json(user);
	})
})

//Add a new user
//endpoint:  http://localhost:8080/users
router.post('/',function(req,res){
	var user = req.body;
	models.Users.create(user).then(function(user){
		res.json(user);
		user:user;
	})
})

//update a new user
router.put('/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	var __user = req.body;

	models.Users.find(where).then(function(user){
		user.updateAttributes({
			email 		: __user.email,
			name  		: __user.name,
			password 	: __user.password,
		});

		__user.id = user.id
		res.json(__user);
	});
})

router.delete('/:userId',function(req,res){
	var where = {where:{id:req.params.userId}}
	models.Users.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});
	});
});

module.exports = router;