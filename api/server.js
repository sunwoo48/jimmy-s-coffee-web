//
try{
	var env = require('./config/env_dev');
}
catch(err){
	var env = require('./config/env_prod');
}


var express = require('express');
var models = require('./models');
var bodyParser =require('body-parser');
var app = express();
var sequelize = require('sequelize');
var multer = require('multer');
var authentication = require("./middleware/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app/'));


//DEFINE ROUTES
var user_routes = require('./routes/users_routes');
var menu_routes = require('./routes/menu_routes');
var staff_routes = require('./routes/staff_routes');
var auth_routes = require('./routes/auth_routes');


app.use('/users',user_routes);
app.use('/item',menu_routes);
app.use('/staffs',staff_routes);
app.use('/api/auth',auth_routes);


//star server and database
models.sequelize.sync().then(function() {
	app.listen(env.port,function(){
		console.log('Listenting on '+env.host+':'+env.port);
		console.log('Stop server with CTRL + C');
	})
})



// Image upload
var storageDetails = multer.diskStorage({
	destination: './../app/uploads/',
	filename: function(req, file, callback) {
		var originalname = file.originalname;
		var extension = originalname.substring(originalname.lastIndexOf('.'));
		var withoutExtension = originalname.substring(0, originalname.lastIndexOf('.'));
		var fullfilename = withoutExtension + '_' + Date.now() + extension;
		callback(null, fullfilename);
	}
});

var upload = multer({storage: storageDetails, fileSize: 500000}).any();

app.post('/img', upload, function(req, res) {
	res.json(req.files);	
})