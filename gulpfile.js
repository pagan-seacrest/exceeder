const {src, dest, parallel, series} = require("gulp");
const del = require("del");
const {styles} = require("./gulp_tasks/styles.js");

async function dist () {
    del.sync("dist");
}

exports.default = parallel( series(dist, styles))
// exports.build = series(del, styles, image, fonts, scripts);