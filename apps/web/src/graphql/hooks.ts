import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BaseEntity = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
};

export type Channel = BaseEntity & {
  __typename?: 'Channel';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  isUnread: Scalars['Boolean'];
  mentionCount: Scalars['NonNegativeInt'];
  name?: Maybe<Scalars['String']>;
  server: Server;
  type: ChannelType;
};

export enum ChannelType {
  Private = 'Private',
  Public = 'Public',
  Restricted = 'Restricted'
}

export type Comment = BaseEntity & {
  __typename?: 'Comment';
  author?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isPinned: Scalars['Boolean'];
  linkMetadatas: Array<LinkMetadata>;
  parentComment?: Maybe<Comment>;
  pinnedAt?: Maybe<Scalars['DateTime']>;
  post: Post;
  serverUser?: Maybe<ServerUser>;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voteCount: Scalars['Int'];
  voteType: VoteType;
};

export type CreateServerInput = {
  avatarFile?: InputMaybe<Scalars['Upload']>;
  bannerFile?: InputMaybe<Scalars['Upload']>;
  category?: InputMaybe<ServerCategory>;
  description?: InputMaybe<Scalars['String']>;
  displayName: Scalars['String'];
  name: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
};

export type Folder = BaseEntity & {
  __typename?: 'Folder';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  followerCount: Scalars['NonNegativeInt'];
  id: Scalars['ID'];
  isCollaborative: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
  name: Scalars['String'];
  owner?: Maybe<User>;
  postCount: Scalars['NonNegativeInt'];
  server?: Maybe<Server>;
  visibility: FolderVisibility;
};

export enum FolderVisibility {
  Friends = 'Friends',
  Private = 'Private',
  Public = 'Public',
  Unlisted = 'Unlisted'
}

export type Group = BaseEntity & {
  __typename?: 'Group';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  lastMessageAt: Scalars['DateTime'];
  name: Scalars['String'];
  owner: User;
  unreadCount: Scalars['NonNegativeInt'];
  users: Array<User>;
};

export type Image = {
  __typename?: 'Image';
  originalHeight: Scalars['PositiveInt'];
  originalUrl: Scalars['String'];
  originalWidth: Scalars['PositiveInt'];
  popupHeight: Scalars['PositiveInt'];
  popupUrl?: Maybe<Scalars['String']>;
  popupWidth: Scalars['PositiveInt'];
  smallHeight: Scalars['PositiveInt'];
  smallUrl?: Maybe<Scalars['String']>;
  smallWidth: Scalars['PositiveInt'];
};

export type LinkMetadata = {
  __typename?: 'LinkMetadata';
  author?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Image>;
  imageUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Image>;
  logoUrl?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  themeColor?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  twitterCard?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createServer: Server;
  deleteUser: Scalars['Boolean'];
  joinServer: Server;
  leaveServer: Server;
  updateAvatar: User;
  updateProfile: User;
  updateServer: Server;
};


export type MutationCreateServerArgs = {
  input: CreateServerInput;
};


export type MutationJoinServerArgs = {
  serverId: Scalars['String'];
};


export type MutationLeaveServerArgs = {
  serverId: Scalars['String'];
};


