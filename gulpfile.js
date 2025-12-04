import gulp from 'gulp';
import * as dartSass from 'sass';
import uglify from 'gulp-uglify';
import cleanCss from 'gulp-clean-css';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass); // اصلاح شد
const file = 'jquery.nestable';

// compress js
gulp.task('js', function () {
    return gulp.src(file + '.js') // اضافه شد return
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/'));
});

// compile SASS to CSS
gulp.task('sass', function () {
    return gulp.src(file + '.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('.'));
});

// compress css
gulp.task('css', gulp.series('sass', function () { // تغییر سینتکس
    return gulp.src(file + '.css') // اضافه شد return
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/'));
}));

gulp.task('test', function () {
    return gulp.src([file + '.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// build assets
gulp.task('default', gulp.parallel('js', 'css')); // تغییر سینتکس