/* @flow */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLaunchInput = {|
  id: string,
  lat: number,
  lon: number,
  description?: ?string,
|};

export type ModelLaunchConditionInput = {|
  lat?: ?ModelFloatInput,
  lon?: ?ModelFloatInput,
  description?: ?ModelStringInput,
  and?: ?Array< ?ModelLaunchConditionInput >,
  or?: ?Array< ?ModelLaunchConditionInput >,
  not?: ?ModelLaunchConditionInput,
|};

export type ModelFloatInput = {|
  ne?: ?number,
  eq?: ?number,
  le?: ?number,
  lt?: ?number,
  ge?: ?number,
  gt?: ?number,
  between?: ?Array< ?number >,
  attributeExists?: ?boolean,
  attributeType?: ?ModelAttributeTypes,
|};

export type ModelAttributeTypes =
  "binary" |
  "binarySet" |
  "bool" |
  "list" |
  "map" |
  "number" |
  "numberSet" |
  "string" |
  "stringSet" |
  "_null";


export type ModelStringInput = {|
  ne?: ?string,
  eq?: ?string,
  le?: ?string,
  lt?: ?string,
  ge?: ?string,
  gt?: ?string,
  contains?: ?string,
  notContains?: ?string,
  between?: ?Array< ?string >,
  beginsWith?: ?string,
  attributeExists?: ?boolean,
  attributeType?: ?ModelAttributeTypes,
  size?: ?ModelSizeInput,
|};

export type ModelSizeInput = {|
  ne?: ?number,
  eq?: ?number,
  le?: ?number,
  lt?: ?number,
  ge?: ?number,
  gt?: ?number,
  between?: ?Array< ?number >,
|};

export type UpdateLaunchInput = {|
  id: string,
  lat?: ?number,
  lon?: ?number,
  description?: ?string,
|};

export type DeleteLaunchInput = {|
  id?: ?string,
|};

export type ModelLaunchFilterInput = {|
  id?: ?ModelStringInput,
  lat?: ?ModelFloatInput,
  lon?: ?ModelFloatInput,
  description?: ?ModelStringInput,
  and?: ?Array< ?ModelLaunchFilterInput >,
  or?: ?Array< ?ModelLaunchFilterInput >,
  not?: ?ModelLaunchFilterInput,
|};

export type CreateLaunchMutationVariables = {|
  input: CreateLaunchInput,
  condition?: ?ModelLaunchConditionInput,
|};

export type CreateLaunchMutation = {|
  createLaunch: ? {|
    __typename: "Launch",
    id: string,
    lat: number,
    lon: number,
    description: ?string,
    createdAt: any,
    updatedAt: any,
  |},
|};

export type UpdateLaunchMutationVariables = {|
  input: UpdateLaunchInput,
  condition?: ?ModelLaunchConditionInput,
|};

export type UpdateLaunchMutation = {|
  updateLaunch: ? {|
    __typename: "Launch",
    id: string,
    lat: number,
    lon: number,
    description: ?string,
    createdAt: any,
    updatedAt: any,
  |},
|};

export type DeleteLaunchMutationVariables = {|
  input: DeleteLaunchInput,
  condition?: ?ModelLaunchConditionInput,
|};

export type DeleteLaunchMutation = {|
  deleteLaunch: ? {|
    __typename: "Launch",
    id: string,
    lat: number,
    lon: number,
    description: ?string,
    createdAt: any,
    updatedAt: any,
  |},
|};

export type GetLaunchQueryVariables = {|
  id: string,
|};

export type GetLaunchQuery = {|
  getLaunch: ? {|
    __typename: "Launch",
    id: string,
    lat: number,
    lon: number,
    description: ?string,
    createdAt: any,
    updatedAt: any,
  |},
|};

export type ListLaunchsQueryVariables = {|
  filter?: ?ModelLaunchFilterInput,
  limit?: ?number,
  nextToken?: ?string,
|};

export type ListLaunchsQuery = {|
  listLaunchs: ? {|
    __typename: "ModelLaunchConnection",
    items: ? Array<? {|
      __typename: string,
      id: string,
      lat: number,
      lon: number,
      description: ?string,
      createdAt: any,
      updatedAt: any,
    |} >,
    nextToken: ?string,
  |},
|};

export type OnCreateLaunchSubscription = {|
  onCreateLaunch: ? {|
    __typename: "Launch",
    id: string,
    lat: number,
    lon: number,
    description: ?string,
    createdAt: any,
    updatedAt: any,
  |},
|};

export type OnUpdateLaunchSubscription = {|
  onUpdateLaunch: ? {|
    __typename: "Launch",
    id: string,
    lat: number,
    lon: number,
    description: ?string,
    createdAt: any,
    updatedAt: any,
  |},
|};

export type OnDeleteLaunchSubscription = {|
  onDeleteLaunch: ? {|
    __typename: "Launch",
    id: string,
    lat: number,
    lon: number,
    description: ?string,
    createdAt: any,
    updatedAt: any,
  |},
|};