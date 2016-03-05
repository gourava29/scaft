var express = require('express');
var app = new express();

app.use(express.static('./app/'));

app.get('/test',function(req,res){
	console.log(res,res);
	res.send("Success");
})

app.listen('8080',function(){
	console.log("listening on 8080")
});

