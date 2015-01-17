var app = angular.module('beta', [], function($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/partials/home',
    controller: HomeController
  });
  // When you put /home, it also automatically handles /home/ as well
  $routeProvider.when('/login', {
    templateUrl: '/partials/login',
    controller: LoginController
  });
  $routeProvider.otherwise( { redirectTo: '/login'} );

  // configure html5 to get links working
  // If you don't do this, you URLs will be base.com/#/home rather than base.com/home
  $locationProvider.html5Mode(true);
});