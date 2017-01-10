var gulp = require('gulp'),
//Automatic Browsers Prefixers.
autoprefixer = require('gulp-autoprefixer'),
//Templating Engine.
nunjucks = require('gulp-nunjucks-html'),
//CSS Management with SASS and Plumber for SAAS Error Management.
plumber = require('gulp-plumber'),
sass = require('gulp-sass'),
//Utilities.
concat = require('gulp-concat'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
prettify = require('gulp-prettify'),
//Settings.
settings = require('./settings.json');
//Image Optimizers
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant'),

//Nunjucks.
gulp.task('nunjucks', function() {
    return gulp.src(settings.path.application.pages + '*.njc')
        .pipe(nunjucks({searchPaths: [settings.path.application.root]}))
        //Rename to .html extension
        .pipe(rename({extname: ".html"}))
        //Prettify to re-indent and remove empty lines
        .pipe(prettify({indent_size: 2}))
        .pipe(gulp.dest(settings.path.distribution.root));
});

//Sass.
gulp.task('sass', function() {
    return gulp.src(settings.path.application.scss + '/**/*.scss')
        //Plumber to manage errors/warningss
        .pipe(plumber())
        //Sass settings
        .pipe(sass({ outputStyle: 'compressed',sourceComments: 'false'}))
        .pipe(sass().on('error', sass.logError))
        //Adding Autoprefixer
        .pipe(autoprefixer(settings.autoprefixeroptions))
        //Renaming to main.min.css
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(settings.path.distribution.css));
});

//Javascript.
gulp.task('javascript', function() {
    //Concatenate header JS
     gulp.src([settings.path.application.js + '/header/*.js'])
        //Concatenate all Javascript as one file named main.js
        .pipe(concat('header.js'))
        //Uglify the file
        .pipe(uglify())
        //Rename the file main.min.js
        .pipe(rename({ suffix:'.min'}))
        .pipe(gulp.dest(settings.path.distribution.js));
    //Concatenate header JS
    gulp.src([settings.path.application.js + '/footer/*.js'])
        //Concatenate all Javascript as one file named main.js
        .pipe(concat('footer.js'))
        //Uglify the file
        .pipe(uglify())
        //Rename the file main.min.js
        .pipe(rename({ suffix:'.min'}))
        .pipe(gulp.dest(settings.path.distribution.js));
    //Uglify and move pages specific JS
    return gulp.src([settings.path.application.js + '/pages/*.js'])
        .pipe(uglify())
        .pipe(rename({ suffix:'.min'}))
        .pipe(gulp.dest(settings.path.distribution.js+"/pages/"));
});

//Assets
gulp.task('assets', function() {
    //Moving Fonts
    gulp.src(settings.path.application.fonts + "*")
        .pipe(gulp.dest(settings.path.distribution.fonts));

    //Moving PDFs
    return gulp.src(settings.path.application.pdf + "*")
        .pipe(gulp.dest(settings.path.distribution.pdf));
});

//Images Task
gulp.task('images', ['png', 'jpg', 'gif', 'svg']);

//Png
gulp.task('png', function() {
    return gulp.src(settings.path.application.images + "*.png")
        .pipe(imagemin({optimizationLevel: settings.imageoptions.optimizationlevel.png,use: [pngquant()]}))
        .pipe(gulp.dest(settings.path.distribution.images));
});

//Jpg
gulp.task('jpg', function() {
    return gulp.src(settings.path.application.images + "*.jpg")
        .pipe(imagemin({optimizationLevel: settings.imageoptions.optimizationlevel.jpg,progressive: true}))
        .pipe(gulp.dest(settings.path.distribution.images));
});

//Gif
gulp.task('gif', function() {
    return gulp.src(settings.path.application.images + "*.gif")
        .pipe(imagemin({interlaced: true}))
        .pipe(gulp.dest(settings.path.distribution.images));
});

//Svg
gulp.task('svg', function() {
    return gulp.src(settings.path.application.images + "*.svg")
        .pipe(imagemin({svgoPlugins: [{removeViewBox: false}],multipass: true}))
        .pipe(gulp.dest(settings.path.distribution.images));
});

//Watch Task
gulp.task('watch', function() {
    gulp.watch(settings.path.application.pages + '*.njc', ['nunjucks']);
    gulp.watch(settings.path.application.scss + '/**/*.scss', ['sass']);
    gulp.watch([settings.path.application.js + '/**/*.js'], ['javascript']);
    gulp.watch(settings.path.application.fonts + "*", ['assets']);
    gulp.watch(settings.path.application.images + "*.png", ['png']);
    gulp.watch(settings.path.application.images + "*.jpg", ['jpg']);
    gulp.watch(settings.path.application.images + "*.gif", ['gif']);
    gulp.watch(settings.path.application.images + "*.svg", ['svg']);
});

//Build Task
gulp.task('build', ['assets', 'javascript', 'sass', 'nunjucks', 'images']);

//Default Task
gulp.task('default', ['build']);
