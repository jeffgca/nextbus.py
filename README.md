## Nextbus.py

Synposis: A bottle.py-based html5 client-server implementation for accessing
Translink data.

To Do:

1. munge the stop_info return dict to include properly parsed name and direction.
1. publish top github 

*Raw:*

    [{
        "stopName": "NB Commercial Dr FS Findlay St",
        "direction": "North",
        "favourite": false,
        "routeID": "N20",
        "stopID": "51217",
        "routeName": "N20 - Downtown/Victoria Nightbus",
        "times": ["1:41a", "2:11a", "2:41a", "1:41a"]
    }, {
        "stopName": "NB Commercial Dr FS Findlay St",
        "direction": "North",
        "favourite": false,
        "routeID": "020",
        "stopID": "51217",
        "routeName": "020 - Victoria/Downtown              ",
        "times": ["8:47a", "8:55a", "9:02a", "9:10a"]
    }]

*Our JSON:*

    {
        "stop_info": {
            "number": 51217,
            "name": "Commercial Dr @ Findlay St"
        },
        "data": [{
            "stopName": "NB Commercial Dr FS Findlay St",
            "direction": "North",
            "favourite": false,
            "routeID": "N20",
            "stopID": "51217",
            "routeName": "N20 - Downtown\/Victoria Nightbus",
            "times": ["1:41a", "2:11a", "2:41a", "1:41a"]
        }, {
            "stopName": "NB Commercial Dr FS Findlay St",
            "direction": "North",
            "favourite": false,
            "routeID": "020",
            "stopID": "51217",
            "routeName": "020 - Victoria\/Downtown              ",
            "times": ["8:34a", "8:40a", "8:47a", "8:55a"]
        }]
    }
