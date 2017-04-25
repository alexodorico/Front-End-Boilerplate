var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var bs = require('browser-sync').create();

gulp.task('browser-sync', ['sass'], function() {
	bs.init({
		proxy: 'localhost:3000'
	})
})

gulp.task('sass', function() {
	gulp.src('public/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('public/css/'))
		.pipe(bs.reload({stream: true}));
});

gulp.task('pug', function(done) {
	gulp.src('public/views/**/*.pug')
		.pipe(pug())
		.pipe(gulp.dest('public/'))
		.on('end', done)

});

gulp.task('minify-css', function() {
	gulp.src('public/css/app.css')
		.pipe(cleanCSS())
		.pipe(gulp.dest('public/css/'))
});

gulp.task('concat-js', function() {
	gulp.src(['public/js/jquery.js', 'public/js/foundation.js', 'public/js/velocity.js', 'public/js/scrollreveal.js', 'public/js/ScrollMagic.js', 'public/js/index.js'])
		.pipe(concat('build.js'))
		.pipe(gulp.dest('public/js/'))
})

gulp.task('default', ['browser-sync'], function() {
	gulp.watch('public/scss/**/*.scss', ['sass']);
	gulp.watch('public/views/**/*.pug', ['pug']);
	gulp.watch('public/*.html').on('change', bs.reload);
});
