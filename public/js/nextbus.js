/* for debugging */
if (typeof(console) == 'undefined') {
    var console = {}
    console.log = function(a) {}
}

/**
 * namespace nextbus
 */
if(typeof(nextbus) == 'undefined') {
    var nextbus = {};
}

(function() {
    
    this.base_url = false;
    
    this.init = function(uri) {
	this.base_url = uri;
    }
    
    this.get = function(number, success, error) {
        var uri = '/times/' + number;
	
	$.getJSON(uri, function(data) {
	    console.log("In getJSON callback...");
	    success(data);
	})
    }
}).apply(nextbus);

/**
 * namespace nextbus.history
 */
if(typeof(nextbus.history) == 'undefined') {
    nextbus.history = {};
}

(function() {
    
    /* the history key we're using */
    this.storage_label = 'nextbus_history';
    this.data = [];
    
    this.init = function() {
	var data;
	data = localStorage.getItem(this.storage_label);
	if (!data) {
	    localStorage.setItem(this.storage_label, JSON.stringify({}));
	    this.data = {}
	}
	else {
	    this.data = JSON.parse(data);
	}
    }
    
    this.save = function(stop, fn) {
	try {
	    var history_hash = JSON.parse(localStorage.getItem(this.storage_label));
	    
	    if (!history_hash) {
		history_hash = {};
	    }
	    
	    history_hash[stop.number] = stop;
	    localStorage.setItem(this.storage_label, $.toJSON(history_hash));
	    
	    if (typeof(fn) === 'function') {
		fn.call();
	    }
	    return true;
	} catch (e) {
	    return e;
	}
    }

    this.load = function(n) {
	var history_hash = this.loadAll();
	return history_hash[n];
    }
    
    this.loadAll = function() {
	var tmp = localStorage.getItem(this.storage_label);
	console.log(tmp);
	return JSON.parse(tmp);
    }
    
    this.get_stop_numbers = function() {
	var history_hash = this.loadAll();
	return _keys(history_hash);
    }
    
    function _keys(o) {
	var i = []
	for (k in o) { i.push(k) }
	return i;
    }

}).apply(nextbus.history);

/**
 * namespace nextbus.geo
 */

if(typeof(nextbus.geo) == 'undefined') {
    nextbus.geo = {};
}

(function() {
    
    this.geolocation_supported = false;
    
    this.init = function(success, err) {
	if (typeof(navigator.geolocation) !== 'undefined') {
	    this.geolocation_supported = true;
	    success();
	}
	else {
	    err();
	}
    }

    this.getCurrentLocation = function(callback) {
	if (!this.geolocation_supported) {
	    console.log('geolocation not supported...');
	    return;
	}
	console.log("Got here: " + this.geolocation_supported);
	
	try {
	    navigator.geolocation.getCurrentPosition(callback);
	    
	} catch (e) {
	    console.log(e);
	}
    }

    this.sucessHandler = function(location) {
	var args = [].slice.call(arguments);
	console.log([location.coords.latitude, location.coords.latitude]);
	
	this.getNearbyStops(
	    location.coords.latitude,
	    location.coords.longitude,
	    function(data) {
		console.log(data);
	    },
	    function(a,b) {
		var args = [].slice.call(arguments);
		console.log(args)
	    }
	);
    }

    this.errorHandler = function() {
	var args = [].slice.call(arguments);
	console.log(['Error!', args]);
    }
    
    this.getNearbyStops = function(latitude, longitude, success, error) {
	
	var uri = '/nearby/';
	uri += latitude + '/';
	uri += longitude;
	

	console.log(uri);
	
	$.getJSON(uri, function(data) {
	    console.log(data)
	    success(data);
	});
    }
}).apply(nextbus.geo);
