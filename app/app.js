'use strict';

/* App Module */

var uis = angular.module('uis', [
  'ngRoute',

  'uisControllers',
  // 'uisFilters',
  'uisServices',
  'uisAnimations'
])
.run(function($rootScope, $location) {
    $rootScope.location = $location;
});

uis.config(['$routeProvider', '$locationProvider',
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
      
      $locationProvider.html5Mode(true);      
  }]);
  
uis.directive('script', function() {
  return {
    restrict: 'E',
    scope: false,
    link: function(scope, elem, attr)
    {
      if (attr.type==='text/javascript-lazy')
      {
        console.log("Lazy loading");
        var s = document.createElement("script");
        s.type = "text/javascript";
        var src = elem.attr('src');
        if(src!==undefined)
        {
          s.src = src;
        }
        else
        {
          var code = elem.text();
          s.text = code;
        }
        document.head.appendChild(s);
        elem.remove();
      }
    }
  };
});

// FB Graph Access
// var ns_uis = (function() {
//   // Load FB SDK
//   window.fbAsyncInit = function() {
//     FB.init({
//         appId      : '323850914480241',
//         xfbml      : true,
//         version    : 'v2.2'
//       });
//     };
  
//     (function(d, s, id){
//       var js, fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) {return;}
//       js = d.createElement(s); js.id = id;
//       js.src = "//connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     }(document, 'script', 'facebook-jssdk'));  
// })();