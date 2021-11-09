const path = require('path');
const fs = require('fs');

const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpTypescript = require('gulp-typescript');
const gulpFlatten = require('gulp-flatten');

const paths = {
  dist: './dist',
  sass: 'src/**/*.scss',
  assets: 'src/assets/**/*',
  html: 'src/pages/**/*.html',
  ts: 'src/ts/*.ts'
};

const clean = () => {
  const host = path.resolve(__dirname, paths.dist);
  if (fs.existsSync(host)) {
    fs.rmdirSync(host, { recursive: true });
  }
  return Promise.resolve();
};

const sass = () => gulp.src(paths.sass)
  .pipe(gulpSass().on('error', gulpSass.logError))
  .pipe(gulpFlatten())
  .pipe(gulp.dest(paths.dist));

const assets = () => gulp.src(paths.assets)
  .pipe(gulp.dest(paths.dist));

const html = () => gulp.src(paths.html)
  .pipe(gulpFlatten())
  .pipe(gulp.dest(paths.dist));

const tsProject = gulpTypescript.createProject('tsconfig.json');
const ts = () => gulp.src(paths.ts)
  .pipe(tsProject())
  .pipe(gulp.dest(path.resolve(paths.dist, 'scripts')));

const build = gulp.series(
  clean,
  gulp.parallel(
    ts,
    assets,
    html,
    sass,
  )
);

exports.build = build;
exports.watch = () => {
  build();

  gulp.watch(paths.sass, sass);
  gulp.watch(paths.assets, assets);
  gulp.watch(paths.html, html);
  gulp.watch(paths.ts, ts);
};
