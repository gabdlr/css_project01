const { src, dest, series, parallel, watch } = require('gulp');
const gulpSass = require('gulp-dart-sass');
const minImagenes = require('gulp-imagemin');
const webp = require('gulp-webp');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');


function compilarSass() {
	return src('./src/scss/app.scss')
	.pipe(sourcemaps.init())
	.pipe(gulpSass())
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(sourcemaps.write('.'))
	.pipe(dest('./build/css')) 
}

function watchArchivos() {
    watch("./src/scss/**/*.scss", compilarSass)
}

function minificarImagenes() {
	return src('./src/img/**/*')
	.pipe(minImagenes())
	.pipe(dest('./build/img'))
}

function versionWebp() {
	return src('./src/img/**/*')
	.pipe( webp() )
	.pipe( dest('./build/img'));
}

exports.compilarSass = compilarSass;
exports.watchArchivos = watchArchivos;
exports.minificarImagenes = minificarImagenes;
exports.versionWebp = versionWebp;

exports.default = series( compilarSass, minificarImagenes, versionWebp, watchArchivos );
