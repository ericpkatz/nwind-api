var gulp = require('gulp');
var inject = require('gulp-inject');
 
gulp.task('index', function () {
  var target = gulp.src('./views/index.html');
  var sources = gulp.src([
      './browser/javascript/app.js',
      './browser/javascript/**/*.js'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./views'));
});
