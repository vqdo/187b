'use strict';

/* Controllers */

var uisControllers = angular.module('uisControllers', []);

uisControllers.controller('HomePageCtrl', ['$scope', 
  function($scope, HomePage) {
    $scope.minOpacity = 0.4;
    $scope.targetDelta = 0.6; // minOpacity + targetDelta = max opacity
    $scope.onScroll = function(element, opacity) {
      element.css({
        'background':  
          'radial-gradient(500px at center, rgba(0, 111, 175, ' + ((opacity-0.4)/2 + 0.4) + '), rgba(21, 28, 48, ' + opacity + ')), url("../../assets/img/attention.jpg") 50% 20%',
        'background-size': 'cover'
      });
    }
  }])
  .directive("uisOpacity", function ($window) {
      return function(scope, element, attrs) {
          var activeDistance = 400;     
          angular.element($window).bind("scroll", function() {
              var delta = Math.max(0, this.pageYOffset - element[0].scrollTop);
              var opacity = Math.min(1, scope.minOpacity + (delta * scope.targetDelta)/500);
              scope.onScroll(element, opacity);
        
              scope.$apply(); 
          });        
      };
  });

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