'use strict';

/* App Module */

var uis = angular.module('uis', [
  'ngRoute',

  'uisControllers',
  // 'uisFilters',
  'uisServices',
  'uisAnimations'
]);

console.log("HELLO!");
uis.config(['$routeProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomePageCtrl'
      }).    
      when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutPageCtrl'
      }).      
      when('/calendar', {
        templateUrl: 'partials/calendar.html',
        controller: 'CalendarPageCtrl'
      }).      
      when('/conference', {
        templateUrl: 'partials/conference.html',
        controller: 'ConferencePageCtrl'
      }).      
      when('/recruiting', {
        templateUrl: 'partials/recruiting.html',
        controller: 'RecruitingPageCtrl'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactPageCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
      
      //$locationProvider.html5Mode(true);      
  }]);
