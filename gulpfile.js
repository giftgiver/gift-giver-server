const gulp = require('gulp');
const path = require('path');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const prettier = require('gulp-prettier');
const { spawn } = require('child_process');

const archiveName = 'build.tar';

const paths = {
  src: ['!src/config.js', 'src/**/*.js'],
  tests: ['test/**/*Spec.js'],
  dist: ['package.json', 'pm2.json', 'src/**', 'node_modules/**'],
  clean: ['build', 'mochawesome-reports', 'html', 'dist']
};

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

gulp.task('format', () => {
  gulp.src('./src/**/*.js').pipe(prettier({ singleQuote: true }));
});

gulp.task('clean', () => {
  return spawn('rm', ['-rf', path.join(__dirname, 'build')]);
});

gulp.task('lint', () => {
  return gulp
    .src(['./src/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['clean', 'format', 'lint'], () => {
  return gulp
    .src(paths.tests)
    .pipe(mocha({ timeout: 3000, reporter: 'nyan' }))
    .on('error', onError);
});

gulp.task('pack', ['clean'], () => {
  return gulp
    .src(paths.dist, { base: './' })
    .pipe(tar(archiveName))
    .pipe(gzip())
    .pipe(gulp.dest('./'));
});

const onError = err => {
  console.log('EXIT gulp: ' + err.toString());
  process.exit(1);
};
