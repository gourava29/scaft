var express = require('express');
var app = new express();
var colors = require('colors');

app.use(express.static('./app/'));

app.get('/test',function(req,res){
	console.log(res,res);
	res.send("Success");
})

app.listen('8080',function(){
	console.log("-----------------------------------");
	console.log("      App UI".red + ": http://localhost:8080".blue)
	console.log("-----------------------------------");
});

