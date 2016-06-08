var gulp = require('gulp'),
    config = require('../config');

gulp.task('copy', function () {
    return gulp.src([
            config.directories.app + '/images/**/*'
        ], {base: config.directories.app + '/'})
        .pipe(gulp.dest(config.directories.public));
});
