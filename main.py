try:
    from bottle import route, run
except ImportError:
    print "Error importing bottle, please run ./getdeps to fetch bottle.py into the current directory."
    import sys
    sys.exit(1)

from simplejson import dumps, loads
import translink

proxy = translink.TranslinkProxy()

@route('/times/:stop')
def name(stop):
    """ http://localhost:8080/times/51217 """
    return dumps(proxy.get_bus_times(stop))

@route('/nearby/:lat/:long')
def nearby(lat, long):
    """ http://localhost:8080/nearby/49.25344/-123.16789 """
    return dumps(proxy.get_nearby_stops(lat, long))

@route('/')
def index():
    return dumps({'status': 'invalid request'})

run(host='localhost', port=8080)
