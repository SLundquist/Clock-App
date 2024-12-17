// gulpfile.mjs
import browserSync from 'browser-sync';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';

const sassCompiler = gulpSass(sass);
const browserSyncServer = browserSync.create();

// Define file paths
const paths = {
  scss: './scss/**/*.scss', // SCSS pull location
  css: './css', // CSS output location
};

// Compile SCSS to CSS
const compileSCSS = () => {
  silenceDeprecations: ['legacy-js-api'];
  return gulp
    .src(paths.scss)
    .pipe(sassCompiler().on('error', sassCompiler.logError)) // Compile SCSS and handle errors
    .pipe(autoprefixer()) // Add vendor prefixes
    .pipe(cleanCSS()) // Minify CSS
    .pipe(gulp.dest(paths.css)) // Output CSS
    .pipe(browserSyncServer.stream()); // Stream changes to browser
};

// Watch SCSS files for changes
const watchFiles = () => {
  browserSyncServer.init({
    server: {
      baseDir: './', // Base directory for BrowserSync
    },
  });
  gulp.watch(paths.scss, compileSCSS); // Watch SCSS files
  gulp.watch('./*.html').on('change', browserSyncServer.reload); // Reload on HTML changes
};

// Export tasks
export default gulp.series(compileSCSS, watchFiles);
