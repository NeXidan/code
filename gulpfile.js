var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jscs = require('gulp-jscs'),
    csscomb = require('gulp-csscomb'),
    browserify = require('browserify'),
    transform = require('vinyl-transform');


var path = {
    pub: {
        js: 'public/js/',
        css: 'public/css/*.css'
    },
    dist: {
        js: 'dist/js/',
        css: 'dist/css/'
    }
};

var appFiles = [
    path.pub.js + 'app/models/*.js',
    path.pub.js + 'app/collections/*.js',
    path.pub.js + 'app/views/*.js',
    path.pub.js + 'app/*.js'
];

var libs = [
    path.pub.js + 'libs/underscore-min.js',
    path.pub.js + 'libs/jquery-2.1.1.min.js',
    path.pub.js + 'libs/socket-wrap.js',
    path.pub.js + 'libs/backbone-min.js',
    path.pub.js + 'libs/ace.js'
];

gulp.task('hint', function() {
  gulp.src(appFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
      //.pipe(gulp.dest(path.dist.js));
    gulp.src(path.pub.js + 'entrypage.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
    //.pipe(gulp.dest(path.dist.js));
});

gulp.task('jscs', function () {
    gulp.src(appFiles)
        .pipe(jscs());
    gulp.src(path.pub.js + 'entrypage.js')
        .pipe(jscs());
});



gulp.task('minify', function(){
    var browserified = transform(function(filename) {
        var b = browserify(filename);
        return b.bundle();
    });

    gulp.src(appFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserified)
        .pipe(gulp.dest(path.dist.js))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js));
    gulp.src(path.pub.js + 'entrypage.js')
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('static-copy', function(){
    gulp.src('public/*.html')
        .pipe(gulp.dest('dist/'));
    gulp.src(libs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(path.dist.js));
    gulp.src(path.pub.js + 'libs/ace-additional/*.js')
        .pipe(gulp.dest(path.dist.js + 'ace-additional/'));
});

gulp.task('styles', function() {
    gulp.src(path.pub.css)
        .pipe(csscomb())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest(path.dist.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('watch', function () {
    gulp.watch('public/*.html', function(){
        gulp.start('static-copy');
    });

    gulp.watch(path.pub.js + 'app/*.js', function(){
        gulp.start('jscs', 'hint', 'minify');
    });

    gulp.watch(path.pub.css, function () {
        gulp.start('styles');
    });
});

gulp.task('default', function () {
    gulp.start('jscs','hint','minify', 'styles', 'static-copy');
});