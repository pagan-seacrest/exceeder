import gulp from "gulp";
import markup from "./markup-esm";
import paths from "./paths-esm";
import { scss } from "./styles-esm";
import { scripts } from "./scripts-esm";

export default function watch() {
    gulp.watch("src/*.html", gulp.series(markup, paths));
    gulp.watch("src/**/*.scss", gulp.series(scss));
    gulp.watch("src/**/*.js", gulp.series(scripts));
    gulp.watch([
        "src/fonts/**/*",
        "src/images/**/*",
    ]);
}