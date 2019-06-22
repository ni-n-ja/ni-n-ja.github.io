'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var svgmin = require('gulp-svgmin');
var replace = require('gulp-replace');
var qr = require("qrcode-terminal");
var del = require('del');

var generateUuid = () => {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}


gulp.task('replace', (done) => {
    gulp.src(['js/service-worker.js'])
        // .pipe(replace(/\'[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\'/g, '\'' + generateUuid() + '\''))
        .pipe(replace(/\'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\'/g, '\'' + generateUuid() + '\''))
        .pipe(gulp.dest('./'));
    done();
});


gulp.task('reviveSVG', (done) => {
    del(['svg_minified/**/*.svg'], (err, deleted) => {
        console.log('deleted: ' + deleted.join(','));
    });
    gulp.src('svg/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./svg_minified'));
    done();
});

gulp.task('browser-sync', (done) => {
    const instance = browserSync({
        files: ['js/**/*.js', '**/*.html', 'css/**/*.css', '!js/service-worker.js'],
        server: {
            baseDir: "./"
        },
        port: 9001,
        https: true,
        open: false
    }, () => {
        let url = instance.getOption('urls').get('external');
        if (url != null)
            qr.generate(url);
    });
    done();
});

gulp.task('default', gulp.series('replace', 'reviveSVG', 'browser-sync'), (done) => {
    gulp.watch(['svg/**/*.svg'], gulp.series('reviveSVG', 'browser-sync'));
    gulp.watch(['js/service-worker.js'], gulp.task('replace'));
    done();
});


// gulp.series(gulp.parallel('task1', 'task2')