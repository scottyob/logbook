import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import Geohash from 'latlon-geohash';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useDropzone } from 'react-dropzone';
const IGCParser = require("igc-parser");
const GeoLocation = require("geolocation-utils");


const RESOLUTION = 6; //Geohash resolution

const launchesFromGeohash = /* GraphQL */ `
query FindLaunch(
  $geohash: String
){
  launchesByGeohash(geohash: $geohash) {
    items {
      id
      lat
      lon
      type
    }
  }
}
`;


function readAsAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve({
        name: file.name,
        igc: IGCParser.parse(reader.result),
        raw_igc: reader.result,
        // fileHash: md5(reader.result),
      });
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function Uploader(props) {
  const [dbLaunches, setDbLaunches] = useState([]);

  useEffect(() => {
    // Load up all of the immediate, and adjacent geohashes from the given files
    // GPS launch coordinates
    var geohashes = props.files.map(file => {
      const fix = file.igc.fixes[0]
      const geohash = Geohash.encode(fix.latitude, fix.longitude, RESOLUTION);
      const neighbors = []; //Geohash.neighbours(geohash);
      return [...Object.values(neighbors), geohash];
    }).flat();

    // Load up all of the launches from the DB for these geohashes
    var launches = Promise.all(geohashes.map(async h => {
      const dbResult = await API.graphql(graphqlOperation(launchesFromGeohash, {
        geohash: h
      }));
      return dbResult.data.launchesByGeohash.items;
    })).then((values) => {
      setDbLaunches(values.flat());
    })
  }, [props.files]);

  return props.files.map(f =>
    <Flight key={f.filename} filename={f.name} igc={f.igc} locations={dbLaunches} />
  );

}

function verticle(igc) {
  // Gets max verticle feet for a flight
  let heights = igc.fixes.map((f) => {
    return f.gpsAltitude;
  });
  const meters = Math.max(...heights) - Math.min(...heights);
  return Math.round(meters * 3.281);
}

Number.prototype.toHHMMSS = function() {
  var sec_num = this
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + ':' + minutes + ':' + seconds;
}

function duration(igc) {
  // Returns flight duration in human readable format
  return ((igc.fixes[igc.fixes.length - 1].timestamp - igc.fixes[0].timestamp) / 1000).toHHMMSS();
}

function totalDistance(igc) {
  // Returns the total distance travelled in km.
  let totalDistance = 0.0;

  let fixLocations = igc.fixes.map((f) => {
    return { lat: f.latitude, lon: f.longitude };
  });
  fixLocations.forEach((f, i) => {
    if (i === 0) {
      return;
    }
    totalDistance =
      totalDistance + GeoLocation.distanceTo(fixLocations[i - 1], f);
  });
  return (totalDistance / 1000).toFixed(2);
}

function maxLaunchDistance(igc) {
  // Returns the maximum distance from launch in km
  let maxDistance = 0.0;

  let fixLocations = igc.fixes.map((f) => {
    return { lat: f.latitude, lon: f.longitude };
  });
  let distances = fixLocations.map(l => GeoLocation.distanceTo(fixLocations[0], l));
  return (Math.max(...distances) / 1000).toFixed(2);
}

function closestLaunch(igc, launches) {
  // returns the name of the closest launch from the given igc
  const launch = { lat: igc.fixes[0].latitude, lon: igc.fixes[0].longitude };
  const sorted = launches.sort((a, b) => {
    return (
      GeoLocation.distanceTo(launch, { lat: a.lat, lon: a.lon }) -
      GeoLocation.distanceTo(launch, { lat: b.lat, lon: b.lon })
    );
  });
  if (sorted.length > 0)
    return sorted[0].id;
  return "";
}

function Flight(props) {
  const e = props.igc.date.split("-");
  const date = e[1] + "/" + e[2] + "/" + e[0];
  return <tr key={props.filename}>
    <td>{date}</td>
    <td>{closestLaunch(props.igc, props.locations)}</td>
    <td>{verticle(props.igc)}</td>
    <td>{duration(props.igc)}</td>
    <td></td>
    <td>{totalDistance(props.igc)}</td>
    <td>{maxLaunchDistance(props.igc)}</td>
    <td>{props.igc.gliderType}</td>
    <td>{props.filename}</td>
    <td></td>
  </tr>;
}

function flightText(f) {
  return [
    f.igc.date,
    "location",
    verticle(f.igc),
    duration(f.igc),
    "",
    totalDistance(f.igc),
    maxLaunchDistance(f.igc),
    f.igc.gliderType,
    f.name
  ].join(',');
}

function LogBook() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [flights, setFlights] = useState();

  useEffect(() => {
    const promises = acceptedFiles.map(file => readAsAsync(file));
    Promise.all(promises).then(files => {
      if (files.length > 0) {
        setFlights(<Uploader files={files} />);
      }

    });

  }, [acceptedFiles]);

  // const flights = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      
      <p>This will all eventually be in a database</p>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Location</th>
            <th>Vertical (ft)</th>
            <th>Duration</th>
            <th>Wind dir + speed</th>
            <th>Total Distance Travelled (km)</th>
            <th>Max Distance (km from launch)</th>
            <th>Glider</th>
            <th>Flight Log Filename</th>
            <th>Comments</th>
          </tr>
                  </thead>
        <tbody>
          {flights}
        </tbody>
      </table>
    </section>
  );

}

const Page = () => {
  // const { isAuthenticated } = useAuth0();

  var uploader = <LogBook />;

  return (
    <div>
      <div>{uploader}</div>
      <hr />
      <div>
    
      </div>
    </div>
  );
};

export default withAuthenticator(Page);
