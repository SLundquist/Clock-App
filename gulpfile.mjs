// gulpfile.mjs

// This file defines the SCSS and JS file compilation workflow when using gulp
// and reloads browsers using browsersync on HTML, CSS, and JS Changes

import browserSync from 'browser-sync';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser';
import gulpTypescript from 'gulp-typescript';
import * as sass from 'sass';

const sassCompiler = gulpSass(sass);
const browserSyncServer = browserSync.create();

// Define file paths
const paths = {
  scss: './scss/**/*.scss',
  css: './css',
  js: './js/main.js',
  jsOut: './js',
  compiledJS: './minifiedJS',
  ts: './ts/**/*.ts',
};

// Compile SCSS to CSS
const compileSCSS = () => {
  return gulp
      .src(paths.scss)
      .pipe(sassCompiler().on('error', sassCompiler.logError)) // Compile SCSS and handle errors
      .pipe(autoprefixer()) // Add vendor prefixes
      .pipe(cleanCSS()) // Minify CSS
      .pipe(gulp.dest(paths.css)) // Output CSS
      .pipe(browserSyncServer.stream()); // Stream changes to browser
};

const tsProject = gulpTypescript.createProject('tsconfig.json');

const compileTS = () => {
  return tsProject
      .src()
      .pipe(tsProject())
      .pipe(gulp.dest(paths.jsOut)); // Output compiled JS to the specified directory
};

const minifyJS = () => {
  return gulp
      .src(`${paths.jsOut}/**/*.js`) // Use the compiled JS files as the source
      .pipe(terser()) // Minify the JS
      .pipe(gulp.dest(paths.compiledJS)); // Output minified JS to the specified directory
};

// Watch files for changes
const watchFiles = () => {
  browserSyncServer.init({
    server: {
      baseDir: './', // Base directory for BrowserSync
    },
  });
  gulp.watch(paths.scss, compileSCSS); // Watch SCSS files
  gulp.watch('./*.html').on('change', browserSyncServer.reload); // Reload on HTML changes
  gulp.watch(paths.ts, gulp.series(compileTS, minifyJS)); // Watch TS files, compile and minify
  gulp.watch(`${paths.compiledJS}/**/*.js`).on('change', browserSyncServer.reload); // Reload on JS changes
};

// Export tasks
export default gulp.series(compileSCSS, minifyJS, watchFiles);
