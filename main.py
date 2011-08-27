try:
    import bottle
    from bottle import route, run, static_file, get
except ImportError:
    print ImportError
    print "Error importing bottle, please run ./getdeps to fetch bottle.py into the current directory."
    import sys
    sys.exit(1)

import os
from os.path import abspath, dirname, basename, exists, join
from simplejson import dumps, loads
import translink

dbFile = join(dirname(__file__), "db", "translink.sqlite3")

proxy = translink.TranslinkProxy(dbPath=dbFile)
static_root = abspath(join(dirname(__file__), "public"))

@route('/times/:stop')
def times(stop):
    """ http://localhost:8080/times/51217 """
    bottle.response.content_type = 'application/json'
    return dumps(proxy.get_bus_times(stop))

@route('/nearby/:long/:lat')
def nearby(lat, long):
    """ http://localhost:8080/nearby/-123.16789/49.25344 """
    bottle.response.content_type = 'application/json'
    return dumps(proxy.get_nearby_stops(lat, long))

@route('/')
def index():
    return static_file('index.html', root=static_root)
    
# this should never ever be used in production, always serve static files
# directly from Nginx

@route('/:path#.+#')
def static(path):
    return static_file(path, root=static_root)

#bottle.debug(True)

run(server='tornado', host='0.0.0.0', port=8000)

