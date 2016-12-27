/**
 * Created by Administrator on 2016/12/20.
 */
const gulp = require('gulp');
const _postcss = require('gulp-postcss');//gulp使用postcss
const postcss = require('postcss');//postcss
const _import = require('postcss-import');//引入css
const babel = require('gulp-babel');//编译es6
const mqpacker = require('css-mqpacker');//合并media
const cssnano = require('cssnano');//压缩css
const px2rem = require('postcss-px2rem');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
// gulp.task('clean',() => {
//     return del(['dist'])
// });
gulp.task('postcss',() => {
    let processors=[
        _import,
        mqpacker,
        px2rem({ remUnit: 75 }),
        cssnano
    ];
    return gulp.src('./src/css/index.css')
        .pipe(_postcss(processors))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist'))
});
gulp.task('js',() => {
   return gulp.src('./src/js/*.js')
       .pipe(babel({
           presets: ['es2015'] //转换为es5
       }))
       .pipe(concat('main.js'))    //合并所有js到main.js
       .pipe(gulp.dest('dist'))    //输出main.js到文件夹
       .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
       .pipe(uglify())    //压缩
       .pipe(gulp.dest('dist'));  //输出
});
gulp.task('default',['postcss','js']);
gulp.task('watch',() => {
    gulp.watch('./src/**/*.css',['postcss']);
    gulp.watch('./src/**/*.js',['js']);
})