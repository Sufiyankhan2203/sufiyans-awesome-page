const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const mmq = require('gulp-merge-media-queries');
const rename = require('gulp-rename');
const lineec = require('gulp-line-ending-corrector');
const filter = require('gulp-filter');
const log = require('fancy-log');
const htmlbeautify = require('gulp-html-beautify');

// Dynamic import for chalk
async function loadChalk() {
  const { default: chalk } = await import('chalk');
  return chalk;
}

gulp.task('styles', async function(done) {
  const chalk = await loadChalk(); // Load chalk dynamically
  log(chalk.green('Compiling SCSS...'));

  gulp.src('css/sufiyans-awesome-page.scss') // SCSS source path
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(mmq({ log: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(lineec())
    .pipe(gulp.dest('css')); // destination path

  done();
});

gulp.task('default', gulp.series('styles'));

gulp.task('beautify-html', function() {
	const options = {
	  indentSize: 4,
	  unformatted: ['pre', 'code']
	}
	return gulp.src('*.html') // Source path
	  .pipe(htmlbeautify(options))
	  .pipe(gulp.dest('.')); // Output path
});
