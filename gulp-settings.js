// These settings are passed into the gulpfile.  Most of the time you shouldn't need to change
// the gulpfile, but can just make the necessary changes here.
var settings = {};

// configured to match the browsers we support.
settings.autoprefixerOptions = {
    "browsers" : [
        "last 5 versions",
        "ie >= 10"
    ]
};

// Some base settings for how much we should optimize the images
settings.imageOptions = {
    optimizationlevel : {
        png: 3,
        jpg: 3
    }
}

// This determines the names of the folders.  You can change it if you have a preference for something else
settings.folders = {
    app: "app/",
    dist: "dist/",
    assets: "assets/",
    fixtures: "fixtures/",
    javascript: "js/",
    styles: "css/",
    pages: "pages/",
    images: "images/",
    svgs: "svgs/",
    pdfs: "pdfs/"
},

// folders within the assets folder with these names will be copied over to the dist folder
settings.staticAssetFolders = [
    "ask-lilly",
    "fonts",
    "pdfs",
    "images",
    "json",
    "videos"
];

module.exports = settings;