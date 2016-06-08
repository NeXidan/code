var gulp = require('gulp'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    babelify = require('babelify'),
    notify = require('gulp-notify'),
    config = require('../config'),
    entryPoint = './' + config.directories.app + '/js/app.js';

gulp.task('browserify', function () {
    var bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: false,
        extensions: ['.js', '.jsx'],
        entries: entryPoint,
        paths: ['./' + config.directories.app]
    })
    .transform(babelify.configure({
        sourceMapRelative: './' + config.directories.app,
        presets: ['react']
    }));

    function bundle () {
        var bundleTransform = transform(function (filename) {
            return bundler.bundle();
        });

        return gulp.src(entryPoint)
            .on('error', notify.onError())
            .pipe(bundleTransform)
            .pipe(rename({basename: config.files.js}))
            .pipe(gulp.dest(config.directories.public))
    };

    return bundle();
});
