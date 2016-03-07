'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var path = require('path');

module.exports = function(processor) {

    processor.registerBlockType('jsmin', function (content, block, blockLine) {

        var match = blockLine.match(/build:jsmin ['"]?(.+?)['"]?\s+?-->/i);
        var outputFileDest,outputFileName,sourceFileLoc;
        var currentWorkingDir = process.env.PWD ? process.env.PWD : process.cwd();
        if(match.length>1){
        	sourceFileLoc = match[1].split(' ')[0];
        	outputFileDest = match[1].split(' ')[1];
			outputFileName = match[1].split(' ')[2];
        }
        	
        var scriptArray = blockLine.match(/src="([^"]+).js"/g);
        var scriptsToMinimize = [];
        for(var i in scriptArray)        {
        	scriptsToMinimize.push(path.join(currentWorkingDir,sourceFileLoc,scriptArray[i].replace('src="','').replace('"','')));
        }
        gulp.src(scriptsToMinimize)
			.pipe(concat(outputFileName))
			.pipe(uglify())
    		.pipe(gulp.dest(path.join(currentWorkingDir,outputFileDest)));
		return content.replace(blockLine, "<script src='"+outputFileName+"'></script>");


    });

};
