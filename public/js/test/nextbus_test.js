test("Test geolocation", function() {
    var geo_supported = (typeof(navigator.geolocation) !== 'undefined');
    ok(geo_supported, "navigator.geolocation shouldn't be undefined");
});

asyncTest("Test getting the current location [async]", function() {
    
    nextbus.geo.init(
        
        function() {
            start();
            nextbus.geo.getCurrentLocation(function(location) {
                console.log(location);
                ok((typeof(location) == 'object'), "Got back a Geoposition type.");
                ok((typeof(location.coords) == 'object'), "Got back a Coordinate type.");
                
                ok((typeof(location.coords.latitude)) == 'number', "lat is a number");
                ok((typeof(location.coords.longitude)) == 'number', "long is a number"); 
                
                start();
            });
        });
});

asyncTest("Test getting nearby stops via location", function() {
    nextbus.init('http://absolom.local/nextbus/');
    nextbus.geo.init(function() {
        start();
        nextbus.geo.getNearbyStops(49.248523, -123.1088, function(data) {
            console.log(data);
            console.log(data.length);
            ok((data.length === 10), "We should get 10 results");
            var stop = data.pop();
            ok((typeof(stop[0] == 'number')), "First field in first result is a numebr");
            ok((typeof(stop[1]) == 'string'), "Second field is a string");     
            start();
        })    
    });
});

asyncTest("Get bus times from the server", function() {
    
    nextbus.init('http://absolom.local/nextbus/');
    nextbus.get('51217', function(data) {
        console.log(data);
        
        ok((typeof(data.data) == 'object'), "Data array returned.");
        ok((typeof(data.data.length) == 'number'), "Data is an array.");
        ok((typeof(data.stop_info) == 'object'), "stop_info property returned.");
        
        ok(data.stop_info.direction == "North", "Direction should be North.");
        ok(data.stop_info.name == "Commercial Dr @ Findlay St", "Check the stop name.");
        
        var route = data.data.pop();
        
        ok((route.direction == "North"), "Direction is North");
        ok((route.stopID == '51217'), "Stop ID is 51217");
        
        start();
    });
});


