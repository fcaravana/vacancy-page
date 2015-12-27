define(['app'], function (app) {

    'use strict';

    app.controller('UploadFormCtrl', [
        '$scope',
        function (scope) {

            scope.vacancy = {};
            
            scope.submit = function() {
                
                console.log(scope.vacancy);
                
            };
        }

    ]);

});