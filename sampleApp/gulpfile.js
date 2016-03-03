var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var exec = require('child_process').exec;

gulp.task('compress', function() {
	gulp.src('app/**/*.html').pipe(livereload())
	return gulp.src('app/js/*/*.js')
	.pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist')).pipe(livereload());

});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('app/**/*.html')
	gulp.watch('app/js/*/*.js', ['compress']);
});

gulp.task('server', function () {
  exec('node index.js', function (err, stdout, stderr) {
    console.log(stdout);
  });
})

gulp.task('default',['server','watch']);
