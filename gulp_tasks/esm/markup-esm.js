import { src, dest } from "gulp";
import htmlmin from "gulp-htmlmin";
import bs from "browser-sync";

export default function html() {
    return src("src/*.html")
        .pipe(htmlmin({
            removeOptionalTags: true,
            removeEmptyAttributes: true,
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(dest("dist"))
        .pipe(bs.stream());
};