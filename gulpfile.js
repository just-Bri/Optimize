var gulp = require('gulp');
var rename = require('gulp-rename');
var order = require('gulp-order');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var gulpsequence = require('gulp-sequence');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');
// image stuff 
var image = require('gulp-image');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpgoptim = require('imagemin-jpegoptim');


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
    .pipe(gulp.dest('src/js/'));
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
gulp.task('minifyimg', function () {
  return  gulp.src('src/img/**/*')
      .pipe(imagemin({
            verbose: true,
            progressive: true,
            use: [pngquant(), jpgoptim()]
        }))
      .pipe(gulp.dest('app/img/'));
});

gulp.task('image', function () {
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

// Watch
gulp.task('watch', function () {
  gulp.watch('src/*.html', ['minifyhtml']);
  gulp.watch('src/css/*.css', ['concatcss', 'minifycss']);
  gulp.watch('src/js/**/*.js', ['concatjs', 'minifyjs']);
  gulp.watch('src/img/**/*', ['minifyimg']);
});

// Build
gulp.task('default', gulpsequence('minifyhtml', 'concatjs', 'concatcss', 'minifyjs', 'minifycss', 'minifyimg'));