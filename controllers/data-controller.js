var Person = require('../models/person.js');
var jwt = require('jsonwebtoken');

module.exports.getData = function(req,res){
	Person.find({},function(err,buddy){
		if(err){
			res.status(500).send("couldn't run the query")
		}
	res.json({data:buddy})
	})
}

module.exports.postData = function(req,res){
	var person = new Person(req.body);
jwt.verify(req.body.token, process.env.SECRET_KEY, function(err, decoded) {
		    console.log(err, decoded);
		    if(decoded)
		    	{
		    		res.send("your token has expired")}
else{
	person.save(function(err){
		if(err){
			return res.status(500).send("couldn't save the user at this time.")
		}
});


		

		res.status(200).send("you have added a new person")
}});
}
