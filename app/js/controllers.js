'use strict';

/* Controllers */

var uisControllers = angular.module('uisControllers', []);

uisControllers.controller('HomePageCtrl', ['$scope', 
  function($scope, HomePage) {
    $scope.minOpacity = 0.4;
    $scope.targetDelta = 0.3; // minOpacity + targetDelta = max opacity
    $scope.onScroll = function(element, opacity) {
      element.css({
        'background':  
          'linear-gradient(rgba(41, 155, 220, ' + opacity + '), rgba(41, 155, 220, ' + opacity + ')), url("../../assets/img/writing.jpg") 50% 20%',
        'background-size': 'cover'
      });
    }

    $scope.icons = [
      {},
      {},
      {}
    ]

    $scope.displayIcons = false;

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
  })
  .directive('uisShowOnScroll', function($window, $timeout) {
    return function(scope, element, attrs) {

      var onScrollFn = function() {
        var threshold = 100;;

        if(this.pageYOffset > threshold) {
          scope.displayIcons = true;
          scope.$apply();      
        } 
      }

      angular.element($window).on('scroll', onScrollFn);

      // If the user's screen is too big or he never scrolls, display icons
      $timeout(function() {
        angular.element($window).off('scroll', onScrollFn);
        scope.displayIcons = true;
      }, 5000);
    }
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