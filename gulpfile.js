/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');
var exec = require('gulp-exec');

var options = {
  continueOnError: false, // default = false, true means don't emit error event 
  pipeStdout: false, // default = false, true means stdout is written to file.contents 
  customTemplatingThing: "test" // content passed to gutil.template() 
};
var reportOptions = {
  err: true, // default = true, false means don't write err 
  stderr: true, // default = true, false means don't write stderr 
  stdout: true // default = true, false means don't write stdout 
}
gulp.task('docker-php' ,function() {
  gulp.src('./services/php-front-end/dockerfile')
  .pipe(exec('docker kill osprey-critique || echo OK'),{continueOnError:true})
  .pipe(exec('docker rm osprey-critique  || echo OK'),{continueOnError:true})
  .pipe(exec('docker build -t osprey-critique ./services/php-front-end', options))
  .pipe(exec('docker run -p 3000:80 -d --name osprey-critique osprey-critique'),options)
  .pipe(exec.reporter(reportOptions));
})


// create a default task and just log a message
gulp.task('default', ['copyAlpha','watch']);

gulp.task('watch', function() {
  gulp.watch('./**/*', ['copyAlpha']);
});

gulp.task('copyAlpha', function() {
  // copy any html files in source/ to public/
  gulp.src('./**/*').pipe(gulp.dest('w:/quiz'));
});