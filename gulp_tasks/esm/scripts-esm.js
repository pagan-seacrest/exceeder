const {src, dest} = require ("gulp");
const minify = require('gulp-minify');

const scripts = () =>
    src("./src/js/*.js")
        .pipe(minify())
        .pipe(dest("./dist/js/"))


exports.scripts = scripts;