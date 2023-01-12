const gulp = require('gulp');
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');

function compilecss () {
  return src('src/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(prefix('last 10 versions'))
    .pipe(concat('style.min.css'))
    .pipe(dest('./build/css'))
    .pipe(browserSync.stream())
}

function jsmin () {
  return src([
    'src/js/libs/jquery-3.6.3.min.js',
    'src/js/*.js'
  ])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest('./build/js/'))
    .pipe(browserSync.stream())
}

function buildHtml () {
  return src('src/*.html')
    .pipe(dest('./build'))
    .pipe(browserSync.stream())
}

function watchTask() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
  watch('src/index.html', buildHtml)
  watch('src/scss/style.scss', compilecss);
  watch('src/js/**/*.js', jsmin)
}



exports.default = series(
  compilecss,
  jsmin,
  buildHtml,
  watchTask
);

// gulp.task('fileinclude', function() {
//   gulp.src(['index.html'])
//     .pipe(fileinclude({
//       prefix: '@@',
//       basepath: '@file'
//     }))
//     .pipe(gulp.dest('./'));
// });


