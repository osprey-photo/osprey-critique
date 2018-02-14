'use strict';

/**
 * Running single docker container rebuild
 * https://staxmanade.com/2016/09/how-to-update-a-single-running-docker-compose-container/
 *
 * docker-compose up -d --no-deps --build <service_name>
 */

const path = require('path');
const log = require('fancy-log');

let webFrontEnd = path.resolve( __dirname, 'services','web-front-end');
let dockerCompose = path.resolve( __dirname, 'cluster-setup','osprey-odn');

// grab our gulp packages
let gulp  = require('gulp');
let exec = require('gulp-exec');
let usage = require('gulp-help-doc');

let options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: 'test' // content passed to gutil.template()
};
let reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
};

/**
 * This simply defines help task which would produce usage
 * display for this gulpfile. Simple run `gulp help` to see how it works.
 * NOTE: this task will not appear in a usage output as far as it is not
 * marked with the @task tag.
 */
gulp.task('help', function() { return usage(gulp); });

/**
 * We may also link usage as default gulp task:
 */
gulp.task('default', ['help']);

/**
 * Rebuild the webpack comtents
 * @task {webpack} Hello
 */
gulp.task('webpack', () => {
    gulp.src(webFrontEnd)
        .pipe(exec('npm run --prefix <%= file.path %>  build:dev'),options)
        .pipe(exec.reporter(reportOptions));
});

gulp.task('docker-front-end' ,function() {
    gulp.src(webFrontEnd)
        .pipe(exec('docker build <%= file.path %>', options))
        .pipe(exec.reporter(reportOptions));
});

function rebuildOne(service){
    // docker-compose up -d --no-deps --build <service_name>
    let composerFile = path.join(dockerCompose,'/docker-compose.yml');
    let options = {service};
    gulp.src(composerFile)
        .pipe(exec('docker-compose -f <%= file.path %> up -d --no-deps --build <%= options.service %>', options))
        .pipe(exec.reporter(reportOptions));
}

/**
 * @task {data-layer}  Rebuild the data-layer
 */
gulp.task('data-layer', ()=>{
    return rebuildOne('data-layer');
});

// create a default task and just log a message
gulp.task('compose-up', ()=>{
    let composerFile = path.join(dockerCompose,'/docker-compose.yml');
    gulp.src(composerFile)
        .pipe(exec('docker-compose -f <%= file.path %> up -d', options))
        .pipe(exec.reporter(reportOptions));
});

// create a default task and just log a message
gulp.task('compose-down', ()=>{
    let composerFile = path.join(dockerCompose,'/docker-compose.yml');
    gulp.src(composerFile)
        .pipe(exec('docker-compose -f <%= file.path %> down', options))
        .pipe(exec.reporter(reportOptions));
});

gulp.task('watch', function() {
    gulp.watch('./**/*', ['copyAlpha']);
});

gulp.task('copyAlpha', function() {
    // copy any html files in source/ to public/
    gulp.src('./**/*').pipe(gulp.dest('w:/quiz'));
});


