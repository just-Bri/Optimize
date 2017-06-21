var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var gulpsequence = require('gulp-sequence');

// Concat
gulp.task('concatjs', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('src/js/'));
});
gulp.task('concatcss', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('concat.css'))
    .pipe(gulp.dest('src/css/'));
});

// Minify
gulp.task('minifyjs', function (cb) {
  pump([
        gulp.src('src/js/concat.js'),
        uglify(),
        gulp.dest('app/js/')
    ],
    cb
  );
});
gulp.task('minifycss', function() {
  return gulp.src('src/css/concat.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('minify.css'))
    .pipe(gulp.dest('app/css/'));
});

// Image optimizer
gulp.task('minifyimg', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin({
          optimizationLevel: 4
        }))
        .pipe(gulp.dest('app/img/'));
});

// Build
gulp.task('default', gulpsequence('concatjs', 'concatcss', 'minifyjs', 'minifycss', 'minifyimg'));