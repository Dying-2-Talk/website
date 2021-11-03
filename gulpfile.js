/* eslint-disable no-param-reassign */
const path = require('path');
const fs = require('fs');

const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const gulpTypescript = require('gulp-typescript');
const gulpFlatten = require('gulp-flatten');

const dirOut = './dist';
const clean = () => {
  const host = path.resolve(__dirname, dirOut);
  if (fs.existsSync(host)) {
    fs.rmdirSync(host, { recursive: true });
  }
  return Promise.resolve();
};

const srcSass = 'src/**/*.scss';
const sass = () => gulp.src(srcSass)
  .pipe(gulpSass().on('error', gulpSass.logError))
  .pipe(gulpFlatten())
  .pipe(gulp.dest(dirOut));

const srcAssets = 'src/assets/**/*';
const assets = () => gulp.src(srcAssets)
  .pipe(gulp.dest(dirOut));

const srcHtml = 'src/pages/**/*.html';
const html = () => gulp.src(srcHtml)
  .pipe(gulpFlatten())
  .pipe(gulp.dest(dirOut));

const srcTs = 'src/ts/*.ts';
const tsProject = gulpTypescript.createProject('tsconfig.json');
const ts = () => gulp.src(srcTs)
  .pipe(tsProject())
  .pipe(gulp.dest(path.resolve(dirOut, 'scripts')));

const build = gulp.series(
  clean,
  gulp.parallel(
    assets,
    html,
    sass,
    ts
  )
);

exports.build = build;
exports.watch = () => {
  build();
  gulp.watch(srcSass, sass);
  gulp.watch(srcAssets, assets);
  gulp.watch(srcHtml, html);
  gulp.watch(srcTs, ts);
};
