var gulp = require('gulp'),
  jade = require('gulp-jade'),
  prettify = require('gulp-prettify'),
  less = require('gulp-less'),
  minifycss = require('gulp-csso'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync');

gulp.task('init', function() {
  gulp.src('bower/jbootstrap/less/**')
    .pipe(gulp.dest('src/css'))
  gulp.src('bower/jbootstrap/fonts/**')
    .pipe(gulp.dest('dist/fonts'))
  gulp.src('bower/bootstrap-accessibility-plugin/plugins/css/**')
    .pipe(gulp.dest('dist/css'))
  gulp.src('bower/bootstrap-accessibility-plugin/plugins/js/bootstrap-accessibility.min.js')
    .pipe(gulp.dest('dist/js'))
  gulp.src('bower/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('bs', function() {
  browserSync.init(null, {
    server: {
      baseDir: "./dist"
    },
            notify: false
  });
});

gulp.task('jade', function() {
  gulp.src('src/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
  // If you need prettify HTML, uncomment below 2 lines.
  // .pipe(prettify())
  // .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
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
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(['src/css/**'], ['styles']);
  gulp.watch(['src/templates/**'], ['jade']);
});


gulp.task('default', ['bs', 'styles', 'jade', 'watch']);