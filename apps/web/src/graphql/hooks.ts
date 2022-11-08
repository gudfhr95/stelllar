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
};

export type BaseEntity = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
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

export enum Color {
  Blue = 'Blue',
  Green = 'Green',
  Indigo = 'Indigo',
  Pink = 'Pink',
  Purple = 'Purple',
  Red = 'Red',
  Yellow = 'Yellow'
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
  popupUrl?: Maybe<Scalars['String']>;
  smallUrl?: Maybe<Scalars['String']>;
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

export type LoginInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  login: User;
  logout: Scalars['Boolean'];
  refresh: Scalars['Boolean'];
  register: User;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
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

export type Query = {
  __typename?: 'Query';
  test?: Maybe<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
  username: Scalars['String'];
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

export type User = BaseEntity & {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  color: Color;
  createdAt: Scalars['DateTime'];
  email: Scalars['EmailAddress'];
  folders: Array<Folder>;
  groups: Array<Group>;
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  isCurrentUser: Scalars['Boolean'];
  isOg: Scalars['Boolean'];
  isOnline: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  lastMessageAt?: Maybe<Scalars['DateTime']>;
  onlineStatus: OnlineStatus;
  relatedUsers: Array<User>;
  relationshipStatus: RelationshipStatus;
  servers: Array<Server>;
  showChat: Scalars['Boolean'];
  unreadCount: Scalars['NonNegativeInt'];
  username: Scalars['String'];
};

export enum VoteType {
  Down = 'Down',
  None = 'None',
  Up = 'Up'
}

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string } };

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', test?: string | null };


export const RegisterDocument = gql`
    mutation register($input: RegisterInput!) {
  register(input: $input) {
    id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TestDocument = gql`
    query test {
  test
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TestQuery, TestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
      }
export function useTestLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
        }
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;