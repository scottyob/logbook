# Loads in locations
# Annotates them with GeoJSON
# precision 6

import pygeohash as pgh
import sys
import json

PRECISION = 6

data = json.load(sys.stdin)
for d in data:
    try:
        d["geohash"] = pgh.encode(d["lat"], d["lon"], precision=6)
    except:
        sys.stderr.write(json.dumps(d))
        
        raise

print(json.dumps(data))