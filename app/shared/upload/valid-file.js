define(['app'], function (app) {

    'use strict';

    app.directive('validFile', function () {

        return {
            require: 'ngModel',
            link: function (scope, el, attrs, ngModel) {

                el.bind('change', function () {

                    var value = el.val(), ext = value.substring(value.lastIndexOf('.') + 1).toLowerCase(), fileFormats = [];

                    if (el.attr('name') === 'resume') {
                        fileFormats = ['pdf'];
                    }

                    if (el.attr('name') === 'portfolio') {
                        fileFormats = ['doc', 'docx'];
                    }

                    if (el.attr('name') === 'photo') {
                        fileFormats = ['jpg', 'jpeg'];
                    }

                    if (fileFormats.indexOf(ext) !== -1 && document.getElementById(el.attr('name')).files[0].size < 4194304) {
                        $('.' + el.attr('name')).css({
                            "background-image": "url('assets/images/valid.png')",
                            "background-repeat": "no-repeat",
                            "background-position": "right 0px"
                        });

                        scope.$apply(function () {
                            ngModel.$setViewValue(el.val());
                            ngModel.$render();
                        });
                    } else {
                        $('.' + el.attr('name')).css({
                            "background-image": "url('assets/images/invalid.png')",
                            "background-repeat": "no-repeat",
                            "background-position": "right 0px"
                        });

                        scope.$apply(function () {
                            ngModel.$setViewValue();
                            ngModel.$render();
                        });
                    }
                });

            }
        };
    });

});