  'use strict';

var gulp       = require('gulp'),
    useref     = require('gulp-useref'),
    uglify     = require('gulp-uglify'),
    clean      = require('gulp-clean'),
    gulpif     = require('gulp-if'),
    filter     = require('gulp-filter'),
    imagemin   = require('gulp-imagemin'),
    concatCSS  = require('gulp-concat-css'),
    minifyCSS  = require('gulp-minify-css'),
    prettify = require('gulp-html-prettify'),
    less = require('gulp-less'),
    cleanCSS   = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    watch       = require('gulp-watch'),
    reload      = browserSync.reload,
    wiredep    = require('wiredep').stream;

    // Подключаем ссылки на bower components
    gulp.task('wiredep', function(){
    	gulp.src('app/*.html')
    	  .pipe(wiredep())
    	  .pipe(gulp.dest('app/'))
    });


   // ==========================================================
   // ===================== Сборка в DIST ======================
   // ==========================================================

    //Очистка папки
    gulp.task('clean', function(){
        return gulp.src('dist')
          .pipe(clean());
    });
   //LESS
   gulp.task('less', function () {
  return gulp.src('app/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'));
});



    // Переносим html, css, js в папку dist
   gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(gulpif('*.html', prettify({indent_char: ' ', indent_size: 2})))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS({compatibility:'ie8'})))
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

   // Перенос шрифтов
   gulp.task('fonts', function(){
    gulp.src('app/fonts/')
      .pipe(filter(['*.eot', '*.svg', '8.ttf', '*.woff', '*.woff2']))
      .pipe(gulp.dest('dist/fonts/'))
   });

   // Картинки
   gulp.task('images', function(){
     return gulp.src('app/img/**/*')
       .pipe(imagemin({
          progressive:true,
          interlaced:true
       }))
       .pipe(gulp.dest('dist/img'));
   });

   // Остальные файлы
   gulp.task('extras', function(){
    return gulp.src([
        'app/*.*',
        '!app/*.html'
    ]).pipe(gulp.dest('dist'));
   });

   // Cборка и вывод размера содержимого папки dist
   gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function(){
    return gulp.src('dist/**/*')
   });

   // Собираем папку DIST
   gulp.task('build', ['clean'], function(){
      gulp.start('dist');
   });

   // ==========================================================
   // ===================== Работа в APP =======================
   // ==========================================================


   // LESS
 /* gulp.task('css', function () {
    gulp.src('app/css/less/*.less')
    .pipe(less())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('app/css'));
}); */

// Запускаем локальный сервер
   gulp.task('server', function(){
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: 'app'
        }
    });
   });

   // Cлежка и запуск задач
    gulp.task('watch', function () {
        gulp.watch('bower.json', ['wiredep']);
        gulp.watch(['app/css/*.less', 'app/css/*.css', 'app/js/*.js', 'app/*.html']).on('change', reload);
});

    // Задача по умолчанию
    gulp.task('default', ['server', 'watch']);
