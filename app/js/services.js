'use strict';

/* Services */

var uisServices = angular.module('uisServices', ['ngResource']);

// phonecatServices.factory('Phone', ['$resource',
//   function($resource){
//     return $resource('phones/:phoneId.json', {}, {
//       query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//     });
//   }]);

uisServices.factory('Events', ['$resource', 


    function($resource) {
        var calendarId = 'jipbmf9i7ilsinkbiurhd911ag@group.calendar.google.com';
        var params = ':key'
        var reqUrl = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + params + '/events'

        return $resource(reqUrl, {}, {
            query: {
                METHOD: 'GET', 
                params: {
                    key: 'IzaSyAYd_kJIzfJbPkoNdH_fgFDVog1B35cMQ0'
                }, 
                isArray: true}

        });

}]);