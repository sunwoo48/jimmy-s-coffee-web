var express 	= require('express');
var models	 	= require('./../models');
var router 		= express.Router();


//endpoint:  http://localhost:8080/staffs
router.get('/',function(req,res){
	models.Staffs.findAll().then(function(staffs){
		res.json(staffs);
	})
})

//Add a new staff
//endpoint:  http://localhost:8080/staffs
router.post('/',function(req,res){
	var staff = req.body;
		staff.status='active';
	models.Staffs.create(staff).then(function(staff){
		res.json(staff);
		staff:staff;
	})
})

//get by Id
router.get('/:staffId',function(req,res){
	var where = {where:{id:req.params.staffId}}
	models.Staffs.find(where).then(function(staff){
		res.json(staff);
	})
})

//update a staff info
router.put('/:staffId',function(req,res){
	var where = {where:{id:req.params.staffId}}
	var __staff = req.body;

	models.Staffs.find(where).then(function(staff){
		staff.updateAttributes({
		    name: __staff.name,
		    image: __staff.image,
		    bio: __staff.bio,
		    category:  __staff.category,
		});
		__staff.id = staff.id;
		res.json(__staff);
	});
})

//delete by Id
router.delete('/:staffId',function(req,res){
	console.log('delete');
	var where = {where:{id:req.params.staffId}}
	models.Staffs.find(where).then(function(staff){
		staff.destroy();
		res.json({
			deleted:true
		});
	});
});

module.exports = router;