#!/usr/bin/node

/*
 * Annotate takes in items with latitude and longitude
 * and will annotate them with the GeoHash
 * (https://www.npmjs.com/package/latlon-geohash) location.
 * 6 characters is about the right precision for paragliding
 * launches.
 */

import Geohash from 'latlon-geohash';
// const Geohash = require('latlon-geohash');

const RESOLUTION = 6

function readJsonFromStdin() {
    let stdin = process.stdin
    let inputChunks = []

    stdin.resume()
    stdin.setEncoding('utf8')

    stdin.on('data', function(chunk) {
        inputChunks.push(chunk);
    });

    return new Promise((resolve, reject) => {
        stdin.on('end', function() {
            let inputJSON = inputChunks.join()
            resolve(JSON.parse(inputJSON))
        })
        stdin.on('error', function() {
            reject(Error('error during read'))
        })
        stdin.on('timeout', function() {
            reject(Error('timout during read'))
        })
    })
}

async function main() {
    let json = await readJsonFromStdin();
    json.map(launch => {
        launch.geohash = Geohash.encode(launch.lat, launch.lon, RESOLUTION);
    })
    console.log(json)
}

main()
