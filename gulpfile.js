const gulp 					= require('gulp'),
	  sass 					= require('gulp-sass'),
	//   autoprefix 			= require('gulp-autoprefixer'),
	  plumber	 			= require('gulp-plumber'),
	  jade	 				= require('gulp-jade'),
	  cssnano 				= require('gulp-cssnano'),
	  browserSync 			= require('browser-sync'),
	  cache 				= require('gulp-cache'),
	  concat 				= require('gulp-concat'),
	  imageMin 				= require('gulp-imagemin'),
	  notify 				= require('gulp-notify'),
	  clean 				= require('gulp-clean'),
	  unglify 				= require('gulp-uglify');


// Call compilation of sass to css
gulp.task('sass', async function(){
	return gulp.src('app/scss/**/*.scss')
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(sass())
			.pipe(cssnano())
			// .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
			.pipe(gulp.dest('app/css'))
			.pipe(browserSync.reload({stream: true}))
});

// Compilation jade to html
gulp.task('jade', async function(){
	return gulp.src('app/jade/*.jade')
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(jade({
				pretty: true
			}))
			
			.pipe(gulp.dest('app'))
			.pipe(browserSync.reload({stream: true}));
});


// Css libs compilation to libs.min.css in app/css
gulp.task('css-libs', async function () {
	return gulp.src('app/libs/**/*.css')
			.pipe(cssnano())
			.pipe(concat('libs.min.css'))
			.pipe(gulp.dest('app/css'))
			.pipe(browserSync.reload({stream: true}));
});

// Css libs compilation to libs.min.js in app/js
gulp.task('js-libs', async function () {
	return gulp.src([
		'app/libs/jquery/*.js',
		'app/libs/**/*.js'
	])
			.pipe(concat('libs.min.js'))
			.pipe(unglify())
			.pipe(gulp.dest('app/js'))
			.pipe(browserSync.reload({stream: true}));
});


//Call web-server localhost for browsing your website
gulp.task('browser-sync', async function(){
	browserSync({
		files: ([
			'app/index.css',
			'app/index.js',
			'app/*.html',
		]),
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// Call task for watching all the files in your project
gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('app/jade/**/*.jade', gulp.series('jade'));
	gulp.watch('app/libs/**/*.css', gulp.series('css-libs'));
	gulp.watch('app/libs/**/*.js', gulp.series('js-libs'));
	gulp.watch('app/css/**/*.css');
	gulp.watch('app/js/*.js');
	gulp.watch('app/*.html');
});

gulp.task('clean', function() {
	return gulp.src('dist', {read: true})
			.pipe(clean())
});

// Sending all images to folder dist/img when task build is running
gulp.task('img', () => {
	return gulp.src('app/img/**/*')
			.pipe(cache(imageMin({ // With cashing
				// .pipe(imageMin({ // Compress without cashing
				interlaced: true,
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				// use: [pngquant()]
			})))
			.pipe(gulp.dest('dist/img'));
});

gulp.task('build', gulp.parallel('img', 'sass', 'jade', 'css-libs', 'js-libs'), async function() {

	gulp.src('app/css/**/*.css')
			.pipe(gulp.dest('dist/css'));

	gulp.src('app/fonts/**/*')
			.pipe(gulp.dest('dist/fonts'));

	gulp.src('app/js/**/*.js')
			.pipe(gulp.dest('dist/js'));

	gulp.src('app/*.html')
			.pipe(gulp.dest('dist'));

});

gulp.task('clear', function(callback) {
	return cache.clearAll();
});

gulp.task('default', gulp.series('browser-sync', 'sass',  'jade',  'css-libs', 'js-libs', 'watch'));