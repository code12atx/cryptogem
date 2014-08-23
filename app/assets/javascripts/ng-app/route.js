'use strict';

cryptogem.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'ng-views/create-gem.html',
      controller  : 'CreateGemController'
    })
    .when('/faq', {
      templateUrl : 'ng-views/faq.html',
      controller  : 'FaqController'
    })
    .when('/about', {
      templateUrl : 'ng-views/about.html',
      controller  : 'AboutController'
    })
    .when('/:gem_id', {
      templateUrl : 'ng-views/view-gem.html',
      controller  : 'ViewGemController'
    })
    .otherwise({
      redirectTo  : '/404',
      templateUrl : 'ng-views/404.html'
    });
});