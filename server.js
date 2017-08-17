var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken')

var app = express();
var secureRoutes = express.Router();
//Controllers
var dataController = require('./controllers/data-controller');
var authenticateController = require('./controllers/authenticate-controller');

process.env.SECRET_KEY = "L3KL53H85778&%^%&35";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/secure-api',secureRoutes);

var config = require('./config/config.js');


mongoose.connect(config.url);

app.get('/api/authenticate',authenticateController.authenticate);

app.get('/api/get-data',dataController.getData);

//validation middleware
secureRoutes.use(function(req,res,next){
var token = req.body.token || req.headers['token'];

if(token){
	jwt.verify(token,process.env.SECRET_KEY,function(err,decode){
		if(err){
			res.status(500).send('invalid token')
		}
		else{
			next();
		}
	})
}
else{
	res.send('please send a token')
}
})
secureRoutes.post('/api/post-data',dataController.postData);

app.listen(9000,function(){
console.log('server is running');
})
