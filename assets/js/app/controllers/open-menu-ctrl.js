define(['app'], function (app) {

    'use strict';

    app.controller('OpenMenuCtrl', ['$scope', function (scope) {

        scope.openMenu = function () {
            $('.menu .row > .col-md-8').toggle();
        };
        
        $(window).on('resize', function() {
            if ($('.open-menu').css('display') === 'none') {
                $('.menu .row > .col-md-8').removeAttr('style');
            }
        });
        

    }]);

});