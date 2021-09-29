/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLaunch = /* GraphQL */ `
  mutation CreateLaunch(
    $input: CreateLaunchInput!
    $condition: ModelLaunchConditionInput
  ) {
    createLaunch(input: $input, condition: $condition) {
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
export const updateLaunch = /* GraphQL */ `
  mutation UpdateLaunch(
    $input: UpdateLaunchInput!
    $condition: ModelLaunchConditionInput
  ) {
    updateLaunch(input: $input, condition: $condition) {
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
export const deleteLaunch = /* GraphQL */ `
  mutation DeleteLaunch(
    $input: DeleteLaunchInput!
    $condition: ModelLaunchConditionInput
  ) {
    deleteLaunch(input: $input, condition: $condition) {
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
export const createFlight = /* GraphQL */ `
  mutation CreateFlight(
    $input: CreateFlightInput!
    $condition: ModelFlightConditionInput
  ) {
    createFlight(input: $input, condition: $condition) {
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
export const updateFlight = /* GraphQL */ `
  mutation UpdateFlight(
    $input: UpdateFlightInput!
    $condition: ModelFlightConditionInput
  ) {
    updateFlight(input: $input, condition: $condition) {
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
export const deleteFlight = /* GraphQL */ `
  mutation DeleteFlight(
    $input: DeleteFlightInput!
    $condition: ModelFlightConditionInput
  ) {
    deleteFlight(input: $input, condition: $condition) {
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
