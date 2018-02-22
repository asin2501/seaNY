'use strict';

let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    //bourbon = require('node-bourbon'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    wait = require('gulp-wait2');
let browserSync = require('browser-sync').create();
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
// let uglify = require('gulp-uglify');
let sourcemaps = require('gulp-sourcemaps');


// Scss stylesheets
gulp.task('stylesheets', function() {
    return gulp.src('styles/**/*.scss')
        .pipe(wait(150))
        .pipe(sass({
            // outputStyle: 'compressed',
        })).on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest('assets/'))
});

gulp.task('watch', function() {
    watch(['styles/**/*.scss'], function(event, cb) {
        gulp.start('stylesheets');
    });
    watch(['scripts/**/*.js'], function(event, cb) {
        gulp.start('js');
    });
    // watch()

});

gulp.task('js', function() {
    // app.js is your main JS file with all your module inclusions
    return browserify({
            entries: 'scripts/main.js',
            debug: true
        })
        .transform("babelify", {
            presets: ["es2015", "es2016"]
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        // .pipe(sourcemaps.init())
        // .pipe(uglify())
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('assets/'))
});

// Run
gulp.task('default', [
    'stylesheets',
    'js',
    // 'copy',
]);