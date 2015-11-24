require.config({
    baseUrl: 'assets/js/',
    paths: {
        'jquery': 'libs/jquery.min',
        'bootstrap': 'libs/bootstrap.min',
        'angular': 'libs/angular.min'
    },
    shim: {
        jquery: {
            exports: '$',
        },
        bootstrap: {
            deps: ['jquery']
        },
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        app: {
            deps: ['jquery', 'bootstrap', 'angular']
        }
    }
});

require([
    'jquery',
    'bootstrap',
    'angular',
    'app'
], function () {

    console.log("It's where!");

});
