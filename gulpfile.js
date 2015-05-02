var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jscs = require('gulp-jscs'),
    csscomb = require('gulp-csscomb'),
    react = require('gulp-react'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    imagemin = require('gulp-imagemin'),
    source = require('vinyl-source-stream'),
    gutil = require('gulp-util'),
    reactify = require('reactify'),
    watchify = require('watchify'),
    notify = require("gulp-notify");

var path = {
    pub: {
        js: 'public/js/',
        css: 'public/css/*.css',
        views: 'public/views/*',
        images: 'public/images/*'
    },
    dist: {
        js: 'dist/js/',
        css: 'dist/css/',
        views: 'dist/views/',
        images: 'dist/images/'
    }
};

var appFiles = [
    path.pub.js + 'app/*.js'
];

var libs = [
    path.pub.js + 'libs/ace.js'
];

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {entries: [path.pub.js + file]};
  var bundler = watch ? watchify(props) : browserify(props);
  bundler.transform(reactify);
  function rebundle() {
    var stream = bundler.bundle({debug: true});
    return stream.on('error', handleErrors)
    .pipe(source(file))
    .pipe(gulp.dest(path.dist.js));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}

gulp.task('hint', function() {
    gulp.src(path.pub.js + 'app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(gulp.dest(path.dist.js));
});

gulp.task('jscs', function () {
    gulp.src(path.pub.js + 'app/*')
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
});

gulp.task('views', function() {
    gulp.src(path.pub.views)
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        //.pipe(jscs())
        .pipe(gulp.dest(path.dist.views));
});


gulp.task('images', function(){
    gulp.src(path.pub.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
        }))
        .pipe(gulp.dest(path.dist.images));
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

gulp.task('watch', function(){
    gulp.watch('public/*.html', function(){
        gulp.start('static-copy');
    });

    gulp.watch(path.pub.views, function(){
        gulp.start('views');
    });

    gulp.watch(path.dist.views, function(){
        gulp.start('minify');
    });

    gulp.watch(path.pub.js + 'app/*.js', function(){
        gulp.start('jscs', 'hint', 'minify');
    });

    gulp.watch(path.pub.css, function(){
        gulp.start('styles');
    });
});
//
//gulp.task('default', function(){
//    gulp.start('views', 'images', 'jscs', 'hint', 'minify', 'styles', 'static-copy');
//}); 

gulp.task('build', function() {
  return buildScript('app.js', false);
});
 
gulp.task('default', ['views', 'images', 'styles', 'static-copy', 'build'], function() {
  return buildScript('app.js', true);
});
