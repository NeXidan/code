var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('../config');

gulp.task('css', function () {
    return gulp.src(config.directories.app + '/css/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.directories.public));
});
