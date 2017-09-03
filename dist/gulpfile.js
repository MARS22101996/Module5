var gulp        = require('gulp');
var bs          = require('browser-sync').create();   

gulp.task('serve', [], () => {
        bs.init({
            server: {
               baseDir: "./",
            },
            port: 5000,
            reloadOnRestart: true,
            browser: "chrome"
        });
        gulp.watch('./**/*', ['', bs.reload]);
});

var less = require('gulp-less'); 
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
 
 
/* Task to compile less */
gulp.task('compile-less', function() {  
  gulp.src('./src/all.less')
    .pipe(less())
    .pipe(gulp.dest('./distro/css/'));
}); 