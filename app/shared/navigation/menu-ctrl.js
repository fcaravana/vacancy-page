define(['app'], function (app) {

    'use strict';

    app.controller('MenuCtrl', [
        '$scope',
        '$translatePartialLoader',
        function (scope, translatePartialLoader) {

            /**
             * Open close menu.
             */
            scope.openMenu = function () {
                $('.menu .row > .col-md-8').toggle();
            };

            $(window).on('resize', function () {
                if ($('.open-menu').css('display') === 'none') {
                    $('.menu .row > .col-md-8').removeAttr('style');
                }
            });

            /**
             * Load translations.
             */
            translatePartialLoader.addPart('main');
        }
    ]);

});