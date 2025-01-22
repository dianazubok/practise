import gulp from 'gulp';
import * as sass from 'sass'; // Оновлений імпорт
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const compiledSass = gulpSass(sass); // Передаємо sass у gulp-sass
const bs = browserSync.create();

function styles() {
    return gulp.src('scss/styles.scss')
        .pipe(compiledSass().on('error', compiledSass.logError)) // Використовуємо compiledSass
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(bs.stream());
}

function watch() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('scss/**/*.scss', styles);
    gulp.watch('./*.html').on('change', bs.reload);
}

export { styles, watch };