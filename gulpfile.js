var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify-es').default;
var pump = require('pump');

gulp.task('sass', function () {
    return gulp.src('public/stylesheets/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets/'));
});
gulp.task('compress', function (cb) {
    pump([
            gulp.src('public/scripts/uncompressed/*.js'),
            uglify(),
            gulp.dest('public/scripts/')
        ],
        cb
    );
});
gulp.task('watch', function () {
    gulp.watch('public/stylesheets/sass/*.scss', ['sass']);
    gulp.watch('public/scripts/uncompressed/*.js', ['compress']);
});
