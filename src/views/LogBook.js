import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";


import React, { useState, useEffect } from "react";
import { Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import Geohash from 'latlon-geohash';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useDropzone } from 'react-dropzone';
import { Table } from 'reactstrap';
const md5 = require('md5');
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
        fileHash: md5(reader.result),
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
      const neighbors = Geohash.neighbours(geohash);
      return [...Object.values(neighbors), geohash];
    }).flat();
    geohashes = [...new Set(geohashes)];
    console.log(geohashes);

    // Load up all of the launches from the DB for these geohashes
    var launches = Promise.all(geohashes.map(async h => {
      const dbResult = await API.graphql(graphqlOperation(launchesFromGeohash, {
        geohash: h
      }));
      console.log(dbResult);
      return dbResult.data.launchesByGeohash.items;
    })).then((values) => {
      console.log(values);
      setDbLaunches(values.flat());
    })
  }, [props.files]);

  var files = props.files;
  files = files.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    else if (b.name > a.name) {
      return -1;
    }
    return 0;
  });
  return files.map(f =>
    <Flight key={f.filename} filename={f.name} igc={f.igc} locations={dbLaunches} file={f} shouldUpload={true} />
  );

}

function verticle(igc, inMeters = false) {
  // Gets max verticle feet for a flight
  let heights = igc.fixes.map((f) => {
    return f.gpsAltitude;
  });
  const meters = Math.max(...heights) - Math.min(...heights);
  if (!inMeters) {
    return Math.round(meters * 3.281);
  }
  return meters;
}

Number.prototype.toHHMMSS = function () {
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

function totalDistance(igc, fixed = true) {
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
  if(!fixed) {
    return totalDistance
  }
  return (totalDistance / 1000).toFixed(2);
}

function maxLaunchDistance(igc, fixed = true) {
  // Returns the maximum distance from launch in km
  let maxDistance = 0.0;

  let fixLocations = igc.fixes.map((f) => {
    return { lat: f.latitude, lon: f.longitude };
  });
  let distances = fixLocations.map(l => GeoLocation.distanceTo(fixLocations[0], l));
  if(!fixed) {
    return parseInt(Math.max(...distances))
  }
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

// Object to show a flight, and upload it into the database
function Flight(props) {
  const [uploaded, setUploaded] = useState(false);
  const e = props.igc.date.split("-");
  const date = e[1] + "/" + e[2] + "/" + e[0];
  const locationName = closestLaunch(props.igc, props.locations);
  const igc = props.igc

  // Upload the flight
  useEffect(() => {
    async function doUpload(props) {
      if (props?.shouldUpload && !uploaded) {
        const username = (await Auth.currentAuthenticatedUser()).username;

        // check if a flight already exists
        const existing = await API.graphql({ query: queries.flightsByMd5, variables: {
          owner: username,
          md5: {
            eq: props.file.fileHash,
          }
        }})
        if(existing.data.flightsByMd5.items.length > 0) {
          console.log("Skipping due to duplicate");
          return;
        }

        // Create a flight in the database
        const flight = {
          start: props.igc.fixes[0].timestamp,
          locationName: locationName,
          // location: {
          //   id: locationName,
          // },
          vertical: verticle(props.igc, true),
          totalDistance: parseInt(totalDistance(props.igc, false)),
          maxDistance: maxLaunchDistance(props.igc, false),
          glider: props.igc.gliderType,
          filename: props.filename,
          md5: props.file.fileHash,
          owner: username,//attributes.email,
          duration: (igc.fixes[igc.fixes.length - 1].timestamp - igc.fixes[0].timestamp) / 1000,
          igc: props.file.raw_igc,
        };

        console.log("Should upload", flight);
        await API.graphql({ query: mutations.createFlight, variables: {input: flight}});
      }
    }

    doUpload(props);
  }, [uploaded]);

  return <tr key={props.filename}>
    <td>{date}</td>
    <td>{locationName}</td>
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
    <section className="container-fluid">
      <a href="/template.csv">Download csv template (for uploading)</a>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Upload flight igc files OR csv logbook files for uploads</p>
      </div>

      <Table>
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
      </Table>
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
