'use strict';

exports.config = {

    framework: 'jasmine2',

    baseUrl: 'http://www.example.com',

    specs: ['jasmine.firefox.spec.js'],

    capabilities: {
        browserName: 'firefox',
        chromeOptions: {
            args: ['--no-sandbox']
        }
    },

    directConnect: true,

    onPrepare: function() {
        browser.ignoreSynchronization = true;
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000,
        showColors: true
    }
};