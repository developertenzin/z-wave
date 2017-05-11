var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    imagemin = require("gulp-imagemin"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create();

function errorLog(error) {
  console.log(error.toString())
  this.emit('end');
}

// my sass paths
var sassPaths = [
	'fonts',
	'dist/img'
]

gulp.task("sass", function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass({
			errLogToConsole: true,
			includePaths: sassPaths,
			outputStyle: "compressed"
		}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest("./css"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

// Image compress
gulp.task("images", function() {
  gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
});

// javascript watch
gulp.task("scripts", function() {
  gulp.src("js/app.js")
    .pipe(uglify())
    .on('error', errorLog)
    .pipe(gulp.dest("dist/js"));
});


// Copies the fonts from app to dist
gulp.task('fonts', function() {
  return gulp.src('fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})


// general watch
gulp.task("watch", ['sass','browserSync'], function() {
  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch('index.html', browserSync.reload);
  gulp.watch("js/app.js", browserSync.reload);
});

gulp.task("default", ["scripts", "fonts", "sass", "images", "watch"]);
