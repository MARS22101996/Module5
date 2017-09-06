var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var rename = require('gulp-rename');
var lesshint = require('gulp-lesshint');

var src = './src';
var build = './src/.compiled'
var dist = './dist'
var srcStyles = '/styles';
var buidStyles = '/css';
var fonts = '/fonts';
var images = '/images';

// gulp.task('check', ['lint']);
gulp.task('watch', ['less-watcher', 'font-awesome-watcher', 'html-watcher', 'images-watcher', 'lint-watcher']);
gulp.task('build', ['less', 'font-awesome-styles', 'fonts', 'html', 'images']);

// Less

gulp.task('less-watcher', ['less'], function() {
	gulp.watch([src + srcStyles + '/*.less'], ['less']);
});

gulp.task('less', function() {  
gulp.src(src + srcStyles+'/main.less')
    .pipe(less())
    .pipe(gulp.dest(build + buidStyles));
});

// Font-awesome

gulp.task('font-awesome-watcher', ['fonts', 'font-awesome-styles'], function() {
	gulp.watch(['./node_modules/font-awesome/*'], ['fonts', 'font-awesome-styles']);
});

gulp.task('fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest(build + fonts))
})

gulp.task('font-awesome-styles', function () {
    return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(build + buidStyles))
})

// Html

gulp.task('html', function () {
    return gulp.src(src + '/*.html')
        .pipe(gulp.dest(build))
})

gulp.task('html-watcher', ['html'], function() {
	gulp.watch([src + '/*.html'], ['html']);
});

// Images

gulp.task('images', function () {
    return gulp.src(src + images + '/*')
        .pipe(gulp.dest(build + images))
})

gulp.task('images-watcher', ['images'], function() {
	gulp.watch([src + images + '/*'], ['images']);
});

// // Linter
// gulp.task('lint', () => {
//     return gulp.src(src + srcStyles + '/*.less')
//         .pipe(lesshint({
//             configPath: './.lesshintrc'
//         }))
//         .pipe(lesshint.reporter())
//         .pipe(lesshint.failOnError());
// });

// gulp.task('lint-watcher', ['lint'], function() {
// 	gulp.watch([src + srcStyles + '/*.less'], ['lint']);
// });