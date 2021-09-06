const {src, dest, parallel, series} = require("gulp");
const cssConcat = require("gulp-concat-css");
const concat = require("gulp-concat");
const csso = require("gulp-csso");
const sass = require("gulp-sass")(require("sass"));
const hash = require("gulp-hash-filename");

function css () {
    return src("src/**/*\.css")
    .pipe(cssConcat("app.css"))
    .pipe(csso({sourceMap: true}))
    .pipe(hash())
    .pipe(dest("dist"))
}

function scss () {
    return src("src/**/*.s[ac]css")
    .pipe(sass().on("error", sass.logError))
    // .pipe(cssConcat("app.css"))
    .pipe(dest("src/out"))
}

exports.styles = series(scss, css);