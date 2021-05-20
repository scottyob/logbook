#!/usr/bin/node

/*
 * Annotate takes in items with latitude and longitude
 * and will annotate them with the GeoHash
 * (https://www.npmjs.com/package/latlon-geohash) location.
 * 6 characters is about the right precision for paragliding
 * launches.
 */

const fs = require('fs');

import Geohash from 'latlon-geohash';

//const Geohash = require('latlon-geohash');

const RESOLUTION = 6

async function main() {
    let json = JSON.parse(fs.readFileSync('launches.json'));
    json.map(launch => {
        launch.geohash = Geohash.encode(launch.lat, launch.lon, RESOLUTION);
    })
    console.log(JSON.stringify(json))
}

main()
