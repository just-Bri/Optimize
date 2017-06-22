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

// Scripts
gulp.task('smashJs', function (cb) {
  pump([
        gulp.src('src/js/*'),
        sourcemaps.init(),
        babel(),
        uglify(),
        sourcemaps.write("."),
        gulp.dest('app/js'),
    ],
    cb
  );
});

// Concat/Min Css
gulp.task('smashCss', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('main.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/css/'));
});

// HTML
gulp.task('smashhtml', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app/'));
});

// Image optimizer
gulp.task('smashimg', function () {
  gulp.src('src/img/**/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10
    }))
    .pipe(gulp.dest('app/img/'));
});

// Build
gulp.task('default', gulpsequence('smashhtml', 'smashJs', 'smashCss', 'smashimg'));