'use strict';

/* Controllers */

var uisControllers = angular.module('uisControllers', []);

uisControllers.controller('HomePageCtrl', ['$scope', 
  function($scope, HomePage) {
    
  }]);

uisControllers.controller('LeadershipPageCtrl', ['$scope', 
  function($scope, LeadershipPage) {
    
  }]);

uisControllers.controller('ContactPageCtrl', ['$scope', 
  function($scope, ContactPage) {

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