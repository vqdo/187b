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
        },
        truncate: function(s, max) {
            if(s.length > max - 3) {
                s = s.substr(0, max) + '...';
            }
            return s;
        }
    }
})
/****
 * Retrieves contact information and posts to contact.php
 */
.factory('Contact', ['$http', 
    function($http) {
        return function(info) {
            //console.log(info);
            console.log("POSTingg contact form");
                
            $http({
                method: 'POST',
                url: 'php/mail.php', 
                data: {
                    name: info.name,
                    email: info.email,
                    message: info.message
                }
                
            })
            .success(function(data) {
                console.log("Success!");
                console.log(data);
            })
            .error(function(err) {
                console.log(err);
                console.error("Error sending contact form! ");
            });
        }
}])
.factory('GAuth', 
    function() {
        console.log(gapi.client);
        gapi.client.setApiKey('AIzaSyAYd_kJIzfJbPkoNdH_fgFDVog1B35cMQ0');
        return gapi.client.load('calendar', 'v3'); //'IzaSyAYd_kJIzfJbPkoNdH_fgFDVog1B35cMQ0'
    }
)
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
                console.log("url: " + url);
               if(!id && (url.indexOf('facebook') > -1)) {
                   var li = url.split('/')
                   id = url;
                   description = description.replace(url, '');
               } 
            }, this);
            
            return {fbLink: id, description: description};
        }

        return function(callback, error) {
            
            GAuth.then(function() {
                console.log("Calendar request");
                var request = gapi.client.calendar.events.list({
                    calendarId: calendarId
                });
                
                request.then(function(data) {
                    console.log("Calendar callback: " + data.result.items);
                    var events = [];
                    
                    angular.forEach(data.result.items, function(event, i) {

                        var result = {};

                        var items = parseFBLink(event.description);
                                                
                        if(items.fbLink != null) {
                            result.fb = items.fbLink;
                            event.description = items.description;
                        } 
                        
                        result.summary = Util.truncate(event.summary, 80);
                        result.time = event.start.dateTime;
                        result.location = event.location;
                        result.description = Util.truncate(event.description, 100);      
                                         
                        events.push(result);
                        console.log(result);
                        
                    });
                    console.log(events);
                    callback(events);
                
                }, error);
            });
        };
    }
]);