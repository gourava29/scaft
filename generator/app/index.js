var express = require('express');
var app = new express();
var colors = require('colors');

app.use(express.static('./app/'));

app.get('/test',function(req,res){
	console.log(res,res);
	res.send("Success");
})
var port = process.argv[2] === '--port' ? process.argv[3] : 8080;
app.listen(port,function(){
	console.log("-----------------------------------");
	console.log("      App UI".red + ": http://localhost:"+port.blue)
	console.log("-----------------------------------");
});

