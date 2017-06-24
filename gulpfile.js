'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var gulpsequence = require('gulp-sequence');
var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var image = require('gulp-image');
var pngquant = require('imagemin-pngquant');
var jpgoptim = require('imagemin-jpegoptim');
var clean = require('gulp-clean');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");

// Smash HTML
gulp.task('smash-html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app/'));
});

// Smash Js
gulp.task('smash-js', function (cb) {
  pump([
        gulp.src(['src/js/jquery.js', 'src/js/foundation.js', 'src/js/foundation.equalizer.js', 'src/js/foundation.reveal.js','src/js/fastclick.js', 'src/js/scripts.js']),
        concat('main.js'),
        sourcemaps.init(),
        babel(),
        uglify(),
        sourcemaps.write("."),
        gulp.dest('app/js'),
    ],
    cb
  );
});

// Smash Css
gulp.task('smash-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('main.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/css/'));
});

// Resize images
gulp.task('resize-img', function () {
  gulp.src('src/img/photos/photo*.jpg')
    .pipe(imageResize({
      width : 600,
      height : 600,
      crop : false,
      upscale : false
    }))
    .pipe(rename(function (path) {
      path.basename += "-min";
    }))
    .pipe(gulp.dest('src/img/photos/'));
});
// Smash img
gulp.task('smash-img', function () {
  gulp.src('src/img/**/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      jpegtran: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('app/img/'));
});

// Build
gulp.task('default', gulpsequence('smash-html', 'smash-js', 'smash-css', 'smash-img'));