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
