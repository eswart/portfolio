## Installation

### Build System Dependencies (NPM)
This starter kit utilizes a gulp based build system.  To install this you will
need to install node dependencies by executing the following command

```
npm install
```

Don't have npm?  NPM comes with node when install it with brew.  See http://brew.sh
to install brew if you need to.  Once brew is installed install node by running
this command:

```
brew install node
```

## Building

To run the build process just execute the following command

```
gulp
```



Watch for development
Watches css / js / page file updates

```
gulp watch
```

Build for CrownPeak deployment

``` text
gulp build
```

### CSS
Sass with autoprefixer


# Website Boilerplate

This project is meant to help you get going quickly building a new website.  It comes
with a basic build process.  Using this boilerplate will help you follow the best
practices followed by developers at GSW.

## Installation

This starter kit utilizes a gulp based build system.  To install this you will
need to install node dependencies by executing the following command

```
npm install
```

Don't have npm?  NPM comes with node when install it with brew.  See http://brew.sh
to install brew if you need to.  Once brew is installed install node by running
this command:

```
brew install node
```

## Building

To run the build process just execute the following command

```
gulp
```


### Watch
If you are actively developing you can run gulp with a watch command.  This will watch your source files and recompile as changes are made.  You start this with the following command:

```
gulp watch
```

