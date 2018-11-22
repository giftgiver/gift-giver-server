const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const prettier = require('gulp-prettier');
const del = require('del');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const exit = require('gulp-exit');

const archiveName = 'build.tar';
const paths = {
  src: ['src/**/*.js'],
  tests: ['test/**/*Spec.js'],
  dist: ['package.json', 'pm2.json', 'src/**', 'node_modules/**'],
  docs: ['API.md', 'API_INTERNAL.md'],
  clean: ['build', 'output', 'html', 'dist']
};

paths.srcAndTests = paths.src.concat(paths.tests);

gulp.task('pre-test', () => {
  return (
    gulp
      .src(paths.src)
      // Use sourcemaps to get better line numbers
      .pipe(sourcemaps.init())
      .on('error', onError)
  );
});

const reporterOptions = {
  xunit: './build/xunit.xml',
  mochawesome: '-'
};

gulp.task('only-test', () => {
  gulp
    .src(paths.tests)
    .pipe(mocha())
    .on('error', onError)
    .pipe(exit());
});

gulp.task('format', () => {
  gulp.src('./src/**/*.js').pipe(prettier({ singleQuote: true }));
});

gulp.task('test', ['clean', 'lint', 'format', 'pre-test'], () => {
  return gulp
    .src(paths.tests)
    .pipe(mocha({ reporter: 'mochawesome', reporterOptions }))
    .on('error', onError)
    .pipe(exit());
});

gulp.task('lint-fix', () => {
  return gulp
    .src(paths.srcAndTests, { base: './' })
    .pipe(eslint({ fix: true }))
    .on('error', onError)
    .pipe(gulpIf(isFixedByEslint, gulp.dest('./')))
    .on('error', onError);
});

function isFixedByEslint(file) {
  // Has ESLint fixed the file contents?
  return file.eslint !== null && file.eslint.fixed;
}

gulp.task('lint', ['clean', 'format'], () => {
  return gulp
    .src(paths.srcAndTests)
    .pipe(eslint())
    .on('error', onError)
    .pipe(eslint.failAfterError())
    .on('error', onError);
});

gulp.task('pack', ['clean'], () => {
  gulp
    .src(paths.dist, { base: './' })
    .pipe(tar(archiveName))
    .pipe(gzip())
    .pipe(gulp.dest('./'));
});

gulp.task('clean', () => {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(paths.clean);
});

function onError(err) {
  console.log('EXIT gulp: ' + err.toString());
  process.exit(1);
}

gulp.task('dev', done => {
  const stream = nodemon({
    script: `./start`,
    ext: 'js',
    env: { NODE_ENV: 'development' },
    tasks: ['format', 'lint'],
    done: done
  });

  stream
    .on('restart', function() {
      console.log('restarted!');
    })
    .on('crash', function() {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10); // restart the server in 10 seconds
    });
});
