#!/usr/bin/env node
var child_pro = require('child_process');
	fs = require('fs'),
    path = require('path');
var currentWorkingDirectory = process.env.PWD


var dirString = path.dirname(fs.realpathSync(__filename));
console.log("copying project")
child_pro.exec('cp -a '+dirString+'/sampleApp/. ./',{
	cwd: currentWorkingDirectory
},function(error,stdout,stderr){
	if(!error){
		console.log("project copied");
		console.log("installing node_modules")
		child_pro.exec('npm install',{
			cwd: currentWorkingDirectory
		},function(error,stdout,stderr){
			if(!error){
				console.log("node_modules installed")
			}
		});
	}
})