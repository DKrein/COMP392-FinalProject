// adding required modules to the project
var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tscProject = tsc.createProject('tsconfig.json');
var connect = require('gulp-connect');
var open = require('gulp-open');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Declare file sources
var TypeScriptSources = [
    './Scripts/**/*.ts',
    './typings/**/*.ts'];
    
var JavaScriptSources = [
    './Scripts/**/*.js'];    

var HTMLSources = ['./**/*.html'];

var CSSSources = ['./Content/**/*.css'];

// This task Transpiles TypeScript to JavaScript
gulp.task('transpile', function () {
    gutil.log("transpiling...");

    var tsResult = gulp.src(TypeScriptSources)
        .pipe(sourcemaps.init())
        .pipe(tsc(tscProject))
        .on('error', gutil.log);

    tsResult.dts.pipe(gulp.dest('./Scripts/'));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./Scripts/'))
        .on('error', gutil.log)
        .pipe(connect.reload()); 
});

gulp.task('js-fef', function(){
    return gulp.src([
     './Scripts/objects/gameobject.js', 
     './Scripts/objects/keyboardcontrols.js', 
     './Scripts/objects/mousecontrols.js', 
     './Scripts/config/screen.js',
     './Scripts/scenes/scene.js',   
     './Scripts/scenes/level1.js',
     './Scripts/scenes/level2.js', 
     './Scripts/scenes/level3.js', 
     './Scripts/scenes/over.js', 
     './Scripts/scenes/help.js',
     './Scripts/scenes/menu.js',
     './Scripts/core/_reference.js',  
     './Scripts/core/game.js' 
     ]).pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('uglify.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

// This task reloads the browser when any changes occur to html pages
gulp.task("html", function () {
    gutil.log("html changed...");
    gulp.src(HTMLSources)
    .pipe(connect.reload()); 
});

// This task reloads the browser when any changes occur to css files
gulp.task('css', function(){
   gutil.log("css files changed...");
   gulp.src(CSSSources)
   .pipe(connect.reload()); 
});

// This task watches .ts .js and .html files for any changes
gulp.task("watch", function () {
    gulp.watch(TypeScriptSources, ['transpile']);
    gulp.watch(HTMLSources, ['html']);
    gulp.watch(CSSSources, ['css']);
    gulp.watch(JavaScriptSources, ['js-fef']);
});

// This task creates a local server and turns on livereload functionality
gulp.task("connect", function () {
    connect.server({
        root: './',
        livereload: true
    });
});



// This task opens Chrome within the local connect server
gulp.task('open', function () {
    gulp.src('./index.html')
        .pipe(open({uri: 'http://localhost:8080'}));
});

// This is the default task that runs everything
gulp.task("default", ["transpile", "js-fef", "html", "css", "connect", "open", "watch"]);