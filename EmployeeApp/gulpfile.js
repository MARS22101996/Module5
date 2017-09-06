var gulp = require('gulp');
var less = require('gulp-less');
var lesshint = require('gulp-lesshint');

gulp.task('less-watch', ['less'], function() {
	gulp.watch(['./src/styles/*.less'], ['compile-less']);
});

gulp.task('compile-less', function() {  
gulp.src('./src/styles/main.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('font-awesome-watch', ['fonts', 'font-tyles'], function() {
	gulp.watch(['./node_modules/font-awesome/*'], ['fonts', 'font-styles']);
});

gulp.task('compile-fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('compile-font-styles', function () {
    return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('compile-images', function () {
    return gulp.src('./src/images/ajax-loader.gif')
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('images-watch', ['compile-images'], function() {
	gulp.watch(['./src/images/ajax-loader.gif'], ['compile-images']);
});

gulp.task('lesshint', () => {
    return gulp.src('./src/styles/main.less')
        .pipe(lesshint({
            configPath: './.lesshintrc'
        }))
        .pipe(lesshint.reporter())
        .pipe(lesshint.failOnError());
});

gulp.task('compile-html', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
})

gulp.task('html-watch', ['compile-html'], function() {
	gulp.watch(['./src/index.html'], ['compile-html']);
});

gulp.task('detect', ['lesshint']);
gulp.task('watch', ['less-watch', 'font-awesome-watch', 'images-watch', 'html-watchs']);
gulp.task('compile', ['compile-less', 'compile-font-styles', 'compile-fonts', 'compile-images', 'compile-html']);