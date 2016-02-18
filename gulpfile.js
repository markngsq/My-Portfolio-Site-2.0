var gulp = require('gulp-help')(require('gulp'));

// build
var browserSync = require('browser-sync').create();

// css / js / img / lint
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var eslint = require('gulp-eslint');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// files
var packageJSON = require('./package.json');

/**
 * Variables
 */

// source and distribution folder
var LISTEN_PORT = 8000;

var SRC_DIRECTORY ='./src';
var DIST_DIRECTORY ='./dist';
var JS_DIST = DIST_DIRECTORY + '/js/';
var CSS_DIST = DIST_DIRECTORY + '/css/';
var IMG_DIST = DIST_DIRECTORY + '/images/';
var FONT_DIST = DIST_DIRECTORY + '/fonts/';

var JS_APP = packageJSON.name + '.js';
var CSS_APP = packageJSON.name + '.css';

// Files
var LINT_FILES = [
  'src/**/*.js'
];
var SCSS_FILES = [
  'src/scss/*.scss'
];
var JS_FILES = [
  'src/js/*.js'
];
var IMG_FILES = [
  'src/images/*'
];
var FONT_FILES = [
  'src/fonts/*'
];


/**
 * Default, running `gulp` will bring up the help
 */
gulp.task('default', false, ['help']);

/**
 * Lint
 *
 * run eslint without an additional plugin
*/
gulp.task('lint', 'Run ESLint', function(done) {
  return gulp.src(LINT_FILES).pipe(eslint({
    'rules': {
      'quotes': [1, 'single'],
      'semi': [1, 'always']
    }
  }))
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError());
});


/**
 * Scripts
 *
 * Look at vendor & app js files, concatenate them and send them to dist/js.
 * We then minimize the concatenated file.
*/

gulp.task('js', 'Build js files', function() {
  return gulp.src(JS_FILES)
    .pipe(concat(JS_APP))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(JS_DIST));
});

gulp.task('js:watch', false, ['lint', 'js'], function() {
  browserSync.reload();
});

/**
 * Stylesheets
 *
 * Look at vendor & app css files, concatenate them and send them to dist/css.
 * We then minimize the concatenated file.
*/

gulp.task('css', 'Build css files', function() {
  return gulp.src(SCSS_FILES)
    .pipe(concat(CSS_APP))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(CSS_DIST));
});

gulp.task('css:watch', false, ['css'], function() {
  browserSync.reload();
});

/**
 * Images
 *
 * Optimization of images and moving them to dist folder
*/
gulp.task('img', 'Optimize image files', function() {
  return gulp.src(IMG_FILES)
    .pipe(newer(IMG_DIST))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(IMG_DIST));
});

gulp.task('img:watch', false, ['img'], function() {
  browserSync.reload();
});

/**
 * Fonts
 *
 * Moving fonts to dist folder
*/
gulp.task('font', 'Move fonts to dist folder', function() {
  return gulp.src(FONT_FILES)
    .pipe(gulp.dest(FONT_DIST));
});

gulp.task('font:watch', false, ['font'], function() {
  browserSync.reload();
});

/**
 * Build
*/
gulp.task('build', 'Build all resources', ['js', 'css', 'img']);

gulp.task('build:dev', 'Build all resources', ['lint', 'js', 'css', 'img']);

/**
 * dev
 *
 * Development mode. This will run a server on localhost which will watch files for changes, rebuild relevant files and update the browser.
 * Asynchronous browser syncing of assets across multiple devices. Watches for changes to files and runs build tasks
*/
gulp.task('dev', 'Build resources, starts server and watch', ['build:dev'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(SCSS_FILES, ['css:watch']);
  gulp.watch(JS_FILES, ['js:watch']);
  gulp.watch(IMG_FILES, ['img:watch']);
  gulp.watch(FONT_FILES, ['font:watch']);
});


// bootstrap fonts
gulp.task('fonts', false, function() {
  return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
  .pipe(gulp.dest(config.publicDir + '/fonts'));
});
