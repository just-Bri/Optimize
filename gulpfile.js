var gulp = require('gulp');
var rename = require('gulp-rename');
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var gulpsequence = require('gulp-sequence');
var htmlmin = require('gulp-htmlmin');

// Concat
gulp.task('concatjs', function() {
  return gulp.src('src/js/*.js')
    .pipe(order([
      'src/js/jquery.js',
      'src/js/foundation.js',
      'src/js.foundation.reveal.js',
      'src/js/foundation.equalizer.js',
      'src/js/fastclick.js'
    ], { base: './' }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/js/'));
});
gulp.task('concatcss', function() {
  return gulp.src('src/css/*.css')
    .pipe(concat('concat.css'))
    .pipe(gulp.dest('src/css/'));
});

// Minify
gulp.task('minifyhtml', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('app/'));
});

gulp.task('minifyjs', function (cb) {
  pump([
        gulp.src('src/js/main.js'),
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
gulp.task('default', gulpsequence('minifyhtml', 'concatjs', 'concatcss', 'minifyjs', 'minifycss', 'minifyimg'));