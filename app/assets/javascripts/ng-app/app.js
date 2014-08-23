'use strict';

var cryptogem = angular.module('cryptogem', ['ngRoute']);

cryptogem.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'ng-views/index.html',
      controller  : 'IndexController'
    })
    .when('/faq', {
      templateUrl : 'ng-views/faq.html',
      controller  : 'FaqController'
    })
    .when('/about', {
      templateUrl : 'ng-views/about.html',
      controller  : 'FaqController'
    })
    .when('/:gem_id', {
      templateUrl : 'ng-views/gem.html',
      controller  : 'GemController'
    })
    .otherwise({
      redirectTo  : '/404',
      templateUrl : 'ng-views/404.html'
    });
});