export type MutationUpdateAvatarArgs = {
  input: UpdateAvatarInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateServerArgs = {
  input: UpdateServerInput;
};

export enum OnlineStatus {
  Away = 'Away',
  DoNotDisturb = 'DoNotDisturb',
  Offline = 'Offline',
  Online = 'Online'
}

export type Post = BaseEntity & {
  __typename?: 'Post';
  author?: Maybe<User>;
  commentCount: Scalars['NonNegativeInt'];
  createdAt: Scalars['DateTime'];
  folders?: Maybe<Array<Folder>>;
  id: Scalars['ID'];
  images: Array<PostImage>;
  isDeleted: Scalars['Boolean'];
  isPinned: Scalars['Boolean'];
  linkMetadata?: Maybe<LinkMetadata>;
  linkMetadatas: Array<LinkMetadata>;
  linkUrl?: Maybe<Scalars['String']>;
  pinnedAt?: Maybe<Scalars['DateTime']>;
  server: Server;
  serverUser?: Maybe<ServerUser>;
  text?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voteCount: Scalars['Int'];
  voteType: VoteType;
};

export type PostImage = {
  __typename?: 'PostImage';
  caption?: Maybe<Scalars['String']>;
  image: Image;
  linkUrl?: Maybe<Scalars['String']>;
};

export enum PublicServersSort {
  New = 'New',
  Top = 'Top'
}

export type Query = {
  __typename?: 'Query';
  getLinkMetadata?: Maybe<LinkMetadata>;
  me?: Maybe<User>;
  publicServers: Array<Server>;
  server?: Maybe<Server>;
};


export type QueryGetLinkMetadataArgs = {
  linkUrl: Scalars['String'];
};


export type QueryPublicServersArgs = {
  category?: InputMaybe<ServerCategory>;
  sort?: InputMaybe<PublicServersSort>;
};


export type QueryServerArgs = {
  name: Scalars['String'];
};

export enum RelationshipStatus {
  Blocked = 'Blocked',
  Blocking = 'Blocking',
  FriendRequestIncoming = 'FriendRequestIncoming',
  FriendRequestOutgoing = 'FriendRequestOutgoing',
  Friends = 'Friends',
  None = 'None'
}

export type Role = BaseEntity & {
  __typename?: 'Role';
  color?: Maybe<Scalars['HexColorCode']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  name: Scalars['String'];
  permissions: Array<ServerPermission>;
};

export type Server = BaseEntity & {
  __typename?: 'Server';
  avatarUrl?: Maybe<Scalars['String']>;
  bannerUrl?: Maybe<Scalars['String']>;
  category: ServerCategory;
  channels: Array<Channel>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  folders: Array<Folder>;
  id: Scalars['ID'];
  isBanned: Scalars['Boolean'];
  isChatEnabled: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  isDownvotesEnabled: Scalars['Boolean'];
  isFeatured: Scalars['Boolean'];
  isJoined: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  onlineCount: Scalars['NonNegativeInt'];
  owner: User;
  permissions: Array<ServerPermission>;
  roles: Array<Role>;
  userCount: Scalars['NonNegativeInt'];
};

export enum ServerCategory {
  Arts = 'Arts',
  Business = 'Business',
  Culture = 'Culture',
  Discussion = 'Discussion',
  Entertainment = 'Entertainment',
  Gaming = 'Gaming',
  Health = 'Health',
  Hobbies = 'Hobbies',
  Lifestyle = 'Lifestyle',
  Memes = 'Memes',
  Meta = 'Meta',
  News = 'News',
  Other = 'Other',
  Politics = 'Politics',
  Programming = 'Programming',
  Science = 'Science',
  Sports = 'Sports',
  Technology = 'Technology'
}

export enum ServerPermission {
  AddPostToFolder = 'AddPostToFolder',
  Admin = 'Admin',
  DisplayRoleSeparately = 'DisplayRoleSeparately',
  ManageChannels = 'ManageChannels',
  ManageComments = 'ManageComments',
  ManageFolders = 'ManageFolders',
  ManageMessages = 'ManageMessages',
  ManagePosts = 'ManagePosts',
  ManageServer = 'ManageServer',
  ManageUsers = 'ManageUsers',
  PrivateChannels = 'PrivateChannels',
  RestrictedChannels = 'RestrictedChannels',
  SendMessages = 'SendMessages'
}

export type ServerUser = {
  __typename?: 'ServerUser';
  role: Role;
  user: User;
};

export type UpdateAvatarInput = {
  avatarFile: Scalars['Upload'];
};

export type UpdateProfileInput = {
  name: Scalars['String'];
};

export type UpdateServerInput = {
  avatarFile?: InputMaybe<Scalars['Upload']>;
  bannerFile?: InputMaybe<Scalars['Upload']>;
  category?: InputMaybe<ServerCategory>;
  description?: InputMaybe<Scalars['String']>;
  displayName: Scalars['String'];
  serverId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['EmailAddress'];
  folders: Array<Folder>;
  groups: Array<Group>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  isAdmin: Scalars['Boolean'];
  isCurrentUser: Scalars['Boolean'];
  isOg: Scalars['Boolean'];
  isOnline: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  lastMessageAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  onlineStatus: OnlineStatus;
  relatedUsers: Array<User>;
  relationshipStatus: RelationshipStatus;
  servers: Array<Server>;
  showChat: Scalars['Boolean'];
  unreadCount: Scalars['NonNegativeInt'];
};

export enum VoteType {
  Down = 'Down',
  None = 'None',
  Up = 'Up'
}

export type ImageFragment = { __typename?: 'Image', originalUrl: string, popupUrl?: string | null, popupWidth: any, popupHeight: any, smallUrl?: string | null, smallWidth: any, smallHeight: any };

export type MetadataFragment = { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, popupUrl?: string | null, popupWidth: any, popupHeight: any, smallUrl?: string | null, smallWidth: any, smallHeight: any } | null };

export type GetLinkMetadataQueryVariables = Exact<{
  linkUrl: Scalars['String'];
}>;


