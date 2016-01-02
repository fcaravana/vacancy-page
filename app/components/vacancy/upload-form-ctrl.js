define(['app'], function (app) {

    'use strict';

    app.controller('UploadFormCtrl', [
        '$scope',
        '$filter',
        function (scope, filter) {

            scope.vacancy = {};

            /**
             * Get query string key, value pairs.
             */
            var params = getUrlVars();

            /**
             * Set default form values, if any.
             */
            scope.vacancy.firstName = (params.first_name ? params.first_name : null);
            scope.vacancy.lastName = (params.last_name ? params.last_name : null);
            scope.vacancy.city = (params.city ? params.city : null);
            scope.vacancy.country = (params.country ? params.country : null);
            scope.vacancy.email = (params.email ? params.email : null);
            scope.vacancy.phone = (params.phone ? params.phone : null);
            scope.vacancy.motivation = (params.motivation ? params.motivation : null);
            scope.vacancy.error = (params.error ? params.error : null);
            scope.vacancy.success = (params.success ? params.success : null);

            /**
             * Show error and success messages on form submit.
             */
            scope.showModal = function () {

                var title = '', message = '';

                if (scope.vacancy.success) {
                    title = filter('translate')('FORM_SUCCESS_TITLE');
                    message = filter('translate')('FORM_MSG_SUCCESS');
                } else {
                    title = filter('translate')('FORM_ERROR_TITLE');
                    message = filter('translate')('FORM_MSG_' + scope.vacancy.error);
                }

                scope.title = title;
                scope.message = message;

                $('#messages').modal('show');

                $('html, body').animate({
                    scrollTop: $("#title-vacancy").offset().top
                }, 1000);
            };

            /**
             * Start bootstrap modal.
             */
            $('#messages').modal({show: false});
            
            /**
             * Show modal if exists nay message to show.
             */
            if (scope.vacancy.error > 1 || scope.vacancy.success) {
                console.log("entrou");
                scope.showModal();
            }
        }

    ]);

});