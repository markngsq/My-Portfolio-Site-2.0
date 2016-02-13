var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
//var CSS_FILES = 'src/**/*.css';


// source and distribution folder
var
    source = 'src/',
    dest = 'dist/';

// Bootstrap scss source

var config = {
    bootstrapDir: 'node_modules/bootstrap-sass',
    publicDir: 'dist',
};

var bootstrapSass = {
    in: 'node_modules/bootstrap-sass/'
};
// css source file: .scss files
var css = {
    in: source + 'css/main.scss',
    out: dest + 'css/',
    watch: source + 'css/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
            }
        };

gulp.task('default', function(){
console.log ('Gulp is so cool. Yay!');

})




///Keeping an eye out for anyone saving files
gulp.task('build', ['watch','browserSync','sass'])

gulp.task('watch', function(){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('dist/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
   // Other watchers
 })

//Live webpage reloads yarr
gulp.task('browserSync', function(){
    browserSync.init({
      server:{
        baseDir: 'dist'
      },
    })
})

//Generates the Final CSS and flattens it to shit
gulp.task('sass', ['fonts'], function(){
  return gulp.src('src/scss/*.scss')
  .pipe(sass({
      includePaths: [config.bootstrapDir + '/assets/stylesheets'],
  })) // Converts Sass to CSS with gulp-sass
    .pipe(concat ('concatedfile.css'))
      .pipe(rename({suffix: '.min'}))
      .pipe(cssnano())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({
      stream: true
    }))
});

//bootstrap fonts
gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});
