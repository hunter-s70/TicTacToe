/**
 * Created by hunter_s70 on 11.12.2016.
 */
'use strict';

var gulp = require('gulp'),
    jsmin = require('gulp-jsmin'),
    htmlmin = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css');

var path = {
    dist: {
        js   : 'web/js/',
        css  : 'web/css/',
        html : 'web'
    },

    src: {
        js   : 'source/js/*.js',
        css  : 'source/css/*.css',
        html : 'source/**/*.html'
    }
};

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(concat('app.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest(path.dist.js));
});

gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(cssmin({advanced: false}))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(htmlmin())
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('build', [
    'js:build',
    'css:build',
    'html:build'
]);

gulp.task('default', ['build']);