/**
 * Created by anuraagbasu on 03/05/16.
 */

angular.module("expenseApp", [
    'ui.router',
    'ngProgress',
    "ng-fusioncharts"
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');
        eve.on('raphael.new', function () {
            this.raphael._url = this.raphael._g.win.location.href.replace(/#.*?$/, '');
        });

        $locationProvider.html5Mode(true);
    });