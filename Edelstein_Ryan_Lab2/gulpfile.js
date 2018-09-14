const gulp = require('gulp')
const concatenate = require('gulp-concat')
const gulpSASS = require('gulp-sass')
const cleanCSS = require("gulp-clean-css")
const rename = require("gulp-rename")


const sassFiles = 'src/styles/*.scss'

gulp.task('sass', () => {
    gulp.src('src/styles/*.scss')
        .pipe(gulpSASS())
        .pipe(concatenate('styles.css'))
        .pipe(gulp.dest('public/css/'))
        .pipe(cleanCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('public/css/'))
})

gulp.task('build', ['sass'])

gulp.task('watch', () => {
    gulp.watch(sassFiles, ['sass'])
})

gulp.task('default', ['watch'])
