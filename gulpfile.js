// Gulp Reqs
var gulp = require('gulp');
var concat = require('gulp-concat');
var cleancss = require('gulp-clean-css');
var autopre = require('gulp-autoprefixer');
var minify = require('gulp-minify');

// Smash Css
gulp.task('smashCss', function() {
    gulp.src('css/**/*.css')
    .pipe(concat('style.min.css'))
    .pipe(autopre('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(cleancss('style.min.css'))
    .pipe(gulp.dest('css'));
  });

// Smash JS
gulp.task('smashJs', function() {
  gulp.src('js/**/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'));
});

// Default
gulp.task('default', ['smashCss', 'smashJs']);