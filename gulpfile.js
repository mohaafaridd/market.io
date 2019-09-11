const browserify = require('browserify');
const buffer = require('gulp-buffer');
const gulp = require('gulp');
const log = require('gulplog');
const tap = require('gulp-tap');
const uglify = require('gulp-uglify');

gulp.task('default', function() {
  return (
    gulp
      .src('public/javascripts/**/*.js', { read: false }) // no need of reading file because browserify does.

      // transform file objects using gulp-tap plugin
      .pipe(
        tap(function(file) {
          log.info('bundling ' + file.path);

          // replace file contents with browserify's bundle stream
          file.contents = browserify(file.path, { debug: true })
            .transform('babelify', {
              presets: ['@babel/preset-env'],
            })
            .bundle();
        })
      )

      // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
      .pipe(buffer())

      .pipe(uglify())

      .pipe(gulp.dest('build'))
  );
});

exports.default = gulp;
