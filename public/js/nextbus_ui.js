/**
 * namespace nextbus_ui
 */
if(typeof(nextbus) == 'undefined') {
    var nextbus = {};
}

if(typeof(nextbus.ui) == 'undefined') {
    nextbus.ui = {};
}

(function() {
    this.init = function() {
	nextbus.history.init();
	nextbus.geo.init();
	
        $('#submit_btn').bind('click', function() {
            nextbus.get_bustimes();
        });

	$('#history-link').bind('click', function() {
	    nextbus.ui.fill_history();
	});
	this.fill_history();
	this.showLocation();
    }
    
    this.showLocation = function() {
	$('#location').html('loading...');
	nextbus.geo.getCurrentLocation(function(location) {
	    $('#location').html(
		location.coords.latitude + ", " + location.coords.longitude
	    );
	    nextbus.geo.getNearbyStops(location, function() {
		var args = [].slice.call(arguments);
		console.log(args);
	    });
	});
    }

    this.show_results = function(data) {
        if (typeof(data.error) == 'undefined') {
            var stop_name = data.stop_info.number + ' ' + data.stop_info.name;
            
            for (i in data.data) {
                var time_str = data.data[i].times.join(' ');
                label = 'Route: ' + data.data[i].routeName + '<br/>Times: ' + time_str;
                $('#bus-data').append('<li>' + label + '</li>');
            }

	    $('#search-form').show(function() {
		$('#stop_name').html(stop_name);
		$('#stop_number').val();
	    });
            $('#stop_container').show();
	    
        }
        else {
            $('#bus-data').html('<li>Error: ' + data.error + '</li>');
        }
        
        //$('#submit_btn').attr('disabled', false);
        $('#bus-data').show();
    }
    
    this.fill_history = function() {
        var ii = 0;
        var list = nextbus.history.loadAll();
        var str_history = '';
        for (var i in list) {
            var a = '<a href="#search" onclick="nextbus.get('+ i +');">'
                + i + ' ' + list[i].name + '</a>';
            var li ='<li>' + a + '</li>';
            str_history += li;
        }

        if (str_history.length > 0) {
            $('#history-list').html('').append(str_history);
        }
    }
    
    this.flash = function(msg) {
	$('#submit_btn').attr('disabled', false);
        $('#error-box').html("<li>" + msg + "</li>").show();
    }
    
}).apply(nextbus.ui);
