'use strict';

/* Controllers */

var uisControllers = angular.module('uisControllers', []);

uisControllers.controller('NavCtrl', ['$scope', 
  function($scope, Nav) {
    
  }]
);

uisControllers.controller('FooterCtrl', ['$scope', function($scope) {
  
  
}]).directive('googleMap', function() {
  return function($scope, $element) {
    // UCSD Coordinates
    var coordinates = { lat: 32.8810, long: -117.2388 };
    
    // Create map centering on coordinates
    var mapOptions = {
      center: new google.maps.LatLng(coordinates.lat, coordinates.long),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map($element[0], mapOptions); 
    
    // Drop a marker
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(coordinates.lat, coordinates.long),
      map: map
    });
  }
});
uisControllers.controller('HomePageCtrl', ['$scope', 
  function($scope, HomePage) {
    $scope.minOpacity = 0.3;
    $scope.targetDelta = 0.4; // minOpacity + targetDelta = max opacity
    $scope.onScroll = function(element, opacity) {
      var overlay = '0, 0, 0';
      
      element.css({
        'background':  
          'linear-gradient(rgba(' + overlay + ',' + opacity + '), rgba(' + overlay + ', ' + opacity + ')), url("../../assets/img/writing.jpg") 50% 40%',
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
  }).directive('lockNav', function($window) {
		console.log("Directive!!");
		return function(scope, element, attrs) {
          angular.element($window).bind('scroll', function() {
              var delta = this.pageYOffset;
              if(delta > element[0].height) {
              	element.addClass('fixed');
              } else {
              	element.removeClass('fixed');
              }
              
              scope.$apply(); 
          });   			
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