/* eslint-env node */

var gulp = require('gulp'),
    del = require('del'),
    run = require('gulp-run'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    package = require('./package.json'),
    reload = browserSync.reload;

/**
 * Running Bower
 */
gulp.task('bower', function () {
    run('bower install').exec();
})

/**
 * Cleaning dist/ folder
 */
.task('clean', function (cb) {
    del(['dist/**'], cb);
})

/**
 * Running livereload server
 */
.task('server', function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });
})

/**
 * Less compilation
 */
.task('less', function () {
        return gulp.src(package.paths.less)
            .pipe(less())
            .pipe(concat(package.dest.style))
            .pipe(gulp.dest(package.dest.dist));
    })
    .task('less:min', function () {
        return gulp.src(package.paths.less)
            .pipe(less())
            .pipe(concat(package.dest.style))
            .pipe(cssmin())
            .pipe(gulp.dest(package.dest.dist));
    })

/**
 * JSLint/JSHint validation
 */
.task('lint', function () {
    return gulp.src(package.paths.js)
        .pipe(eslint({
            rules: {
                'no-undef': 0,
                'no-unused-vars': 0
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
})

/** JavaScript compilation */
.task('js', function () {
        return browserify({
                entries: [package.paths.app],
                extensions: ['.js', '.jsx']
            })
            .transform(reactify)
            .bundle()
            .pipe(source(package.dest.app))
            .pipe(gulp.dest(package.dest.dist));
    })
    .task('js:min', function () {
        return browserify({
                entries: [package.paths.app],
                extensions: ['.js', '.jsx']
            })
            .transform(reactify)
            .bundle()
            .pipe(source(package.dest.app))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(package.dest.dist));
    })

/**
 * Compiling resources and serving application
 */
.task('serve', ['bower', 'clean', 'lint', 'less', 'js', 'server'], function () {
        return gulp.watch([
            package.paths.js, package.paths.jsx, package.paths.html, package.paths.less
        ], [
            'lint', 'less', 'js', browserSync.reload
        ]);
    })
    .task('serve:minified', ['bower', 'clean', 'lint', 'less:min', 'js:min',
        'server'
    ], function () {
        return gulp.watch([
            package.paths.js, package.paths.jsx, package.paths.html, package.paths.less
        ], [
            'lint', 'less:min', 'js:min', browserSync.reload
        ]);
    });