### Webserver
gulp watch will also serve your website at [http://localhost:9090/](http://localhost:9090/).  It automatically opens a new browser window so you can see your changes right away.  This webserver is equipted with with [live reload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).  To make this work you need to install an extension into your web browser, but after doing so, as you make your changes they will be immediately reflected in your browser without having to constantly refresh.

If you only want gulp to serve the files in the `dist/` folder without building them website you can run that with the following command:

```
gulp webserver
```

### Image Optimization
If you are bringing new images into your project you can run the following command
to optimize those images.

```
gulp optimize-images
```

Just be sure to commit the optimized images back to the project.

## About

The website boilerplate is an opinionated starterkit for a high quality website.  Every piece has been specifically chosen for its merits and represents the best practices we have learned to adopt.  It is also a living project, continually evolving over time as our methodology improves.  If you have a suggestion you think should be included, we ecourage you to suggest it.  If it is an improvement over our current process we will add it.

### Folder Structure

The project follows this general project structure:

* `/app` - All of the source code for your project lives in this folder.
  * `/assets` - All the source css, js, and images and other static assets used by this website
    * `/css` - sass source files, see the CSS section below for details.
    * `/fonts` - custom fone files, all files just copied over during build
    * `/js` - javascript source files, see the JavaScript section below for details
    * `/images` - images used by the website, all files just copied over
    * `/pdfs` - pdfs used by the website, all files just copied over
    * `/svgs` - the source for svgs, see SVG section below for details.
  * `/layouts` - Contains layout templates.  See HTML Section below for details.
  * `/macros` - Contains template macros. See HTML Section below.
  * `/pages` - Template files.  All files here will be build using nunjucks and be placed at the root of the domain.  See the HTML Section below.
  * `/partials` - Template sections that can be included as needed. 
* `/dist` - The folder where all the files are placed after they are built.  This is also the folder that is served by the build script.
* `/node_modules` - installed by node, contains the dependencies declared in the package.json
* `.gitignore` - Specifies which files are ignored by git.
* `gulpfile.js` - The gulpfile that runs the build process
* `gulp-settings.js` - A settings files that determines much of what the gulpfile does.
* `package.json` - declares the npm dependencies that are used by the project
* `README.md` - This readme.

You are free to add files to this structure in a way that makes sense for your project but generally you should follow to the patterns that are already started.

### HTML 

HTML is built up using a templating language called [Nunjucks](https://mozilla.github.io/nunjucks/).  Nunjucks is built my Mozilla and is a full featured, sophisticated templating language that goes far beyond basic templating languages like Mustache.  It has features variables, template inheritance, blocks, macros, partial inclusion, logic, for loops and more.  For all the details take a look at the documentation here: [https://mozilla.github.io/nunjucks/templating.html](https://mozilla.github.io/nunjucks/templating.html).

In the website boilerplate the Nunjuck template files are easily recognizable by the njc extension and live live in one of 4 folders:

#### app/pages
The most important folder is the pages folder.  The files in this folder will be become the html files for your project.  Each one should extend a layout and should contain the specific html you need for that page.  They can usually include partials and and use macros to be as concise as possible.  The build process will create an html file with the same name for each file found in this folder but with a `.html` extension.  It will then place them at the root of the `dist/` folder.

#### app/layouts
This folder contains the base templates which are extended by pages.  There is always a `master.njc` which contains the main structure for the html document.  This includes the doctype, html, body and head tags, meta tags, as well as the main content blocks which are used by all the pages on the site.  All layouts and pages extend `master.njc`.  The other files in `app/layouts` are for alternate layouts.  A common senario is to have an HCP and a Patient layout both of which extend the master template.

To extend a layout you need to declare that at the top of your file like this:

```
{% extends "layouts/patient.njc" %}
```

#### app/partials
Partials are sections of html that you plan to reuse.  Using partials is a great idea as it can help you from having to repeat yourself and allow you to change common things in one location. You can include a partial like this.

```
{% include "partials/nav.njc" %}
```

#### app/macros
[Macros](https://mozilla.github.io/nunjucks/templating.html#macro) are the final group of files used by a website.  Macros are basically a partial that you can pass variables into.  It then uses those variables to produce the final output.  Macros can save you a lot of time and make your code much cleaner.  To use a macro you add a file to the macros folder which defines your macro.  This definition needs to have a macro and endmacro tag as well as the name of the function and all the parameters you can pass into it.

For example, if you wanted an **awesomeHeadline** macro you would add a `awesomeHeadline.njc` file to the `app/macros` folder.  The contents of which would look something like this:

```
{% macro awesomeHeadline(headline="") %}
  <h1 class="headline headline--awesome">{{ headline }}</h1>
{% endmacro %}
```
Then you need to specifically import them at the top of your page where you plan on using the macro file like this:

```
{% from "macros/awesomeHeadline.njc" import awesomeHeadline %}
```

And then you can use them like this:

```
{{ awesomeHeadline(headline = 'Macros are awesome!') }}
```

This will execute the macro, passing in the values and outputing the resulting template.  While requiring a little setup, they can be super powerful and save you a bunch of time.

### CSS

CSS in the website boilerplate is written using [SASS](http://sass-lang.com/guide).  We utilize [normalize.css](https://necolas.github.io/normalize.css/) to establish a base layer and media queries are managed with [SASS-MQ](http://sass-mq.github.io/sass-mq/).

Because most websites that we build only have one css file that contains all the CSS for the entire site, the build process only watches one file: /app/assets/css/main.scss  This file shouldn't contain any css itself, but instead should just @include all the other sass files you plan on using.  Several have been added to get you started.  As detailed in the documentation found in main.scss, the files should be included the following order:

1. Variables and colors
2. Third party sass utils
3. Global styles (fonts, normalize.css, & common styles)
4. Custom Utilities
5. Components
6. Page specific files

Whenever possible css should be written conforming to the [Block Element Modifier(BEM)](http://getbem.com/) methodology.  This is specifically for maintainability of the CSS code.  CSS written to follow BEM is less confusing than the other methods but still provides us the good architecture we want and with a recognizable terminology.

### JS

For website projects, it is common for multiple javascript files to be used.  Sometimes this is just one for the head and one for the end of the body, sometimes you need an extra javascript file on one page, or for a certain section of the site.  To manage all this, JavaScript for the boilerplate is all placed within the sub folders inside `app/assets/js`.  In that folder you will find a `head` and and `main` folder, but you can add more if you need them.

For each of these folders within the `app/assets/js` folder the build script will concatenate all the javascript files found inside and put a concatenated and minify version in the `dist/assets/js` folder with the same name as the folder.

#### npm-dependencies.json

To include javascript libraries you can either download and place them in the correct folder, or preferably just install them with npm and then declare them in a `npm-dependencies.json` file that you place within your javascript folder .  This `npm-dependencies.json` specifies what 3rd party javascript should be added to the javascript files you have written and looks something like this:

```
{
	"include": [
		"node_modules/jquery/dist/jquery.js",
		"node_modules/waypoints/lib/jquery.waypoints.js"
	]
}
```

When you declare a dependency in this way the build script will grab this files and concatenate them all together with the files you placed in that folder with the 3rd party files coming first and in the order that you specify.

### SVGs

SVGs are beautiful on the web.  They look nice and crisp at any resolution, and are most of the time a lot smaller in size.  But handling them can be tricky, which is why we build a system for using them into the boilerplate.  The core of this system is a technique for svgs where we reference a symbol in an external svg file using the `<use>` element.  The svg file that is referenced can contains several svgs and is loaded with one http request.  It is essentially like making a sprite sheet for svgs.  It saves http requests, and makes the site load quicker.

While faster loading is nice the biggest benefit of doing inserting svgs in this way is that you can style them with css.  You can change fills and stroke colors easily making it possible to reuse certain svgs when you just need the symbol to be a different color.  This technique is [discussed in detail on css tricks](https://css-tricks.com/svg-use-with-external-reference-take-2/).

To use this method all you have to do is drop any svg that you want to use into a folder within the `app/assets/svgs` folder.  The build script will take the svgs it finds in each folder in the svg directory and build a combined svg with every svg from that folder.  The id attribute for each of these symbols will match the file name.  You can then inject that svg into the page by adding something like this:

```
<svg role="img" class="svg" title="Arrow">
    <use xlink:href="/assets/images/symbols.svg#arrow"/>
</svg>
```

To help you do this quickly and easily the boilerplate contains a `symbol` macro that you can use to quickly add svgs in your symbol folder to the page.  You call it like this:

```
{{ symbol(id = 'arrow', class = 'arrow', alt = 'Arrow') }}
```

Just be sure you import the symbol macro at the top of your file.

As an FYI, in order to use this method cross browser you need [svg4everybody](https://github.com/jonathantneal/svg4everybody) to be loaded on the page.  This polyfills the `<use>` method when needed and makes sure everything works.


