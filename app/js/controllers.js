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
    $scope.done   = false;
    $scope.error  = false;
    
    $scope.upcoming = [];
    $scope.past     = [];
    
    console.log("About to call events");
    Events(function(data) {
      console.log(data);
      $scope.upcoming = data.upcoming;
      $scope.past = data.past;
      $scope.done = true;
      $scope.$apply();
      console.log("Done!");      
    }, function(err) {
      console.error(err);
      $scope.error = true;
      $scope.done = true;
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

    $scope.icons = []

    $scope.displayIcons = false;
    
      $scope.icons = [{
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
      }];

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
    $scope.eventSources = [{
      googleCalendarId: 'jipbmf9i7ilsinkbiurhd911ag@group.calendar.google.com',
      googleCalendarApiKey: 'AIzaSyAYd_kJIzfJbPkoNdH_fgFDVog1B35cMQ0'
    }];
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        header:{
          left: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
      
        googleCalendarApiKey: 'AIzaSyAYd_kJIzfJbPkoNdH_fgFDVog1B35cMQ0',
        eventSources: {
            googleCalendarId: 'jipbmf9i7ilsinkbiurhd911ag@group.calendar.google.com'
        }
      }
    }
      
  }]);


uisControllers.controller('ConferencePageCtrl', ['$scope', '$rootScope', 
  function($scope, $rootScope, ConferencePage) {
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/jipbmf9i7ilsinkbiurhd911ag@group.calendar.google.com/public/basic",
    };
  }]);
  
uisControllers.controller('AboutPageCtrl', ['$scope', 
  function($scope, AboutPage) {

  }]);
uisControllers.controller('ExecutivePageCtrl', ['$scope', 
function($scope, ExecutivePage) {
  $scope.overlayClass = 'photo-overlay';
  
  $scope.defaultPhoto = 'assets/img/exec_default.jpg';
  $scope.members = [
    {
      name: 'Samuel Hong',
      role: 'President',
      photo: 'assets/img/exec_samuelhong.jpg',
      url: 'https://www.linkedin.com/profile/view?id=132928891'
    },
    {
      name: 'Michelle Sou',
      role: 'Senior Vice President',
      photo: 'assets/img/exec_michellesou.jpg',
      url: 'https://www.linkedin.com/profile/view?id=278037322'
    },
    {
      name: 'Jiayi Zeng',
      role: 'VP Internal',
      photo: 'assets/img/exec_jiayizeng.jpg',
      url: 'https://www.linkedin.com/profile/view?id=296094020'
    },
    {
      name: 'Mohammed Alyasini',
      role: 'Co-VP Research and Education',
      photo: 'assets/img/exec_mohammed.jpg',
      url: 'https://www.linkedin.com/profile/view?id=278037322'
    },
    {
      name: 'Giovanni Ugut',
      role: 'Co-VP Research and Education',
      photo: 'assets/img/exec_giovanni.jpg',
      url: 'https://www.linkedin.com/profile/view?id=296094020'
    },
    {
      name: 'Jason Masong',
      role: 'Co-VP External - Sponsors',
      photo: 'assets/img/exec_jasonmasong.jpg',
      url: 'https://www.linkedin.com/profile/view?id=296094020'
    },
    {
      name: 'Jocelyn Ueng',
      role: 'Co-VP External - Speakers',
      photo: 'assets/img/exec_jocelyn.jpg',
      url: 'https://www.linkedin.com/profile/view?id=296094020'
    },
    {
      name: 'Dominick Suvonnasupa',
      role: 'Director of Campus Relations',
      photo: 'assets/img/exec_dom.jpg',
      url: 'https://www.linkedin.com/profile/view?id=296094020'
    },
    {
      name: 'Dorothy Chow',
      role: 'Director of Marketing',
      photo: 'assets/img/exec-dorothy.jpg',
      url: 'https://www.linkedin.com/profile/view?id=296094020'
    },
    {
      name: 'Jeffrey Shu',
      role: 'Director of Human Resource and Technology',
      photo: 'assets/img/exec_jeffreyshu.jpg',
      url: 'https://www.linkedin.com/profile/view?id=296094020'
    },
    {
      name: 'Roohani Arora',
      role: 'Director of Finance',
      photo:  $scope.defaultPhoto,
      url: 'https://www.linkedin.com/profile/view?id=296094020'
    },
  ]
  
  $scope.hover = function(item) {
    console.log(item);
    item.show = !item.show;
  }
  
}]);