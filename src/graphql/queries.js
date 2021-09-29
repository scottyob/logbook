/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLaunch = /* GraphQL */ `
  query GetLaunch($id: ID!) {
    getLaunch(id: $id) {
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
export const listLaunchs = /* GraphQL */ `
  query ListLaunchs(
    $filter: ModelLaunchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLaunchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lat
        lon
        geohash
        description
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFlight = /* GraphQL */ `
  query GetFlight($id: ID!) {
    getFlight(id: $id) {
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
export const listFlights = /* GraphQL */ `
  query ListFlights(
    $filter: ModelFlightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFlights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const launchesByGeohash = /* GraphQL */ `
  query LaunchesByGeohash(
    $geohash: String
    $sortDirection: ModelSortDirection
    $filter: ModelLaunchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    launchesByGeohash(
      geohash: $geohash
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        lat
        lon
        geohash
        description
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const flightsByMd5 = /* GraphQL */ `
  query FlightsByMd5(
    $owner: String
    $md5: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFlightFilterInput
    $limit: Int
    $nextToken: String
  ) {
    flightsByMd5(
      owner: $owner
      md5: $md5
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
