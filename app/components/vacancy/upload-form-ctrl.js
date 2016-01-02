define(['app'], function (app) {

    'use strict';

    app.controller('UploadFormCtrl', [
        '$scope',
        '$location',
        function (scope, location) {

            scope.vacancy = {};

            var params = getUrlVars();
            
            scope.vacancy.firstName = (params.first_name ? params.first_name : null);
            scope.vacancy.lastName = (params.last_name ? params.last_name : null);
            scope.vacancy.city = (params.city ? params.city : null);
            scope.vacancy.country = (params.country ? params.country : null);
            scope.vacancy.email = (params.email ? params.email : null);
            scope.vacancy.phone = (params.phone ? params.phone : null);
            scope.vacancy.motivation = (params.motivation ? params.motivation : null);
        }

    ]);

});