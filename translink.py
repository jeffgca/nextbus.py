from simplejson import loads, dumps
from os.path import exists, abspath, dirname, basename
import sqlite3
import httplib, urllib

class TranslinkProxy(object):
    # sqlite3
    create_sql = 'CREATE TABLE IF NOT EXISTS stops(number int unique, name varchar(128), direction varchar(12));'
    cursor = None
    
    # httplib
    baseUri = 'm.translink.ca'

    def __init__(self, baseUri=None, dbPath="db/translink.sqlite3"):
        
        #    Create the sqlite database handle. 
        if not exists(dirname(dbPath)):
            raise Exception("Database file doesn't exist: %s" % dbPath)
            
        conn = sqlite3.connect(dbPath)
        cursor = conn.cursor()
        cursor.execute(self.create_sql)

    # http://m.translink.ca/api/stops/?s=51217
    def _httpGet(self, params):
        # un-comment to print out headers in the console
        # httplib.HTTPConnection.debuglevel = 1
        url = "http://%s/%s" % (self.baseUri, params)
        print url
        response = urllib.urlopen(url).read()
        return loads(response)

    def get_nearby_stops(self, long, lat):
        return self._httpGet("api/stops/?f=json&lng=%s&lat=%s" % (long, lat))
    
    def get_bus_times(self, stop):
        parsed = self._httpGet("api/stops/?s=%s" % stop)
        stop_info = {"number": stop, "name": parsed[0]["stopName"]}
        data = parsed
        return {"stop_info": stop_info, "data": data};
    

if __name__ == '__main__':
    # run some functional tests...
    t = TranslinkProxy()
    print t.get_bus_times("51217")
    print t.get_nearby_stops("49.25344", "-123.16789")
