var gulp = require('gulp');
var less = require('gulp-less');
var lesshint = require('gulp-lesshint');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var babel = require('gulp-babel');

gulp.task('app-data-watcher', ['app-data'], function() {
	gulp.watch(['./app_data/*'], ['app-data']);
});

gulp.task('app-data', function () {
    return gulp.src('./app_data/*')
        .pipe(gulp.dest('../dist/app_data'));
});



gulp.task('less-watch', ['compile-less'], function() {
	gulp.watch(['./styles/*.less'], ['compile-less']);
});

gulp.task('compile-less', function() {  
gulp.src('./styles/main.less')
    .pipe(less())
    .pipe(gulp.dest('../dist/css'));
});

gulp.task('compile-images', function () {
    return gulp.src('./images/ajax-loader.gif')
        .pipe(gulp.dest('../dist/images'))
})

gulp.task('images-watch', ['compile-images'], function() {
	gulp.watch(['./images/ajax-loader.gif'], ['compile-images']);
});

gulp.task('compile-html', function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest('../dist'))
})

gulp.task('lesshint', () => {
    return gulp.src('./styles/main.less')
        .pipe(lesshint({
            configPath: './.lesshintrc'
        }))
        .pipe(lesshint.reporter())
        .pipe(lesshint.failOnError());
});


gulp.task('html-watch', ['compile-html'], function() {
	gulp.watch(['./index.html'], ['compile-html']);
});

gulp.task('font-awesome-watch', ['compile-fonts', 'compile-font-styles'], function() {
	gulp.watch(['./node_modules/font-awesome/*'], ['compile-fonts', 'compile-font-styles']);
});

gulp.task('compile-fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('../dist/fonts'));
})

gulp.task('compile-font-styles', function () {
    return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('../dist/css'))
})

// // Jquery

// gulp.task('jquery-watcher', ['jquery'], function() {
// 	gulp.watch(['./node_modules/jquery/*'], ['jquery']);
// });

// gulp.task('jquery', function () {
//     return gulp.src('./node_modules/jquery/dist/jquery.min.js')
//         .pipe(gulp.dest('../dist/js/libs'))
// })



gulp.task('js-lint', () => {
    return gulp.src('./js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('js-lint-watcher', ['js-lint'], function() {
	gulp.watch(['./js/**/*.js'], ['js-lint']);
});

// Js
gulp.task('js', () => {
    return gulp.src('./js/**/*.js')
        // .pipe(babel({
        //     presets: ['env', 'babili']
        // }))
        .pipe(gulp.dest('../dist/js'))
});

gulp.task('js-watcher', ['js'], function() {
	gulp.watch(['./js/**/*.js'], ['js']);
});

gulp.task('detect', ['lesshint', 'js-lint']);
gulp.task('watch', ['js-lint-watcher', 'js-watcher', 'app-data-watcher', 'less-watch', 'font-awesome-watch', 'images-watch', 'html-watch']);
gulp.task('compile', ['js', 'app-data', 'compile-less', 'compile-font-styles', 'compile-fonts', 'compile-images', 'compile-html']);