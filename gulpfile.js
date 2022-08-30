const { src, dest, parallel, series, watch } = require("gulp");

// Load plugins

const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const browsersync = require("browser-sync").create();
const reload = browsersync.reload;
const cleanCSS = require("gulp-clean-css");
const fileinclude = require("gulp-file-include");
const prettyHtml = require("gulp-pretty-html");
const gulpEslint = require("gulp-eslint");
// Clean assets

function clear() {
  return src("./assets/*", {
    read: false,
  }).pipe(clean());

  done();
}

// coding List CSS function
function codingListCss() {
  const source = "./src/codingList.scss";

  return src(source, { sourcemaps: true })
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )

    .pipe(dest("./codingList/", { sourcemaps: true }))
    .pipe(browsersync.stream());
}

// JS function
function js() {
  const source = ["./src/js/*.js", !"./src/js/lib/*.*"];

  return (
    src(source)
      .pipe(changed(source))
      .pipe(concat("bundle.js"))
      // minifies JS files
      // .pipe(uglify())
      // adds .min to the name of the compiled file
      // .pipe(rename({
      //     extname: '.min.js'
      // }))
      .pipe(dest("./dist/assets/js/"))
      .pipe(browsersync.stream())
  );
}

// library js function
function lib_js(done) {
  return src(["./src/js/lib/*.*"]).pipe(dest("./dist/assets/js/lib"));
  done();
}

// CSS function
function css() {
  const source = "./src/scss/style.scss";

  return (
    src(source, { sourcemaps: true })
      // .pipe(changed(source))
      .pipe(sass({ outputStyle: "expanded" }))
      // .pipe(cleanCSS())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
          cascade: false,
        })
      )
      // adds .min to the name of the compiled file
      // .pipe(rename({
      //     extname: '.min.css'
      // }))
      // minifies the CSS file
      // .pipe(cssnano())
      .pipe(concat("style.css"))
      .pipe(dest("./dist/assets/css/", { sourcemaps: true }))
      .pipe(browsersync.stream())
  );
}

// Optimize images
function images() {
  return src("./src/images/*")
    .pipe(imagemin())
    .pipe(dest("./dist/assets/images"));
}

// "./src/html/**/*.*"
// prefix: "@@",
//       basepath: "./src/html/component",


// html function
function html(done) {
  const path = [
    {source: './src/html/*/*', include: './src/include/', destination: './dist/html'}
  ];

  for(var i = 0; i < path.length; i++){
    src(path[i].source).pipe(fileinclude({prefix: "@@", basepath: path[i].include})).pipe(dest(path[i].destination));
  }
  done();
}

// Mainhtml function
// function Mainhtml(done) {
//   return src(["./src/html/main/main.html"])
//     .pipe(
//       fileinclude({
//         prefix: "@@",
//         basepath: "./src/html/component",
//       })
//     )
//     .pipe(concat("index.html"))
//     .pipe(prettyHtml())
//     .pipe(dest("./"));

//   done();
// }

// font function
function font(done) {
  return src(["./src/fonts/**/*.*"]).pipe(dest("./dist/assets/fonts"));
  done();
}

// Watch files

function watchFiles() {
  watch("./src/codingList.scss", codingListCss);
  watch("./src/scss/**", css);
  watch("./src/js/*", js);
  watch("./src/images/*", images);
  watch("./src/html/**/*.*", html);
  // watch("./src/html/*main/main.html", Mainhtml);
}

// BrowserSync

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
  });

  watch("./src/html/**").on("change", reload);
}

// Tasks to define the execution of the functions simultaneously or in series
exports.watch = parallel(watchFiles, font, lib_js, browserSync);
exports.default = series(clear, parallel(js, css, images, codingListCss, html));
