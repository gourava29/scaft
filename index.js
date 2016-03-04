#!/usr/bin/env node
var child_pro = require('child_process');
	fs = require('fs'),
    path = require('path');
    shell = require('./helpers/shellHelper')
var currentWorkingDirectory = process.env.PWD


var dirString = path.dirname(fs.realpathSync(__filename));
console.log("copying project")
shell.series([
    'cp -a '+dirString+'/sampleApp/. ./',
    'npm install -g gulp-cli',
    'npm install'
], function(err){
   console.log('executed many commands in a row'); 
});
