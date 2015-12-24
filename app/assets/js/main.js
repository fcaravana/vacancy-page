require.config({
    baseUrl: 'assets/js/',
    paths: {
        
        /* jquery / bootstrap */
        'jquery': 'libs/jquery.min',
        'bootstrap': 'libs/bootstrap.min',
        
        /* angular */
        'angular': 'libs/angular.min',
        'angular-route': 'libs/angular-route.min',
        'angular-translate': 'libs/angular-translate.min',
        'angular-translate-loader-partial': 'libs/angular-translate-loader-partial.min',
        
        /* app */
        'app': 'app',
        'go-to-top-ctrl': '../../shared/buttons/go-to-top-ctrl',
        'menu-ctrl': '../../shared/navigation/menu-ctrl',
        'footer-ctrl': '../../shared/footer/footer-ctrl'

    },
    shim: {
        jquery: {
            exports: '$'
        },
        bootstrap: {
            deps: ['jquery']
        },
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-translate': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-translate-loader-partial': {
            deps: ['angular', 'angular-translate']
        },
        app: {
            exports: 'app',
            deps: ['jquery', 'bootstrap', 'angular', 'angular-translate-loader-partial']
        }
    }
});

require([
    'jquery',
    'bootstrap',
    'angular',
    'angular-route',
    'angular-translate',
    'angular-translate-loader-partial',
    'app',
    'go-to-top-ctrl',
    'menu-ctrl',
    'footer-ctrl'
], function () {

    angular.bootstrap(document, ['vacancyApplyPageApp']);

});
