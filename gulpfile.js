const gulp = require("gulp");
const browserSync = require("browser-sync");

gulp.task("browserSyncTask", function () {
  browserSync({
    server: {
      baseDir: "html", // 都度変えてください。
    },
  });

  gulp.watch("html/**", function () {
    browserSync.reload(); // 都度変えてください。
  });
});