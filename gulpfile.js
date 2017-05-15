var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;
	sourcemaps = require('gulp-sourcemaps'),
	util = require('gulp-util'),
	cleanCSS = require('gulp-clean-css'),
    del = require('del');

var DEST = 'public/',
	SRC = 'src/',
	prod = !!util.env.production;

gulp.task('clean', function() {
  del([DEST + 'js/**/*.*', DEST + 'css/*.*']);
});

gulp.task('styles', function() {
  return gulp.src(SRC + 'scss/styles.scss')
	.pipe(sass({ style: 'expanded' }))
	.pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(prod ? cleanCSS({compatibility: 'ie8'}) : util.noop())
	.pipe(gulp.dest(DEST + 'css'))
	.pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src([SRC + 'js/vendor/*.js', SRC + 'js/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(!prod ? sourcemaps.init() : util.noop())
		.pipe(prod ? uglify() : util.noop())
		.pipe(!prod ? sourcemaps.write('../js/') : util.noop())
		.pipe(gulp.dest(DEST + 'js'));
});

// Watch
gulp.task('watch', function() {

	browserSync.init({
		notify: false,
		server: "./public",
		port: 8080
	});
	gulp.watch(SRC + 'js/**/*.js', ['scripts']).on('change', reload);
	gulp.watch(SRC + 'scss/**/*.scss', ['styles']);
	gulp.watch(DEST + '*.*').on('change', reload);

});

gulp.task('default', ['clean', 'styles', 'scripts', 'watch']);