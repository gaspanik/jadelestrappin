var gulp = require('gulp'),
  jade = require('gulp-jade'),
  prettify = require('gulp-prettify'),
  less = require('gulp-less'),
  minifycss = require('gulp-csso'),
  rename = require('gulp-rename'),
  connect = require('gulp-connect');

gulp.task('init', function() {
  gulp.src('bower/jbootstrap/less/**')
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.src('bower/jbootstrap/fonts/**'))
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulp.src('bower/bootstrap-accessibility-plugin/plugins/css/**'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.src('bower/bootstrap-accessibility-plugin/plugins/js/bootstrap-accessibility.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.src('bower/jquery/dist/jquery.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('connect', function() {
  connect.server({
    root: ['dist'], // If you use newer gulp-connect, change > root: ['dist'],
    port: 1337,
    livereload: true
    // Open default browser. Support for gulp-connect 1.x
    // open: {} 
  })
});

gulp.task('jade', function() {
  gulp.src('src/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
    // If you need prettify HTML, uncomment below 2 lines.
    // .pipe(prettify())
    // .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('styles', function() {
  gulp.src('src/css/bootstrap.less')
    .pipe(less({
      sourceMap: true
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['src/css/**'], ['styles']);
  gulp.watch(['src/templates/**'], ['jade']);
});


gulp.task('default', ['connect', 'styles', 'jade', 'watch']);