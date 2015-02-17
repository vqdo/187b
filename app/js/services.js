'use strict';

/* Services */

var uisServices = angular.module('uisServices', ['ngResource']);

/**
 * Simple utility methods
 */
uisServices.service('Util', function() {
    this.parseURLs = function(s) {
        if(s) {

            s = s.match(new RegExp(
              "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
             ,"g"
            ));
            
        }

        return s || [];
    };
    this.truncate = function(s, max) {
        if(s && s.length > max - 3) {
            s = s.substr(0, max) + '...';
        }
        return s;
    };
    this.parseMonth = function(month) {
        var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return months[month];
    };
    this.parseTime = function(d) {
        var hr = d.getHours();
        var min = d.getMinutes();
        if (min < 10) {
            min = "0" + min;
        }
        var ampm = hr < 12 ? "am" : "pm";      
        
        return (hr % 12) + ':' + min + ' ' + ampm;
    }
})
/****
* Retrieves contact information and posts to contact.php
*/
.factory('Contact', ['$http',
    function($http) {
        return function(info, onSuccess, onError) {
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
            .success(onSuccess)
            .error(onError);
        }
}])
/** 
 * Loads and performs async setup for access to Google Calendar
 * Returns a promise 
 */
.service('GAuth', ['$rootScope', '$q', '$window', 
    function($rootScope, $q, $window) {
        var self = this;
        this.deferred = $q.defer();
        
        
        this.loadClient = function() {
            gapi.client.setApiKey('AIzaSyAYd_kJIzfJbPkoNdH_fgFDVog1B35cMQ0');
            gapi.client.load('calendar', 'v3').then(function() {
                console.log("Resolving!!");
                self.deferred.resolve();
                $rootScope.$apply();
            }, function() {
                console.error("Could not resolve the client.");
            });
        }
        
        // I just can't get the GApi callback to resolve the promise
        // so, this is an alternative solution
        if(!this.timer) {
            this.timer = setInterval(function() {
                console.log("Tick.");
                if(gapi.client) {
                    self.loadClient.apply(self);
                    clearInterval(self.timer);
                }
            }, 1000);
        }
        
        this.then = this.deferred.promise.then;
        
    }]
)
.factory('Cache', ['$cacheFactory', function($cacheFactory) {
    console.log("Returning CacheFactory");
    return $cacheFactory('cache');
}])
/**
 * Events service 
 * Returns the latest events from the UIS Google calendar.
 */
.factory('Events', ['GAuth', 'Util', 'Cache',
    function(GAuth, Util, Cache) {
        var TITLE_CHAR_LIMIT = 42;
        var DESC_CHAR_LIMIT = 140;
        
        var calendarId = 'jipbmf9i7ilsinkbiurhd911ag@group.calendar.google.com';
        //var calendarId = /* TEST CALENDAR */ '54e4jggu1ahlbjkfm3etmdfk8g@group.calendar.google.com';
        
        var parseFBLink = function(description) {
            
            var urls = Util.parseURLs(description);
            var link = null;
            angular.forEach(urls, function(url, i) {
                if(!link && (url.indexOf('facebook') > -1)) {
                    link = url;
                    description = description.replace(url, '');
               } 
            }, this);
            
            return {fbLink: link, description: description};
        }
        
        // Takes in string representing RFC 3339
        var parseDatetime = function(date) {
            date = new Date(Date.parse(date));
            return Util.parseMonth(date.getMonth()) + ' ' + date.getDay() + ' at ' + Util.parseTime(date);
        }

        return function(callback, error) {
            var cachedEvents = Cache.get('events');        
            if(cachedEvents) {
                console.log("Cache found");
                return callback(cachedEvents);
            }            

            console.log("Waiting for Gapi...");
            // Retrieve events from Google Calendar
            GAuth.then(function() {
                console.log("Retrieving events.");
                var request = gapi.client.calendar.events.list({
                    calendarId: calendarId,
                    maxResults: 5,
                    orderBy: 'startTime',
                    singleEvents: true
                });
                
                request.then(function(data) {
                    //console.log("Calendar callback: " + data.result.items);
                    var events = [];
                    
                    angular.forEach(data.result.items, function(event, i) {

                        var result = {}, 
                            items = parseFBLink(event.description);
                                                
                        if(items.fbLink != null) {
                            result.fb = items.fbLink;
                        } 
                        result.summary = Util.truncate(event.summary, TITLE_CHAR_LIMIT);
                        result.time = parseDatetime(event.start.dateTime);
                        result.location = event.location;
                        result.description = Util.truncate(items.description, DESC_CHAR_LIMIT);      
                                         
                        events.push(result);
                        //console.log(result);
                        
                    });
                    
                    Cache.put('events', events); 
                    callback(events);
                
                }, error);
            });
        };
    }
]);