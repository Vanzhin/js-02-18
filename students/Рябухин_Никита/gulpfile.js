const { src, dest, watch, parallel } = require('gulp');

const sass          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');

function browsersync() {
    browserSync.init({
        server : {
            baseDir: 'project/'
        }
    });
}

function styles() {
    return src([
        'project/fonts/**/*.css',
        'project/css/**/*.css',
        'project/sass/**/*.sass'
    ])
            .pipe(sass({outputStyle: 'expanded'}))
            .pipe(concat('style.css'))
            .pipe(autoprefixer({
                overrideBrowserslist: ['last 15 version'],
                grid: true
            }))
            .pipe(dest('project/'))
            .pipe(browserSync.stream())
}

function watching() {
    watch(['project/sass/**/*.sass'], styles);
    watch(['project/**/*.js']).on('change', browserSync.reload);
    watch(['*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(browsersync, watching);