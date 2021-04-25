// @flow
// this is an auto generated file. This will be overwritten

export const getLaunch = /* GraphQL */ `
  query GetLaunch($id: ID!) {
    getLaunch(id: $id) {
      id
      lat
      lon
      description
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
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
