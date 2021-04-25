import React from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';


// import FlightUpload from "../components/FlightUpload";
// import { useAuth0 } from "../react-auth0-spa";
// import Table from "../components/Table";
// import { gql } from "apollo-boost";

// const GET_FLIGHTS = gql`
//   query FindAllFlights($size: Int) {
//     allFlights(_size: $size) {
//       data {
//         _id
//         location
//         maxVerticleHeightMeters
//         durationMin
//         totalDistanceTravelledKm
//         maxDistanceFromLaunchKm
//         gliderType
//       }
//     }
//   }
// `;



const Page = () => {
  // const { isAuthenticated } = useAuth0();


  return (
    <div>
      <div>Upload component goes here</div>
      <hr />
      <div>
    
      </div>
    </div>
  );
};

export default withAuthenticator(Page);
