'use strict';

/* Services */

var uisServices = angular.module('uisServices', ['ngResource']);

/**
 * Simple utility methods
 */
uisServices.factory('Util', function() {
    return {
        parseURLs: function(s) {
            if(s) {
    
                s = s.match(new RegExp(
                  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
                 ,"g"
                ));
                
            }

            return s || [];
        }
    }
})
.factory('GAuth', 
    function() {
        gapi.client.setApiKey('AIzaSyAYd_kJIzfJbPkoNdH_fgFDVog1B35cMQ0');
        return gapi.client.load('calendar', 'v3'); //'IzaSyAYd_kJIzfJbPkoNdH_fgFDVog1B35cMQ0'
    }
)
/** 
 * Retrieves a Facebook event by ID
 */
// .factory('FBGraphEvent', [
//     function() {
//         return function(id, callback) {
//             FB.api('/' + id,
//                 function (response) {
//                     console.log(response);
//                     if (response && !response.error) {
//                         callback(response);
//                     }
//                 });
//         }
//     }]
// )
/**
 * Events service 
 * Returns the latest events from the UIS Google calendar.
 */
.factory('Events', ['GAuth', 'Util',
    function(GAuth, Util, FBGraphEvent) {
        var calendarId = 'jipbmf9i7ilsinkbiurhd911ag@group.calendar.google.com';
        //var calendarId = /* TEST CALENDAR */ '54e4jggu1ahlbjkfm3etmdfk8g@group.calendar.google.com';
        
        var parseFBLink = function(description) {
            
            var urls = Util.parseURLs(description);
            var id = null;
            
            angular.forEach(urls, function(url, i) {
               if(!id && url.contains('facebook')) {
                   var li = url.split('/')
                   id = url;
                   description = description.replace(url, '');
               } 
            }, this);
            
            return {fbLink: id, description: description};
        }

        return function(callback, error) {
            
            GAuth.then(function() {
                var request = gapi.client.calendar.events.list({
                    calendarId: calendarId
                });
                
                request.then(function(data) {
                    var events = [];
                    
                    angular.forEach(data.result.items, function(event, i) {
                        
                        var result = {};
                        
                        var items = parseFBLink(event.description);
                        if(items.fbLink != null) {
                            result.fb = items.fbLink;
                            event.description = items.description;
                        } 
                        
                        result.summary = event.summary;
                        result.time = event.start.dateTime;
                        result.location = event.location;
                        result.description = event.description;      
                                         
                        events.push(result);
                        
                    });
                    
                    callback(events);
                
                }, error);
            });
        };
    }
]);