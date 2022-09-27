const gulp = require("gulp");
const browserSync = require("browser-sync");

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "static", // 都度変えてください。
    },
  });
});

gulp.task('browser-reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('watch',(done) => {
  gulp.watch("static/*.html", gulp.task('browser-reload'));
  gulp.watch("static/*.css", gulp.task('browser-reload'));
  gulp.watch("static/*.js", gulp.task('browser-reload'));
  done();
})

gulp.task('default', gulp.series( gulp.parallel('watch', 'browser-sync'), (done) => {
  done();
}));
