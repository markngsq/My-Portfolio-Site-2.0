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
gulp.task('build', ['watch','browserSync','images','html','javascript','sass','jquery'])

gulp.task('watch', function(){
  gulp.watch('**/*.php'),  browserSync.reload();
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/js/*.js', ['javascript']);
  gulp.watch('src/images/**/*', ['images']);
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
gulp.task('sass', ['fonts','images'], function(){
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

//html
gulp.task('html', function() {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
    stream: true
  }))
});

//images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({
    stream: true
  }))
});

//javascript
gulp.task('javascript', function() {
    return gulp.src('src/js/**/*.js')
    .pipe(concat ('site.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('jquery', function () {
    return gulp.src('node_modules/jquery/dist/*.min.js')
        .pipe(gulp.dest('src/js'));
    // creates ./public/vendor/jquery.custom.js
});


//bootstrap fonts
gulp.task('fonts', function() {
    return gulp.src(config.bootstrapDir + '/assets/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});
