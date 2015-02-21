'use strict';

/* Controllers */

var uisControllers = angular.module('uisControllers', []);


/************************************************************
 * Nav Controller
 ***********************************************************/

uisControllers.controller('NavCtrl', ['$scope', '$location', '$anchorScroll',
  function($scope, $location, $anchorScroll) {
    $scope.fixedClassName = 'fixed';
    
    $scope.isActive = function (viewLocation) { 
      //console.log(viewLocation + ' + ' + $location.path());
      return ($location.path() == viewLocation) ? 'active' : '';
    };    
    
    $scope.gotoContact = function () {
      console.log("Goto contact");
      $location.hash('contact-form');
      $anchorScroll();
    }
    
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
    Events(function(data) {
      $scope.events = data;
      //console.log(data);
    }, function(err) {
      console.error(err);
    });
  
}]);

/************************************************************
 * Footer Controller
 ***********************************************************/

uisControllers.controller('FooterCtrl', ['$scope', 'Contact', function($scope, Contact) {
  $scope.formSubmitted = false;
  
  /** 
  * Collect form information and mail to UIS 
  */
  $scope.send = function(info) {
    
    // Bad or rejected form submissions
    var onError =  function(err) {
      console.error("Error occurred submitting contact form: " + err);
      
      $scope.formError = true;
      
      setTimeout(function() {
        $scope.formError = false;
      }, 3000);        
    }
    
    if(!info.$invalid) {
      Contact(info, function(data) {
        console.log($scope.formSubmitted);
        $scope.formSubmitted = true;
        
        setTimeout(function() {
          $scope.formSubmitted = false;
        }, 1000);
      }, onError);
      
    } else {
      onError("Bad format.");
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

/************************************************************
 * Homepage Controller
 ***********************************************************/

uisControllers.controller('HomePageCtrl', ['$scope', 
  function($scope, HomePage) {
    $scope.minOpacity = 0.3;
    $scope.targetDelta = 0.4; // minOpacity + targetDelta = max opacity

    $scope.icons = [
      {
        title: 'Build',
        description: 'your foundation from financial literacy to career empowerment',
        img: 'assets/img/icon_build.png'
      },
      {
        title: 'Network',
        description: 'with aspiring peers & veteran alumni',
        img: 'assets/img/icon_network.png'
      },
      {
        title: 'Transform',
        description: 'UCSD into a target school one internship at a time',
        img: 'assets/img/icon_transform.png'
      }
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

uisControllers.controller('CalendarPageCtrl', ['$scope', 
  function($scope, CalendarPage) {

  }]);


uisControllers.controller('ConferencePageCtrl', ['$scope', '$rootScope', 
  function($scope, $rootScope, ConferencePage) {
    
  }]);
  
uisControllers.controller('AboutPageCtrl', ['$scope', 
  function($scope, AboutPage) {

  }]);
  