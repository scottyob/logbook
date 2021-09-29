/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLaunch = /* GraphQL */ `
  subscription OnCreateLaunch {
    onCreateLaunch {
      id
      lat
      lon
      geohash
      description
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLaunch = /* GraphQL */ `
  subscription OnUpdateLaunch {
    onUpdateLaunch {
      id
      lat
      lon
      geohash
      description
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLaunch = /* GraphQL */ `
  subscription OnDeleteLaunch {
    onDeleteLaunch {
      id
      lat
      lon
      geohash
      description
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFlight = /* GraphQL */ `
  subscription OnCreateFlight($owner: String!) {
    onCreateFlight(owner: $owner) {
      id
      start
      locationName
      location {
        id
        lat
        lon
        geohash
        description
        type
        createdAt
        updatedAt
      }
      vertical
      duration
      windDirectionSpeed
      totalDistance
      maxDistance
      glider
      filename
      igc
      md5
      comments
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFlight = /* GraphQL */ `
  subscription OnUpdateFlight($owner: String!) {
    onUpdateFlight(owner: $owner) {
      id
      start
      locationName
      location {
        id
        lat
        lon
        geohash
        description
        type
        createdAt
        updatedAt
      }
      vertical
      duration
      windDirectionSpeed
      totalDistance
      maxDistance
      glider
      filename
      igc
      md5
      comments
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFlight = /* GraphQL */ `
  subscription OnDeleteFlight($owner: String!) {
    onDeleteFlight(owner: $owner) {
      id
      start
      locationName
      location {
        id
        lat
        lon
        geohash
        description
        type
        createdAt
        updatedAt
      }
      vertical
      duration
      windDirectionSpeed
      totalDistance
      maxDistance
      glider
      filename
      igc
      md5
      comments
      owner
      createdAt
      updatedAt
    }
  }
`;
