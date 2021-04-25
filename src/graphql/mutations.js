// @flow
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
      description
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
      description
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
      description
      createdAt
      updatedAt
    }
  }
`;
