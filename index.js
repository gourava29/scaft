#!/usr/bin/env node
var child_pro = require('child_process');
	fs = require('fs'),
    path = require('path');
    shell = require('./helpers/shellHelper')
    gulp = require('gulp');
    copy = require('gulp-copy');
    change = require('gulp-change');
    commander = require('commander');
    rename = require('gulp-rename');
    clean = require('gulp-clean');
    nodetree = require('nodetree');
   	
var currentWorkingDirectory = process.env.PWD

var dirString = path.dirname(fs.realpathSync(__filename));

var replaceContent = function(content, done, stringToReplace){
	var stringToBeReplacedTo = process.argv[3];
	if(process.argv[2] == 'add'){
		stringToBeReplacedTo = path.parse(process.argv[4]).name;
	}
	content = content.replace(eval("/"+stringToReplace+"/g"), stringToBeReplacedTo)
	done(null, content);
}

var setTitle = function(content, done){
	replaceContent(content, done, 'APP_NAME');
};

var setJs = function(content, done){
	replaceContent(content, done, 'JS_NAME');
}

var setHtml = function(content, done){
	replaceContent(content, done, 'HTML_TITLE');
}

gulp.task("setup", function(cb){
	console.log("Creating Templates");
	var count = 0;
	return gulp.src(path.join(dirString,'generator/app/**/*'))
		.pipe(change(setTitle))
		.pipe(gulp.dest('./'+process.argv[3]));
});

gulp.task("addjs", function(input){
	var destinationFolder = path.join('app',path.parse(process.argv[4]).dir);
	var destinationFileName = path.parse(process.argv[4]).name + ".js";
	gulp.src(path.join(dirString,'generator/app.js'))
		.pipe(change(setJs))
		.pipe(rename(destinationFileName))
		.pipe(gulp.dest(destinationFolder));
});

gulp.task("addcss", function(input){
	var destinationFolder = path.join('app',path.parse(process.argv[4]).dir);
	var destinationFileName = path.parse(process.argv[4]).name + ".css";
	gulp.src(path.join(dirString,'generator/app.css'))
		.pipe(rename(destinationFileName))
		.pipe(gulp.dest(destinationFolder));
});

gulp.task("addhtml", function(input){
	var destinationFolder = path.join('app',path.parse(process.argv[4]).dir);
	var destinationFileName = path.parse(process.argv[4]).name + ".html";
	gulp.src(path.join(dirString,'generator/app.html'))
		.pipe(change(setHtml))
		.pipe(rename(destinationFileName))
		.pipe(gulp.dest(destinationFolder));
});

gulp.task("addtemplate", function(input){
	var destinationFolder = path.join('app',path.parse(process.argv[4]).dir);
	var destinationFileName = path.parse(process.argv[4]).name + ".html";
	gulp.src(path.join(dirString,'generator/app_template.html'))
		.pipe(rename(destinationFileName))
		.pipe(gulp.dest(destinationFolder));
});

gulp.task("remove", function(){
	var sourceFileToRemove = path.join('app',process.argv[4]+"."+process.argv[3]);
	console.log(sourceFileToRemove)
	gulp.src(sourceFileToRemove, {read: false})
	    .pipe(clean());
});

gulp.task("install_dependencies", ["setup"], function(){
	nodetree('./'+process.argv[3], {
	  all: false,
	  directories: false,
	  level: 4,
	  prune: false,
	  noreport: false
	});
	console.log("Templates created");
	process.chdir(path.join(process.cwd(), process.argv[3]));
	shell.series([
	    'npm install -g gulp-cli',
	    'npm install'
	], function(err){
		if(err){
			console.log(err);
		}
	});
});

gulp.task("create", ["setup", "install_dependencies"]);

function create(){
	gulp.start('create');
}

function add(input){
	gulp.start('add'+input);
}

function remove(input){
	gulp.start('remove');
}

function serve(){
	shell.exec('gulp');
}

function build(){
	shell.exec('gulp build');
}

commander.version(process.env.npm_package_version)
		 .usage('[command] <option...>')
		 .option('-c, create <project_name>', 'Creates a new project', create)
		 .option('-a, add <js|css|html|template> <file_name>', 'Creates a new file', add)
		 .option('-r, remove <js|css|html|template> <file_name>', 'removes file', remove)
		 .option('-s, serve', 'Start server', serve)
		 .option('-b, build', 'Build Project', build)

commander.parse(process.argv);
var isValid = (commander.options.filter(function(item){
	return ( item.short === process.argv[2] || item.long === process.argv[2] );
}).length > 0);
if ( !process.argv.slice(2).length || !isValid ) {
	commander.outputHelp();
}	

