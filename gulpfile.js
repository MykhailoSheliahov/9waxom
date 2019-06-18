const gulp = require('gulp');
 const sass = require('gulp-sass');
 const sourcemaps = require('gulp-sourcemaps');
  const watch = require('gulp-watch');
  const autoprefixer = require('gulp-autoprefixer');
  const notify = require('gulp-notify');
  const browserSync = require('browser-sync').create();


gulp.task('sass', async function() {
  return gulp.src('./sass/**/*.scss')
  .on('data',(file)=>{
console.log(file);
})
  .pipe(sourcemaps.init())
  .pipe(sass())
    .on('error', notify.onError(function(err){
      return{
        title: 'Styles',
        message: err.message
      };
    }
    ))
  .pipe(autoprefixer({
            browsers: ['last 10 versions']
            
        }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./css/'));
});

gulp.task('watch',async function(){
   gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});
gulp.task('dev', async function(){
   gulp.series(gulp.parallel('serve','watch'));
});

gulp.task('serve',function(){
	browserSync.init({
		 server: {
            baseDir: "./"
        }
	});
	browserSync.watch('./**/*.*').on('change', browserSync.reload);
});



