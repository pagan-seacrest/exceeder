import bs from "browser-sync";

export default function sync() {
    bs.init({
        ui: false,
        notify: false,
        server: {
            baseDir: "dist"
        }
    });
};