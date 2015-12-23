define(['app'], function (app) {

    'use strict';

    app.controller('GoToTopCtrl', [
        '$scope',
        function (scope) {

            scope.goToTop = function () {
                $('html,body').stop(true, true).animate({scrollTop: 0}, 800);
            };

        }
    ]);

});