export type GetLinkMetadataQuery = { __typename?: 'Query', getLinkMetadata?: { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, popupUrl?: string | null, popupWidth: any, popupHeight: any, smallUrl?: string | null, smallWidth: any, smallHeight: any } | null } | null };

export type ServerFragment = { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerInput;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } };

export type UpdateServerMutationVariables = Exact<{
  input: UpdateServerInput;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', updateServer: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } };

export type JoinServerMutationVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type JoinServerMutation = { __typename?: 'Mutation', joinServer: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } };

export type LeaveServerMutationVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type LeaveServerMutation = { __typename?: 'Mutation', leaveServer: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } };

export type ServerQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ServerQuery = { __typename?: 'Query', server?: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } | null };

export type PublicServersQueryVariables = Exact<{
  sort?: InputMaybe<PublicServersSort>;
  category?: InputMaybe<ServerCategory>;
}>;


export type PublicServersQuery = { __typename?: 'Query', publicServers: Array<{ __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, avatarUrl?: string | null, bannerUrl?: string | null, userCount: any, category: ServerCategory }> };

export type UserFragment = { __typename?: 'User', id: string, email: any, name: string, image?: string | null };

export type CurrentUserFragment = { __typename?: 'User', id: string, email: any, name: string, image?: string | null, servers: Array<{ __typename?: 'Server', id: string, name: string, displayName: string, avatarUrl?: string | null, owner: { __typename?: 'User', id: string } }> };

export type UpdateAvatarMutationVariables = Exact<{
  input: UpdateAvatarInput;
}>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateAvatar: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } };

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null, servers: Array<{ __typename?: 'Server', id: string, name: string, displayName: string, avatarUrl?: string | null, owner: { __typename?: 'User', id: string } }> } | null };

export const ImageFragmentDoc = gql`
    fragment Image on Image {
  originalUrl
  popupUrl
  popupWidth
  popupHeight
  smallUrl
  smallWidth
  smallHeight
}
    `;
export const MetadataFragmentDoc = gql`
    fragment Metadata on LinkMetadata {
  author
  date
  description
  image {
    ...Image
  }
  publisher
  title
  twitterCard
  url
  themeColor
}
    ${ImageFragmentDoc}`;
export const ServerFragmentDoc = gql`
    fragment Server on Server {
  id
  name
  displayName
  description
  category
  bannerUrl
  avatarUrl
  userCount
  owner {
    id
  }
  isJoined
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  name
  image
}
    `;
export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on User {
  ...User
  servers {
    id
    name
    displayName
    avatarUrl
    owner {
      id
    }
  }
}
    ${UserFragmentDoc}`;
export const GetLinkMetadataDocument = gql`
    query getLinkMetadata($linkUrl: String!) {
  getLinkMetadata(linkUrl: $linkUrl) {
    ...Metadata
  }
}
    ${MetadataFragmentDoc}`;

/**
 * __useGetLinkMetadataQuery__
 *
 * To run a query within a React component, call `useGetLinkMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkMetadataQuery({
 *   variables: {
 *      linkUrl: // value for 'linkUrl'
 *   },
 * });
 */
export function useGetLinkMetadataQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLinkMetadataQuery, GetLinkMetadataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLinkMetadataQuery, GetLinkMetadataQueryVariables>(GetLinkMetadataDocument, options);
      }
export function useGetLinkMetadataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLinkMetadataQuery, GetLinkMetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLinkMetadataQuery, GetLinkMetadataQueryVariables>(GetLinkMetadataDocument, options);
        }
export type GetLinkMetadataQueryHookResult = ReturnType<typeof useGetLinkMetadataQuery>;
export type GetLinkMetadataLazyQueryHookResult = ReturnType<typeof useGetLinkMetadataLazyQuery>;
export type GetLinkMetadataQueryResult = Apollo.QueryResult<GetLinkMetadataQuery, GetLinkMetadataQueryVariables>;
export const CreateServerDocument = gql`
    mutation CreateServer($input: CreateServerInput!) {
  createServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type CreateServerMutationFn = Apollo.MutationFunction<CreateServerMutation, CreateServerMutationVariables>;

/**
 * __useCreateServerMutation__
 *
 * To run a mutation, you first call `useCreateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerMutation, { data, loading, error }] = useCreateServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateServerMutation, CreateServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument, options);
      }
