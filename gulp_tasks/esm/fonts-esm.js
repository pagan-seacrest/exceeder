import {src, dest} from "gulp";

export default function fonts() {
    return src('./src/fonts/*').pipe(dest("./dist/fonts"));
}