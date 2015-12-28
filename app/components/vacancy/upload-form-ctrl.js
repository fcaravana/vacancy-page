define(['app'], function (app) {

    'use strict';

    app.controller('UploadFormCtrl', [
        '$scope',
        '$http',
        function (scope, http) {

            scope.vacancy = {};

            scope.submit = function () {

                console.log(scope.vacancy);

            };
        }

    ]);

});