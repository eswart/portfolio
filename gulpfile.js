// General Node Utilities
var autoprefixer = require('gulp-autoprefixer'), //Automatic CSS Style Prefixing.
    concat       = require('gulp-concat'), // Combine multiple files together
    del          = require('del'), // Delete files for the clean process
    fs           = require('fs'), // File system access
    merge        = require('merge-stream');
    path         = require('path'),
    pngquant     = require('imagemin-pngquant'); // PNG Optimizer

// Gulp and the plugins we are using.
var gulp         = require('gulp'), // The main task runner.
    cache        = require('gulp-cached'), // Makes it so we don't have to re-copy assets while watching
    cleancss     = require('gulp-cleancss'), // Minifies CSS
    imagemin     = require('gulp-imagemin'), // Image optimizer
    htmlmin      = require('gulp-htmlmin'), // Strip whitespace out of html
    nunjucks     = require('gulp-nunjucks-html'), //Templating Engine.
    plumber      = require('gulp-plumber'), // So we don't have to fail on SASS and JS errors
    rename       = require('gulp-cached'), // Keep track of files that have already been gulped
    rename       = require('gulp-rename'), // Rename files in the gulp process
    sass         = require('gulp-sass'), // Styles
    svgmin       = require('gulp-svgmin'),
    svgstore     = require('gulp-svgstore'),
    uglify       = require('gulp-uglify'), // The best JS Minifier
    webserver    = require('gulp-webserver');  // Serves the built assets when doing a watch.

// Settings used to configure the gulp script.
// Most of the time you should only need to modify this file.
var s = require('./gulp-settings.js');

// Using the settings, build out the paths where things are located.
var paths = {
    "app": {
        "root":       s.folders.app,
        "pages":      s.folders.app + s.folders.pages,
        "assets":     s.folders.app + s.folders.assets,
        "fixtures":   s.folders.app + s.folders.fixtures,
        "styles":     s.folders.app + s.folders.assets + s.folders.styles,
        "javascript": s.folders.app + s.folders.assets + s.folders.javascript,
        "images":     s.folders.app + s.folders.assets + s.folders.images,
        "svgs":       s.folders.app + s.folders.assets + s.folders.svgs
    },
    "dist": {
        "root":       s.folders.dist,
        "assets":     s.folders.dist + s.folders.assets,
        "styles":     s.folders.dist + s.folders.assets + s.folders.styles,
        "javascript": s.folders.dist + s.folders.assets + s.folders.javascript,
        "images":     s.folders.dist + s.folders.assets + s.folders.images
    }
};

// Selector shorthand variables
var all = {
    files: "*",
    filesInAllSubFolders: "**",
}
var endingWith = {
    nunjucksExtension: "/*.njc",
    sassExtension: "/*.scss",
    jsExtension: "/*.js",
    svgExtension: "/*.svg"
}
var extension = {
    minified: ".min",
    html: ".html",
    javascript: ".js",
    css: ".css",
}

/*** Tasks ***/

// Default Task.  If you just run `gulp` this is the task that will run.
gulp.task('default', ['build']);

gulp.task('build', ["clean","compile"]);

// The main build task.  Makes sure we clean the dist folder before we compile.
gulp.task('compile', ['html', 'javascript', 'styles', 'static-assets', 'svg-symbols', 'fixtures']);

// Watch task runs a normal build and then continues watching all the important files.
gulp.task('watch', ["build"], function() {
    gulp.watch(paths.app.root       + all.filesInAllSubFolders + endingWith.nunjucksExtension, ['html'])
    gulp.watch(paths.app.styles     + all.filesInAllSubFolders + endingWith.sassExtension,     ['styles']);
    gulp.watch(paths.app.javascript + all.filesInAllSubFolders + endingWith.jsExtension,       ['javascript']);
    gulp.watch(paths.app.svgs       + all.filesInAllSubFolders + endingWith.svgExtension,      ['svg-symbols']);
    s.staticAssetFolders.map(function(assetFolder){
        gulp.watch(paths.app.assets + assetFolder + '/' + all.filesInAllSubFolders, ["static-assets"]);
    });
    return gulp.start(['webserver']);
});

gulp.task("webserver", function() {
    gulp.src("dist/")
        .pipe(webserver({
            port: 9090,
            livereload: true,
            open: true
        }));
});

// HTML Templates
gulp.task('clean', function() {
    del.sync([paths.dist.root]);
});

