'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var electron = require('electron-connect').server.create();
var srcDir = 'app/src';
var distDir = 'app/build';
var scriptsPattern = srcDir + '/**/*.{es6,js,jsx}';

gulp.task('compile:scripts', function() {
  return gulp.src(scriptsPattern)
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      stage: 0
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(distDir))
  ;
});

gulp.task('compile:scripts:watch', function (done) {
  gulp.src(scriptsPattern)
    .pipe($.watch(scriptsPattern, {verbose: true}))
    .pipe($.sourcemaps.init())
    .pipe($.babel({stage: 0}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(distDir))
  ;
  done();
});

gulp.task('livereload', ['compile:scripts:watch'], function() {
  electron.start('');
  
  gulp.watch([distDir + '/**/*.js'], electron.restart);
  gulp.watch(['app/**/*.html'], electron.reload);
});

gulp.task('build', ['compile:scripts']);
