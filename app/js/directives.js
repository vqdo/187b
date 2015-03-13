'use strict';

(function() { 
	var uisDirectives = angular.module('uisDirectives', []);
    
    // uisDirectives.directive("uisOpacity", function ($window) {
    //       return function(scope, element, attrs) {
    //           console.log("!");
    //         var onScroll = function(element, opacity) {
    //             var overlay = '0, 0, 0';
                
    //             element.css({
    //               'background':  
    //                 'linear-gradient(rgba(' + overlay + ',' + opacity + '), rgba(' + overlay + ', ' + opacity + ')), url("../../assets/img/writing.jpg") 50% 40%',
    //               'background-size': 'cover'
    //             });
    //           }  
              
    //           var activeDistance = 400;  
    //           console.log(scope);
    //           angular.element($window).bind("scroll", function() {
    //               var delta = Math.max(0, this.pageYOffset - element[0].scrollTop);
    //               var opacity = Math.min(1, scope.minOpacity + (delta * scope.targetDelta)/500);
                  
    //               onScroll(element, opacity);
    //               scope.$apply(); 
    //           });        
    //       };
    //   })
      
    // uisDirectives.directive('uisPhotoOverlay', function() {
    //   return function(scope, element, attrs) {
    //     var overlay = $('<div />')
    //       .addClass(scope.overlayClass)
    //       .attr('ng-show', '$scope.members[$index].show');
        
    //     element.css('position', 'relative');        
    //     element.prepend(overlay);
    //     //scope.$apply();
    //   }
    // });
      
    uisDirectives.directive('uisAnimateOnScroll', function($window) {
          return function(scope, element, attrs) {
              var onScroll = function() {
                console.log("Found it!");
                scope.inView = true;
              }
              
              var offset = 200;
              angular.element($window).bind("scroll", function() {
                if(!scope.inView && this.pageYOffset + this.innerHeight > element[0].offsetTop + offset) {
                  onScroll();
                  scope.$apply();                  
                }
                
              });
          }
  });

})();