var gulp = require('gulp'),
    config = require('../config');

gulp.task('watch', function() {
    gulp.watch(config.directories.app + '/css/**/*.css', ['css']);
    gulp.watch(config.directories.app + '/*.html', ['html']);
    gulp.watch(config.directories.app + '/js/**/*.js', ['browserify']);
    gulp.watch(config.directories.app + '/js/**/*.jsx', ['browserify']);
});
