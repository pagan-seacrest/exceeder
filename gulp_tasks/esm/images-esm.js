import {src, dest} from "gulp";
import imagemin from "gulp-imagemin";

export default function images() {
    return src("src/images/**/*")
    .pipe(imagemin())
    .pipe(dest("dist/assets"));
}