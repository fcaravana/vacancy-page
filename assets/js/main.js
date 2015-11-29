require.config({
    baseUrl: 'assets/js/',
    paths: {
        'jquery': 'libs/jquery.min',
        'bootstrap': 'libs/bootstrap.min',
        'angular': 'libs/angular.min',
        'go-to-top-ctrl': 'app/controllers/go-to-top-ctrl',
        'open-menu-ctrl': 'app/controllers/open-menu-ctrl'
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
            exports: 'angular',
            deps: ['jquery', 'bootstrap', 'angular']
        }
    }
});

require(['jquery', 'bootstrap', 'angular', 'app', 'go-to-top-ctrl', 'open-menu-ctrl'], function () {

    angular.bootstrap(document, ['netwervenApp']);

});
