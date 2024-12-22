// gulpfile.mjs

// This file defines the SCSS and JS file compilation workflow when using gulp
// and reloads browsers using browsersync on HTML, CSS, and JS Changes

import browserSync from 'browser-sync';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import terser from 'gulp-terser';

const sassCompiler = gulpSass(sass);
const browserSyncServer = browserSync.create();

// Define file paths
const paths = {
  scss: './scss/**/*.scss', // SCSS pull location
  css: './css', // CSS output location
  js: './js/**/*.js', // JS pull location
  compiledJS: './minifiedJS', // JS output location
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

const minifyJS = () => {
  return gulp
      .src(paths.js)
      .pipe(terser())
      .pipe(gulp.dest(paths.compiledJS));
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
  gulp.watch(paths.js, minifyJS); // Watch JS files
};

// Export tasks
export default gulp.series(compileSCSS, minifyJS, watchFiles);
