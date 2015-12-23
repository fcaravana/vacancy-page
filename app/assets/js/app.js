/**
 * Angular.
 */
define(function () {

    'use strict';

    /* module */
    var app = angular.module('vacancyApplyPageApp', ['ngRoute', 'pascalprecht.translate']);

    /* translations */
    app.config([
        '$translateProvider',
        '$translatePartialLoaderProvider',
        function (translateProvider, translatePartialLoaderProvider) {
            translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: 'shared/translations/{lang}/{part}.json'
            });

            translateProvider.useSanitizeValueStrategy('escape');
            translateProvider.preferredLanguage('en');
            translatePartialLoaderProvider.addPart('main');
        }
    ]);

    return app;

});