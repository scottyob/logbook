# About

LogBook is a personal logbook to store my Paragliding flights.  Others might find it useful, so it's designed as an Amplify web app with multi-tenant abilities.

# Setting Up

Once Amplify is deployed, we need to populate launches.

```
# Convert the KMZ file to GeoJSON
npm install -g togeojson
wget https://www.paraglidingspots.com/data/paraglidingspots.kmz
unzip paraglidingspots.kmz
togeojson doc.jml > tmp.json
# Playing with Ed
# cat tmp.json | jq '.features | map(select(.properties.name | contains("Ed Levin")) | {lat: .geometry.coordinates[1], lon: .geometry.coordinates[0], id: .properties.name, description: .properties.description})' > launches.json
# cat tmp.json | jq '.features | map(select(.geometry.type == "Point") | select(.properties.name | contains("Mols Hoved")))'

# This one filters out point geometry
#cat tmp.json | jq '.features | map(select(.geometry.type == "Point") | {lat: .geometry.coordinates[1], lon: .geometry.coordinates[0], id: .properties.name, description: .properties.description})' > launches.json
cat tmp.json | jq '.features | map(select(.geometry.type == "Point") | {lat: .geometry.coordinates[1], lon: .geometry.coordinates[0], id: .properties.name})' > launches.json


# cat tmp.json | jq --ascii-output '.features | map({lat: .geometry.coordinates[1], lon: .geometry.coordinates[0], id: .properties.name})' > launches.json

# Annotate with GeoHash
# cat launches.json | node /code/logbook/launchesImport/annotate.js > annotated.json
cat launches.json | python /code/logbook/launchesImport/annotate.py > annotated.json


# Fuck AWS make this hard...
# Split this up into lots of 25.
mkdir split
jq -c '.[]' annotated.json > json_lines.jsonl
mv x* split/
find split -exec sh -c 'jq -s "$(cat /code/logbook/launchesImport/toDynamoDb.jq)" "$1" > "$1.out"' -- {} \;
find split -name "*.out" -exec sh -c 'aws dynamodb batch-write-item --request-items "file://$1"' -- {} \;

# Converting Launches to upload to AWS.
jq "$(cat /code/logbook/launchesImport/toDynamoDb.jq)" annotated.json > upload.json
aws dynamodb batch-write-item --request-items file://upload.json



```