// HTML Templates
gulp.task('html', function() {
    return gulp.src(paths.app.pages + all.filesInAllSubFolders + endingWith.nunjucksExtension)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(nunjucks({searchPaths: [paths.app.root]}))
        .pipe(plumber.stop())
        .pipe(htmlmin({collapseWhitespace: false, minifyJS: true}))
        // Rename to .html extension
        .pipe(rename({extname: extension.html}))
        // Prettify to re-indent and remove empty lines
        .pipe(gulp.dest(paths.dist.root));
});

// Styles
gulp.task('styles', function() {
    return gulp.src(paths.app.styles + "main.scss")
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        // Sass settings
        .pipe(sass({ outputStyle: 'compressed', appComments: 'false'}))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(plumber.stop())
        // Adding Autoprefixer
        .pipe(autoprefixer(s.autoprefixerOptions))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(cleancss())
        .pipe(rename({extname: extension.minified + extension.css}))
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest(paths.dist.styles));
});

// Javascript.
gulp.task('javascript', function() {
    var folders = getFolders(paths.app.javascript);

    var tasks = folders.map(function(folder) {
        var scriptFolderPath = paths.app.javascript + folder;
        var sources = [];
        // If an npm-dependencies.json folder exists add in all those files
        if (fs.existsSync(scriptFolderPath + "/npm-dependencies.json")) {
            sources = require("./" + scriptFolderPath + "/npm-dependencies.json").include;
        }
        // Add all the js files in the folder
        sources.push(scriptFolderPath + "/" + all.filesInAllSubFolders + endingWith.jsExtension)
        return gulp.src(sources)
            // concat into foldername.js
            .pipe(concat(folder + '.js'))
            .pipe(gulp.dest(paths.dist.javascript))
            // Minify
            .pipe(plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(uglify())
            .pipe(plumber.stop())
            // rename to folder.min.js
            .pipe(rename(folder + '.min.js'))
            .pipe(gulp.dest(paths.dist.javascript));
    });

    return merge(tasks);
});

gulp.task('static-assets', function(){
    var tasks = s.staticAssetFolders.map(function(assetFolder){
        return gulp.src(paths.app.assets + assetFolder + "/" + all.filesInAllSubFolders)
            .pipe(cache("static", {optimizeMemory: true}))
            .pipe(gulp.dest(paths.dist.assets + assetFolder));
    })

    return merge(tasks);
});

gulp.task('fixtures', function(){
    return gulp.src(paths.app.fixtures + "/" + all.filesInAllSubFolders)
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('svg-symbols', function(){
    var folders = getFolders(paths.app.svgs);

    var tasks = folders.map(function(folder) {
        // Add all the js files in the folder
        return gulp.src(paths.app.svgs + folder + "/" + all.filesInAllSubFolders + endingWith.svgExtension)
            .pipe(svgmin(function (file) {
                    var prefix = path.basename(file.relative, path.extname(file.relative));
                    return {
                        plugins: [{
                            cleanupIDs: {
                                prefix: prefix + '-',
                                minify: true
                            }
                        }]
                    }
                })
            )
            .pipe(svgstore())
            .pipe(rename({basename: folder}))
            .pipe(gulp.dest(paths.dist.images));
    });

    return merge(tasks);
});


/**
 * Optimize Images.  Should only be run when new images are added.  Optimizes the images in place.
 * Updatees should be committed back to the repository.
 */
gulp.task('optimize-images', ['optimize-png', 'optimize-jpg', 'optimize-gif', 'optimize-svg']);

gulp.task('optimize-png', function() {
    return gulp.src(paths.app.images + all.filesInAllSubFolders + "/*.png")
        .pipe(imagemin({optimizationLevel: s.imageOptions.optimizationlevel.png,use: [pngquant()]}))
        .pipe(gulp.dest(paths.app.images));
});

gulp.task('optimize-jpg', function() {
    return gulp.src(paths.app.images + all.filesInAllSubFolders + "/*.jpg")
        .pipe(imagemin({optimizationLevel: s.imageOptions.optimizationlevel.jpg,progressive: true}))
        .pipe(gulp.dest(paths.app.images));
});

gulp.task('optimize-gif', function() {
    return gulp.src(paths.app.images + all.filesInAllSubFolders + "/*.gif")
        .pipe(imagemin({interlaced: true}))
        .pipe(gulp.dest(paths.app.images));
});

gulp.task('optimize-svg', function() {
    return gulp.src(paths.app.images + all.filesInAllSubFolders + "/*.svg")
        .pipe(imagemin({svgoPlugins: [{removeViewBox: false}],multipass: true}))
        .pipe(gulp.dest(paths.app.images));
});

// Gets all the folders inside a directory
function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}