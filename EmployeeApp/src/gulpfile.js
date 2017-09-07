var gulp = require('gulp');
var less = require('gulp-less');
var lesshint = require('gulp-lesshint');

gulp.task('less-watch', ['compile-less'], function() {
	gulp.watch(['./styles/*.less'], ['compile-less']);
});

gulp.task('compile-less', function() {  
gulp.src('./styles/main.less')
    .pipe(less())
    .pipe(gulp.dest('../dist/css'));
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

gulp.task('compile-images', function () {
    return gulp.src('./images/ajax-loader.gif')
        .pipe(gulp.dest('../dist/images'))
})

gulp.task('images-watch', ['compile-images'], function() {
	gulp.watch(['./images/ajax-loader.gif'], ['compile-images']);
});

gulp.task('lesshint', () => {
    return gulp.src('./styles/main.less')
        .pipe(lesshint({
            configPath: './.lesshintrc'
        }))
        .pipe(lesshint.reporter())
        .pipe(lesshint.failOnError());
});

gulp.task('compile-html', function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest('../dist'))
})

gulp.task('html-watch', ['compile-html'], function() {
	gulp.watch(['./index.html'], ['compile-html']);
});

gulp.task('detect', ['lesshint']);
gulp.task('watch', ['less-watch', 'font-awesome-watch', 'images-watch', 'html-watch']);
gulp.task('compile', ['compile-less', 'compile-font-styles', 'compile-fonts', 'compile-images', 'compile-html']);