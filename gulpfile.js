const gulp 			= require('gulp'),
	  bs   			= require('browser-sync').create(),
	  plumber 		= require('gulp-plumber'),
	  htmlmin       = require('gulp-htmlmin'),
	  babel 		= require('gulp-babel'),
	  uglify 		= require('gulp-uglify'),
	  sass 			= require('gulp-sass'),
	  cssmin 		= require('gulp-cssmin'),
	  autoprefixer  = require('gulp-autoprefixer'),
	  maps          = require('gulp-sourcemaps');


gulp.task('bs', () => {
	bs.init({
		server: {
			baseDir: './dist'
		}
	})
})

gulp.task('html', () => {
	gulp.src('./src/index.html')
		.pipe(plumber())
		.pipe(maps.init())
		.pipe(htmlmin())
		.pipe(maps.write())
		.pipe(gulp.dest('./dist/'))
})

gulp.task('css', () => {
	gulp.src('./src/sass/main.sass')
		.pipe(plumber())
		.pipe(maps.init())
		.pipe(sass())
		.pipe(autoprefixer({
            browsers: ['last 2 versions', "IE 10"],
            cascade: false
        }))
		.pipe(cssmin())
		.pipe(maps.write())
		.pipe(gulp.dest('./dist/css'))
})

gulp.task('js', () => {
	gulp.src('./src/js/main.js')
		.pipe(plumber())
		.pipe(maps.init())
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(maps.write())
		.pipe(gulp.dest('./dist/js'))
})

gulp.task('default', ['html', 'css', 'js', 'bs'], () => {
	gulp.watch('./src/index.html', ['html']);
	gulp.watch('./src/sass/main.sass', ['css']);
	gulp.watch('./src/js/main.js', ['js']);
	gulp.watch('./src/**/*').on('change', bs.reload);
})