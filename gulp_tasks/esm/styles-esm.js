import { src, dest } from "gulp";
import concat from "gulp-concat";
import sass from "gulp-sass";
import less from "gulp-less";
import stylus from "gulp-stylus";

export function scss() {
    return src("src/**/*.scss")
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(concat("app.css"))
}

export const css = () => {}
    src("./src/styles/styles.scss")
        .pipe(sass())
        .pipe(minify())
        .pipe(autoprefixer({
            overrideBrowserslist:  ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(uncss({
            html: ['index.html'],
}))
        .pipe(dest("./dist/css/"))
        .pipe(browsersync.reload({stream: true}));

exports.styles = styles;