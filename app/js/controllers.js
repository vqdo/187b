'use strict';

/* Controllers */

var uisControllers = angular.module('uisControllers', []);

uisControllers.controller('HomePageCtrl', ['$scope', 
  function($scope, HomePage) {
    
  }]);

uisControllers.controller('RecruitingPageCtrl', ['$scope', 
  function($scope, RecruitingPage) {
    
  }]);

uisControllers.controller('ContactPageCtrl', ['$scope', 
  function($scope, ContactPage) {

  }]);

uisControllers.controller('CalendarPageCtrl', ['$scope', 
  function($scope, CalendarPage) {

  }]);


uisControllers.controller('ConferencePageCtrl', ['$scope', 
  function($scope, ConferencePage) {

  }]);
  
uisControllers.controller('AboutPageCtrl', ['$scope', 
  function($scope, AboutPage) {

  }]);
  


// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });

//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);