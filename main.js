/*jslint node:true, nomen:true, plusplus:true, unparam:true*/
(function () {
    'use strict';

    var scraper = require('scraper'),
        async   = require('async'),
        _       = require('underscore'),
        async_stack = [],
        timeout = 500; //(ms)

    _([
        'http://example.com/',
    ]).each(function (url, i, urls) {

        var process = function (callback) {

            console.log('# url:', url);

            scraper({
                'uri': url,
                // 'auth': {
                //     'user': 'xxxxx',
                //     'password': 'xxxxx'
                // }
            }, function (err, $) {
                if (err) { throw err; }

                $('[onclick]').each(function (i, element) {
                    var click = $(element).attr('onclick');

                    console.log('    ', click);
                });

                setTimeout(function () {
                    callback();
                }, timeout);
            });
        };

        async_stack.push(process);
    });

    async.series(async_stack);
}());
