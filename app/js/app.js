'use strict';

/* App Module */

var uis = angular.module('uis', [
  'ngRoute',

  'uisControllers',
  // 'uisFilters',
  'uisServices',
  'uisAnimations'
]);

console.log("!");
uis.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomePageCtrl'
      }).    
      when('/leadership', {
        templateUrl: 'partials/leadership.html',
        controller: 'LeadershipPageCtrl'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactPageCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);