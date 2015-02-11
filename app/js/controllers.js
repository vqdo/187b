'use strict';

/* Controllers */

var uisControllers = angular.module('uisControllers', []);


/************************************************************
 * Nav Controller
 ***********************************************************/

uisControllers.controller('NavCtrl', ['$scope', 
  function($scope, Nav) {
    console.log("Initializing NavCtrl");
    $scope.fixedClassName = 'fixed';
  }]).directive("locknav", function ($window) {
      return function(scope, element, attrs) { 
          angular.element($window).bind("scroll", function() {
            var threshold = element[0].scrollTop + element[0].offsetHeight;
            var buffer = 20;
            if(this.pageYOffset > (threshold + buffer)) {
              element.addClass(scope.fixedClassName);
            } else {
              element.removeClass(scope.fixedClassName);
            }

            scope.$apply(); 
          });        
      };
});

/************************************************************
 * Events Controller
 ***********************************************************/  

uisControllers.controller('EventsCtrl', ['$scope', 'Events', 
  function($scope, Events) {
    $scope.events = [];
    console.log("About to call events");
    setTimeout(function() {
      Events(function(data) {
        $scope.events = data;
        console.log(data);
      });
    }, 2000);
  
}]);

/************************************************************
 * Footer Controller
 ***********************************************************/

uisControllers.controller('FooterCtrl', ['$scope', 'Contact', function($scope, Contact) {
  $scope.form = {};
  
  /** 
  * Collect form information and mail to UIS 
  */
  $scope.send = function(info) {
    if(!info.$invalid) {
      Contact(info);
    }
  }
}])
.directive('googleMap', function() {
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
})
.directive('contactForm', function() {
  return function($scope, $element) {
    
  }
});

/************************************************************
 * Homepage Controller
 ***********************************************************/

uisControllers.controller('HomePageCtrl', ['$scope', 
  function($scope, HomePage) {
    $scope.minOpacity = 0.3;
    $scope.targetDelta = 0.4; // minOpacity + targetDelta = max opacity
    

    $scope.icons = [
      {},
      {},
      {}
    ]

    $scope.displayIcons = false;

  }])
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