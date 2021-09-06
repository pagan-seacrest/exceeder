const {src, dest} = require("gulp");

function paths() {
    return src("dist/*.html")
        .pipe(replace(
            /(<link rel="stylesheet" href=")assets\/(app.css">)/, "$1$2"
        ))
        .pipe(replace(
            /(<script src=")assets\/(main.js">)/, "$1$2"
        ))
        .pipe(dest("dist"));
};