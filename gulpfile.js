var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");

var pug = require("gulp-pug");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var concat = require("gulp-concat");
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

var svgstore = require("gulp-svgstore");
var del = require("del");
var uglify = require("gulp-uglify")
var server = require("browser-sync").create();

gulp.task("styles-concat", function () {
  return gulp.src("src/**/*.scss")
    .pipe(concat("style/style.scss"))
    .pipe(gulp.dest('src/'))
});

gulp.task("css", function () {
  return gulp.src("src/style/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("src/assets/**/{icon-*.svg, *.svg}")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/assets/img"));
});

gulp.task("html", function () {
  return gulp.src("src/index.pug")
    .pipe(pug())
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return gulp.src("src/js/*.js")
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.extname = ".min.js";
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/blocks/**/*.scss", gulp.series("style-clean", "styles-concat", "css", "refresh"));
  gulp.watch("src/assets/**/*.{png, svg, jpg}", gulp.series("html", "refresh"));
  gulp.watch("src/**/*.pug", gulp.series("html", "refresh"));
  gulp.watch("src/js/*.js", gulp.series("build", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("copy", function () {
  return gulp.src([
    "src/assets/fonts/**/*.{woff,woff2}",
    "src/assets/**",
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("style-clean", function () {
  return del("src/style/style.scss")
});

gulp.task("build", gulp.series(
  "clean",
  'style-clean',
  "copy",
  "styles-concat",
  "css",
  "sprite",
  "html",
  "js"
));
gulp.task("start", gulp.series("build", "server"));
