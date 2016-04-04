var gulp = require('gulp');
var babelify = require('babelify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var react = require('gulp-react');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');

var projectRootFolder = './';

var projectJsFolder = projectRootFolder + 'lib/';
var projectJsApplication = 'application.js';
var projectJsApplicationMin = 'application.min.js';


function prepareBundler(){
    return browserify({
        entries: ["index.js"],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths:true
    });
}

function executeJsTask(appBundler){
    return appBundler
        .on('error', function(){
            console.log(arguments);
        })
        .transform(["babelify"])
        .bundle()
        .pipe(source(projectJsApplication))
        //.pipe(streamify(uglify()))
        .pipe(gulp.dest(projectJsFolder));
}

gulp.task('js', function(){
    var appBundler = prepareBundler();
    return executeJsTask(appBundler);
});



gulp.task('default', ['js']);


