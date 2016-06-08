var gulp = require('gulp'),
    config = require('../config');

gulp.task('html', function () {
    return gulp.src(config.directories.app + '/*.html')
        .pipe(gulp.dest(config.directories.public));
});