export type CreateServerMutationHookResult = ReturnType<typeof useCreateServerMutation>;
export type CreateServerMutationResult = Apollo.MutationResult<CreateServerMutation>;
export type CreateServerMutationOptions = Apollo.BaseMutationOptions<CreateServerMutation, CreateServerMutationVariables>;
export const UpdateServerDocument = gql`
    mutation UpdateServer($input: UpdateServerInput!) {
  updateServer(input: $input) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type UpdateServerMutationFn = Apollo.MutationFunction<UpdateServerMutation, UpdateServerMutationVariables>;

/**
 * __useUpdateServerMutation__
 *
 * To run a mutation, you first call `useUpdateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServerMutation, { data, loading, error }] = useUpdateServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateServerMutation, UpdateServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateServerMutation, UpdateServerMutationVariables>(UpdateServerDocument, options);
      }
export type UpdateServerMutationHookResult = ReturnType<typeof useUpdateServerMutation>;
export type UpdateServerMutationResult = Apollo.MutationResult<UpdateServerMutation>;
export type UpdateServerMutationOptions = Apollo.BaseMutationOptions<UpdateServerMutation, UpdateServerMutationVariables>;
export const JoinServerDocument = gql`
    mutation JoinServer($serverId: String!) {
  joinServer(serverId: $serverId) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type JoinServerMutationFn = Apollo.MutationFunction<JoinServerMutation, JoinServerMutationVariables>;

/**
 * __useJoinServerMutation__
 *
 * To run a mutation, you first call `useJoinServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinServerMutation, { data, loading, error }] = useJoinServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useJoinServerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinServerMutation, JoinServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<JoinServerMutation, JoinServerMutationVariables>(JoinServerDocument, options);
      }
export type JoinServerMutationHookResult = ReturnType<typeof useJoinServerMutation>;
export type JoinServerMutationResult = Apollo.MutationResult<JoinServerMutation>;
export type JoinServerMutationOptions = Apollo.BaseMutationOptions<JoinServerMutation, JoinServerMutationVariables>;
export const LeaveServerDocument = gql`
    mutation LeaveServer($serverId: String!) {
  leaveServer(serverId: $serverId) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;
export type LeaveServerMutationFn = Apollo.MutationFunction<LeaveServerMutation, LeaveServerMutationVariables>;

/**
 * __useLeaveServerMutation__
 *
 * To run a mutation, you first call `useLeaveServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveServerMutation, { data, loading, error }] = useLeaveServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useLeaveServerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveServerMutation, LeaveServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LeaveServerMutation, LeaveServerMutationVariables>(LeaveServerDocument, options);
      }
export type LeaveServerMutationHookResult = ReturnType<typeof useLeaveServerMutation>;
export type LeaveServerMutationResult = Apollo.MutationResult<LeaveServerMutation>;
export type LeaveServerMutationOptions = Apollo.BaseMutationOptions<LeaveServerMutation, LeaveServerMutationVariables>;
export const ServerDocument = gql`
    query server($name: String!) {
  server(name: $name) {
    ...Server
  }
}
    ${ServerFragmentDoc}`;

/**
 * __useServerQuery__
 *
 * To run a query within a React component, call `useServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useServerQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ServerQuery, ServerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
      }
export function useServerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServerQuery, ServerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
        }
export type ServerQueryHookResult = ReturnType<typeof useServerQuery>;
export type ServerLazyQueryHookResult = ReturnType<typeof useServerLazyQuery>;
export type ServerQueryResult = Apollo.QueryResult<ServerQuery, ServerQueryVariables>;
export const PublicServersDocument = gql`
    query publicServers($sort: PublicServersSort, $category: ServerCategory) {
  publicServers(sort: $sort, category: $category) {
    id
    name
    displayName
    description
    avatarUrl
    bannerUrl
    userCount
    category
  }
}
    `;

/**
 * __usePublicServersQuery__
 *
 * To run a query within a React component, call `usePublicServersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicServersQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      category: // value for 'category'
 *   },
 * });
 */
export function usePublicServersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicServersQuery, PublicServersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicServersQuery, PublicServersQueryVariables>(PublicServersDocument, options);
      }
export function usePublicServersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicServersQuery, PublicServersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicServersQuery, PublicServersQueryVariables>(PublicServersDocument, options);
        }
export type PublicServersQueryHookResult = ReturnType<typeof usePublicServersQuery>;
export type PublicServersLazyQueryHookResult = ReturnType<typeof usePublicServersLazyQuery>;
export type PublicServersQueryResult = Apollo.QueryResult<PublicServersQuery, PublicServersQueryVariables>;
export const UpdateAvatarDocument = gql`
    mutation updateAvatar($input: UpdateAvatarInput!) {
  updateAvatar(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, options);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation deleteAccount {
  deleteUser
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;