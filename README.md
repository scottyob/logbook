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
cat tmp.json | jq '.features | map(select(.properties.name | contains("Ed Levin")) | {lat: .geometry.coordinates[1], lon: .geometry.coordinates[0], id: .properties.name, description: .properties.description})' > launches.json

# Annotate with GeoHash
cat launches.json | node /code/logbook/launchesImport/annotate.js > annotated.json

# Converting Launches to upload to AWS.
jq "$(cat /code/logbook/launches/toDynamoDb.jq)" annotated.json > upload.json
aws dynamodb batch-write-item --request-items file://upload.json
```