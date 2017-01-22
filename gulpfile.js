'use strict';

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker"); // consolidate all styles
var minify = require("gulp-csso"); // minification css
var server = require("browser-sync");
var svgSprite = require('gulp-svg-sprite');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var imagemin = require("gulp-imagemin");
var del = require("del");
var run = require("run-sequence");
var ghPages = require('gulp-gh-pages');

/*=======================================
=            SASS task                  =
=======================================*/

gulp.task("style", function() {
  gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ['last 4 version', 'ie 11']}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({stream: true}));
});

/*=======================================
=            IMGmin task                =
=======================================*/

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg,gif,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo({minifyStyles: true, removeDoctype: true})
  ]))
  .pipe(gulp.dest("build/img"));
});

/*=======================================
=            SVG-Sprite task            =
=======================================*/

gulp.task('svg', function() {
  return gulp.src('src/_assets/svg-sprite/*.svg')
  .pipe(svgSprite({
    mode: {
      symbol: {
        dest: '.',
        dimensions: '%s',
        sprite: 'build/img/svg-sprite.svg',
        example: false,
        render: {scss: {dest: 'src/sass/global/_svg-sprite.scss'}}
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    }
  }))
  .pipe(gulp.dest('./'));
});

/*=======================================
=            JavaScript task            =
=======================================*/

gulp.task('js', function() {
    return gulp.src(['src/js/plugins/*.js', 'src/js/vendor/*.js', 'src/js/modules/*.js', 'src/js/main.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(filesize())
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(filesize())
        .on('error', gutil.log)
});

/*=======================================
=            copy into build            =
=======================================*/

gulp.task("copy", function() {
 return gulp.src([
   "src/img/**",
   "src/js/jquery.fancybox.js"
   // "src/*.html"
 ], {
   base: "src/"
 })
 .pipe(gulp.dest("build"));
});

/*=======================================
=            copy HTML into build       =
=======================================*/

gulp.task("copyHTML", function() {
 return gulp.src([
   "src/*.html",
   "src/favicon.ico"
 ], {
   base: "src/"
 })
 .pipe(gulp.dest("build"));
});

gulp.task("serve", function() {
  server.init({
    server: "build"
  });

  gulp.watch("src/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("src/*.html", ["copyHTML"]).on("change", server.reload);
});

gulp.task("clean", function() {
 return del("build");
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "copyHTML",
    "style",
    "images",
    "svg",
    "js",
    fn);
});



/*=======================================
=       deploy to gh-pages              =
=======================================*/

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
