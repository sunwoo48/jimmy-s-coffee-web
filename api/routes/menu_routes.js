var express 	= require('express');
var models	 	= require('./../models');
var router 		= express.Router();

//endpoint:  http://localhost:8080/item
router.get('/',function(req,res){
	models.Menus.findAll().then(function(items){
		res.json(items);
	})
})

//Add a new item
//endpoint:  http://localhost:8080/item
router.post('/',function(req,res){
	var item = req.body;
		item.status='active';
	models.Menus.create(item).then(function(item){
		res.json(item);
		item:item;
	})
})

//get by Id
router.get('/:itemId',function(req,res){
	var where = {where:{id:req.params.itemId}}
	models.Menus.find(where).then(function(item){
		res.json(item);
	})
})

//update a item info
router.put('/:itemId',function(req,res){
	var where = {where:{id:req.params.itemId}}
	var __item = req.body;

	models.Menus.find(where).then(function(item){
		item.updateAttributes({
			category: __item.category,
			name: __item.name,
			price: __item.price,
		});
		__item.id = item.id;
		res.json(__item);
	});
})

//delete by Id
router.delete('/:itemId',function(req,res){
	console.log('delete');
	var where = {where:{id:req.params.itemId}}
	models.Menus.find(where).then(function(item){
		item.destroy();
		res.json({
			deleted:true
		});
	});
});

module.exports = router;
