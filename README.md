Pix-Diff2
==========

A lightweight protractor plugin for image comparison

## About this fork
First, thanks @Koola for this great protractor plugin.

This fork is not intended to replace the original Pix-Diff. I needed to change the plugin fast to match my needs.
Therefore i will continue to maintain it in the future and be as close as possible to original Pix-Diff.

[![Build Status](https://travis-ci.org/ottorun/pix-diff2.svg)](https://travis-ci.org/ottorun/pix-diff2)
[![npm version](https://badge.fury.io/js/pix-diff2.svg)](http://badge.fury.io/js/pix-diff2)

[![NPM](https://nodei.co/npm/pix-diff2.png)](https://nodei.co/npm/pix-diff2/)

##Installation

Install this module locally with the following command:
```shell
npm install pix-diff2
```

Save to dependencies or dev-dependencies:
```shell
npm install --save pix-diff2
npm install --save-dev pix-diff2
```

##Usage

The package can be used directly in individual tests or via ```onPrepare``` in the Protractor configuration file.

**Example:**
```javascript
exports.config = {
   // your config here ...

    onPrepare: function() {
        var PixDiff = require('pix-diff2');
        browser.pixDiff = new PixDiff(
            {
                basePath: 'path/to/screenshots/',
                width: 1280,
                height: 1024
            }
        );
    },
}
```

PixDiff provides two comparison methods ```checkScreen``` and ```checkRegion``` along with Jasmine ```toMatchScreen``` and Mocha ```matchScreen``` matchers. Two helper methods ```saveScreen``` and ```saveRegion``` are provided for saving images.

**Jasmine Example:**
```javascript
describe("Example page", function() {

    beforeEach(function() {
        browser.get('http://www.example.com/');
    });

    it("should match the page", function () {
        expect(browser.pixDiff.checkScreen('examplePage')).toMatchScreen();
    });

    it("should not match the page", function () {
        element(By.buttonText('yes')).click();
        expect(browser.pixDiff.checkScreen('examplePage')).not.toMatchScreen();
    });

    it("should match the title", function () {
        expect(browser.pixDiff.checkRegion(element(By.id('title')), 'example page title')).toMatchScreen();
    });

    it("should match the title", function () {
        expect(browser.pixDiff.checkRegion(element(By.id('title')), 'example page title', {
            blockOut: [{x: 10, y: 132, width: 100, height: 50}]})).toMatchScreen();
    });
});
```

####PixDiff Parameters:

* ```basePath``` Defines the path to the reference images that are to be compared.
* ```width``` Browser width (default: 1280)
* ```height``` Browser height (default: 1024)
* ```formatImageName``` Naming format for images (default: ```"{tag}-{browserName}-{width}x{height}"```)

####Function options:

* ```blockOut``` Object or list of objects with coordinates that should be blocked before comparing. (default: none)
* ```debug``` When set, then block-out regions will be shown on the output image. (default: false)

####Cropping
Images can be cropped before they are compared by using the ```checkRegion``` function. The function will calculate the correct dimensions based upon the webdriver element selector (see example above).

####Block-Out
Sometimes, it is necessary to block-out some specific areas in an image that should be ignored for comparisons. For example, this can be IDs or even time-labels that change with the time. Adding block-outs to images may decrease false positives and therefore stabilizes these comparisons (see example above).

## Conventions
There are directory and naming conventions that must be met.

**Directory structure**
```text
path
└── to
    └── screenshots
        ├── diff
        │   └── examplePage-chrome-1280x1024.png
        ├── examplePage-chrome-800x600.png
        ├── examplePage-chrome-1280x1024.png
        ├── examplePageTitle-chrome-800x600.png
        └── examplePageTitle-chrome-1280x1024.png
```
The ```basePath``` directory must contain all the *approved* images. You may create subdirectories for better organisation, but the relative path should then be given in the test spec method. Failed comparisons generate a diff image under the **diff** folder.

**Image naming**

Images should obey the following default format:

```text
{descriptionInCamelCase}-{browserName}-{browserWidth}x{browserHeight}.png
```

The naming convention can be customized by passing the parameter ```formatImageName``` with a format string like:

```text
{browserName}_{tag}__{width}-{height}
```

Images specified via name in the spec method will be selected according to the browsers current resolution. That is to say that multiple images can share the same name differentated by resolution.

##Documentation

todo

##Tests

Run all tests with the following command:
```shell
npm test
```

Run all tests by framework:
```shell
npm test -- jasmine/mocha
```

###Dependencies
* [blink-diff](https://github.com/yahoo/blink-diff)
* [png-image](https://github.com/koola/png-image)
* [camel-case](https://github.com/blakeembrey/camel-case)

###Dev-Dependencies
* [grunt](https://github.com/gruntjs/grunt)
* [grunt-cli](https://github.com/gruntjs/grunt-cli)
* [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
* [grunt-protractor-runner](https://github.com/teerapap/grunt-protractor-runner)
* [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)
* [protractor](https://github.com/angular/protractor)
* [mocha](https://github.com/mochajs/mocha)
* [chai](https://github.com/chaijs/chai)
* [chai-as-promised](https://github.com/domenic/chai-as-promised)

##License

The MIT License

Copyright 2016 Koola.
