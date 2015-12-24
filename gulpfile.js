var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

gulp.task('copy-js', function () {
    gulp.src([
        './app/assets/js/bower_components/bootstrap/dist/js/bootstrap.min.js',
        './app/assets/js/bower_components/jquery/dist/jquery.min.js',
        './app/assets/js/bower_components/angular/angular.min.js',
        './app/assets/js/bower_components/angular-route/angular-route.min.js',
        './app/assets/js/bower_components/angular-translate/angular-translate.min.js',
        './app/assets/js/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min.js'
    ]).pipe(gulp.dest('./app/assets/js/libs/'));
});

gulp.task('uglify-js', function () {
    return gulp.src([
        './app/assets/js/bower_components/requirejs/require.js'
    ]).pipe(uglify())
    .pipe(rename('require.min.js'))
    .pipe(gulp.dest('./app/assets/js/libs/'));
});

gulp.task('copy-css', function () {
    gulp.src([
        './app/assets/js/bower_components/bootstrap/dist/css/bootstrap.min.css',
        './app/assets/js/bower_components/bootstrap/dist/css/bootstrap.min.css.map'
    ]).pipe(gulp.dest('./app/assets/css/libs/'));
});

gulp.task('minify-style-css', function () {
    return gulp.src([
        './app/assets/css/style.css'
    ]).pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./app/assets/css/'));
});

gulp.task('copy-fonts', function () {
    gulp.src([
        './app/assets/js/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
        './app/assets/js/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
        './app/assets/js/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
        './app/assets/js/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
        './app/assets/js/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
    ]).pipe(gulp.dest('./app/assets/css/fonts/'));
});

gulp.task('default', ['uglify-js', 'copy-js', 'copy-css', 'minify-style-css', 'copy-fonts']);