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
  name: Scalars['String'];
  server: Server;
};

export type Comment = BaseEntity & {
  __typename?: 'Comment';
  author?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  parentComment?: Maybe<Comment>;
  post: Post;
  serverUser?: Maybe<ServerUser>;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voteCount: Scalars['Int'];
  voteType: VoteType;
};

export type CommentVoteInput = {
  commentId: Scalars['ID'];
  type: VoteType;
};

export enum CommentsSort {
  New = 'New',
  Top = 'Top'
}

export type CreateChannelInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  serverId: Scalars['ID'];
};

export type CreateCommentInput = {
  parentCommentId?: InputMaybe<Scalars['ID']>;
  postId: Scalars['ID'];
  text: Scalars['String'];
};

export type CreatePostInput = {
  images?: InputMaybe<Array<PostImageInput>>;
  linkUrl?: InputMaybe<Scalars['String']>;
  serverId: Scalars['ID'];
  text?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateServerInput = {
  avatarFile?: InputMaybe<Scalars['Upload']>;
  bannerFile?: InputMaybe<Scalars['Upload']>;
  category?: InputMaybe<ServerCategory>;
  description?: InputMaybe<Scalars['String']>;
  displayName: Scalars['String'];
  name: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  originalHeight: Scalars['PositiveInt'];
  originalUrl: Scalars['String'];
  originalWidth: Scalars['PositiveInt'];
  popupHeight?: Maybe<Scalars['PositiveInt']>;
  popupUrl?: Maybe<Scalars['String']>;
  popupWidth?: Maybe<Scalars['PositiveInt']>;
  smallHeight?: Maybe<Scalars['PositiveInt']>;
  smallUrl?: Maybe<Scalars['String']>;
  smallWidth?: Maybe<Scalars['PositiveInt']>;
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
  commentVote: Comment;
  createChannel: Channel;
  createComment: Comment;
  createPost: Post;
  createServer: Server;
  deleteComment: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  joinServer: Server;
  leaveServer: Server;
  postVote: Post;
  updateAvatar: User;
  updateChannel: Channel;
  updateComment: Comment;
  updatePost: Post;
  updateProfile: User;
  updateServer: Server;
};


export type MutationCommentVoteArgs = {
  input: CommentVoteInput;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateServerArgs = {
  input: CreateServerInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationJoinServerArgs = {
  serverId: Scalars['String'];
};


export type MutationLeaveServerArgs = {
  serverId: Scalars['String'];
};


export type MutationPostVoteArgs = {
  input: PostVoteInput;
};


export type MutationUpdateAvatarArgs = {
  input: UpdateAvatarInput;
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateServerArgs = {
  input: UpdateServerInput;
};

export type Post = BaseEntity & {
  __typename?: 'Post';
  author?: Maybe<User>;
  commentCount: Scalars['NonNegativeInt'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  images: Array<PostImage>;
  isDeleted: Scalars['Boolean'];
  linkMetadata?: Maybe<LinkMetadata>;
  linkUrl?: Maybe<Scalars['String']>;
  server: Server;
  text?: Maybe<Scalars['String']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  voteCount: Scalars['Int'];
  voteType: VoteType;
};

export type PostImage = {
  __typename?: 'PostImage';
  image: Image;
};

export type PostImageInput = {
  file: Scalars['Upload'];
};

export type PostVoteInput = {
  postId: Scalars['ID'];
  type: VoteType;
};

export enum PostsFeed {
  All = 'All',
  Featured = 'Featured',
  Joined = 'Joined'
}

export enum PostsSort {
  Added = 'Added',
  Hot = 'Hot',
  New = 'New',
  Top = 'Top'
}

export enum PostsTime {
  All = 'All',
  Day = 'Day',
  Hour = 'Hour',
  Month = 'Month',
  Week = 'Week',
  Year = 'Year'
}

export enum PublicServersSort {
  New = 'New',
  Top = 'Top'
}

export type Query = {
  __typename?: 'Query';
  allPosts: Array<Post>;
  comments: Array<Comment>;
  getLinkMetadata?: Maybe<LinkMetadata>;
  me?: Maybe<User>;
  post: Post;
  posts: Array<Post>;
  publicServers: Array<Server>;
  server?: Maybe<Server>;
};


export type QueryCommentsArgs = {
  postId?: InputMaybe<Scalars['ID']>;
  sort?: InputMaybe<CommentsSort>;
};


export type QueryGetLinkMetadataArgs = {
  linkUrl: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  feed?: InputMaybe<PostsFeed>;
  folderId?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  offset?: InputMaybe<Scalars['NonNegativeInt']>;
  search?: InputMaybe<Scalars['String']>;
  serverName?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<PostsSort>;
  time?: InputMaybe<PostsTime>;
};


export type QueryPublicServersArgs = {
  category?: InputMaybe<ServerCategory>;
  sort?: InputMaybe<PublicServersSort>;
};


export type QueryServerArgs = {
  name: Scalars['String'];
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
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isJoined: Scalars['Boolean'];
  name: Scalars['String'];
  owner: User;
  postCount: Scalars['NonNegativeInt'];
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

export type ServerUser = {
  __typename?: 'ServerUser';
  user: User;
};

export type UpdateAvatarInput = {
  avatarFile: Scalars['Upload'];
};

export type UpdateChannelInput = {
  channelId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UpdateCommentInput = {
  commentId: Scalars['ID'];
  text: Scalars['String'];
};

export type UpdatePostInput = {
  images?: InputMaybe<Array<PostImageInput>>;
  linkUrl?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
  text?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
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
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  isAdmin: Scalars['Boolean'];
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  servers: Array<Server>;
};

export enum VoteType {
  Down = 'Down',
  None = 'None',
  Up = 'Up'
}

export type ChannelFragment = { __typename?: 'Channel', id: string, name: string, description?: string | null };

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'Channel', id: string, name: string, description?: string | null } };

export type UpdateChannelMutationVariables = Exact<{
  input: UpdateChannelInput;
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', updateChannel: { __typename?: 'Channel', id: string, name: string, description?: string | null } };

export type CommentFragment = { __typename?: 'Comment', id: string, text: string, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, parentComment?: { __typename?: 'Comment', id: string } | null };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, parentComment?: { __typename?: 'Comment', id: string } | null } };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string, text: string, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, parentComment?: { __typename?: 'Comment', id: string } | null } };

export type DeleteCommentMutationVariables = Exact<{
  input: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type CommentVoteMutationVariables = Exact<{
  input: CommentVoteInput;
}>;


export type CommentVoteMutation = { __typename?: 'Mutation', commentVote: { __typename?: 'Comment', id: string, text: string, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, parentComment?: { __typename?: 'Comment', id: string } | null } };

export type CommentsQueryVariables = Exact<{
  postId: Scalars['ID'];
  sort?: InputMaybe<CommentsSort>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, text: string, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, parentComment?: { __typename?: 'Comment', id: string } | null }> };

export type PostFragment = { __typename?: 'Post', id: string, title: string, text?: string | null, linkUrl?: string | null, thumbnailUrl?: string | null, commentCount: any, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, linkMetadata?: { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } | null } | null, images: Array<{ __typename?: 'PostImage', image: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } }> };

export type MetadataFragment = { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } | null };

export type ImageFragment = { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, title: string, text?: string | null, linkUrl?: string | null, thumbnailUrl?: string | null, commentCount: any, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, linkMetadata?: { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } | null } | null, images: Array<{ __typename?: 'PostImage', image: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } }> } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, title: string, text?: string | null, linkUrl?: string | null, thumbnailUrl?: string | null, commentCount: any, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, linkMetadata?: { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } | null } | null, images: Array<{ __typename?: 'PostImage', image: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } }> } };

export type DeletePostMutationVariables = Exact<{
  input: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type PostVoteMutationVariables = Exact<{
  input: PostVoteInput;
}>;


export type PostVoteMutation = { __typename?: 'Mutation', postVote: { __typename?: 'Post', id: string, title: string, text?: string | null, linkUrl?: string | null, thumbnailUrl?: string | null, commentCount: any, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, linkMetadata?: { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } | null } | null, images: Array<{ __typename?: 'PostImage', image: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } }> } };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, title: string, text?: string | null, linkUrl?: string | null, thumbnailUrl?: string | null, commentCount: any, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, server: { __typename?: 'Server', id: string, name: string, avatarUrl?: string | null, displayName: string }, linkMetadata?: { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } | null } | null, images: Array<{ __typename?: 'PostImage', image: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } }> } };

export type PostsQueryVariables = Exact<{
  sort?: InputMaybe<PostsSort>;
  offset?: InputMaybe<Scalars['NonNegativeInt']>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
  time?: InputMaybe<PostsTime>;
  folderId?: InputMaybe<Scalars['ID']>;
  serverName?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  feed?: InputMaybe<PostsFeed>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, text?: string | null, linkUrl?: string | null, thumbnailUrl?: string | null, commentCount: any, voteCount: number, voteType: VoteType, isDeleted: boolean, createdAt: any, updatedAt?: any | null, author?: { __typename?: 'User', id: string, email: any, name: string, image?: string | null } | null, server: { __typename?: 'Server', id: string, name: string, avatarUrl?: string | null, displayName: string }, linkMetadata?: { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } | null } | null, images: Array<{ __typename?: 'PostImage', image: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } }> }> };

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'Post', id: string, server: { __typename?: 'Server', name: string } }> };

export type GetLinkMetadataQueryVariables = Exact<{
  linkUrl: Scalars['String'];
}>;


export type GetLinkMetadataQuery = { __typename?: 'Query', getLinkMetadata?: { __typename?: 'LinkMetadata', author?: string | null, date?: any | null, description?: string | null, publisher?: string | null, title?: string | null, twitterCard?: string | null, url?: string | null, themeColor?: string | null, image?: { __typename?: 'Image', originalUrl: string, originalWidth: any, originalHeight: any, popupUrl?: string | null, popupWidth?: any | null, popupHeight?: any | null, smallUrl?: string | null, smallWidth?: any | null, smallHeight?: any | null } | null } | null };

export type ServerFragment = { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, postCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerInput;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, postCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } };

export type UpdateServerMutationVariables = Exact<{
  input: UpdateServerInput;
}>;


export type UpdateServerMutation = { __typename?: 'Mutation', updateServer: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, postCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } };

export type JoinServerMutationVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type JoinServerMutation = { __typename?: 'Mutation', joinServer: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, postCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } };

export type LeaveServerMutationVariables = Exact<{
  serverId: Scalars['String'];
}>;


export type LeaveServerMutation = { __typename?: 'Mutation', leaveServer: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, postCount: any, isJoined: boolean, owner: { __typename?: 'User', id: string } } };

export type ServerQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ServerQuery = { __typename?: 'Query', server?: { __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, category: ServerCategory, bannerUrl?: string | null, avatarUrl?: string | null, userCount: any, postCount: any, isJoined: boolean, channels: Array<{ __typename?: 'Channel', id: string, name: string, description?: string | null }>, owner: { __typename?: 'User', id: string } } | null };

export type PublicServersQueryVariables = Exact<{
  sort?: InputMaybe<PublicServersSort>;
  category?: InputMaybe<ServerCategory>;
}>;


export type PublicServersQuery = { __typename?: 'Query', publicServers: Array<{ __typename?: 'Server', id: string, name: string, displayName: string, description?: string | null, avatarUrl?: string | null, bannerUrl?: string | null, userCount: any, postCount: any, category: ServerCategory }> };

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

export const ChannelFragmentDoc = gql`
    fragment Channel on Channel {
  id
  name
  description
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  id
  parentComment {
    id
  }
  text
  voteCount
  voteType
  isDeleted
  createdAt
  updatedAt
}
    `;
export const ImageFragmentDoc = gql`
    fragment Image on Image {
  originalUrl
  originalWidth
  originalHeight
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
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  title
  text
  linkUrl
  linkMetadata {
    ...Metadata
  }
  thumbnailUrl
  images {
    image {
      ...Image
    }
  }
  commentCount
  voteCount
  voteType
  isDeleted
  createdAt
  updatedAt
}
    ${MetadataFragmentDoc}
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
  postCount
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
export const CreateChannelDocument = gql`
    mutation createChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const UpdateChannelDocument = gql`
    mutation updateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
    ...Channel
  }
}
    ${ChannelFragmentDoc}`;
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;

/**
 * __useUpdateChannelMutation__
 *
 * To run a mutation, you first call `useUpdateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelMutation, { data, loading, error }] = useUpdateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChannelMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, options);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export type UpdateChannelMutationResult = Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...Comment
    author {
      ...User
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation updateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    ...Comment
    author {
      ...User
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($input: String!) {
  deleteComment(id: $input)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const CommentVoteDocument = gql`
    mutation commentVote($input: CommentVoteInput!) {
  commentVote(input: $input) {
    ...Comment
    author {
      ...User
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}`;
export type CommentVoteMutationFn = Apollo.MutationFunction<CommentVoteMutation, CommentVoteMutationVariables>;

/**
 * __useCommentVoteMutation__
 *
 * To run a mutation, you first call `useCommentVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentVoteMutation, { data, loading, error }] = useCommentVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommentVoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CommentVoteMutation, CommentVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CommentVoteMutation, CommentVoteMutationVariables>(CommentVoteDocument, options);
      }
export type CommentVoteMutationHookResult = ReturnType<typeof useCommentVoteMutation>;
export type CommentVoteMutationResult = Apollo.MutationResult<CommentVoteMutation>;
export type CommentVoteMutationOptions = Apollo.BaseMutationOptions<CommentVoteMutation, CommentVoteMutationVariables>;
export const CommentsDocument = gql`
    query comments($postId: ID!, $sort: CommentsSort) {
  comments(postId: $postId, sort: $sort) {
    ...Comment
    author {
      ...User
    }
  }
}
    ${CommentFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($input: CreatePostInput!) {
  createPost(input: $input) {
    ...Post
    author {
      ...User
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    ...Post
    author {
      ...User
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($input: String!) {
  deletePost(id: $input)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const PostVoteDocument = gql`
    mutation postVote($input: PostVoteInput!) {
  postVote(input: $input) {
    ...Post
    author {
      ...User
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}`;
export type PostVoteMutationFn = Apollo.MutationFunction<PostVoteMutation, PostVoteMutationVariables>;

/**
 * __usePostVoteMutation__
 *
 * To run a mutation, you first call `usePostVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postVoteMutation, { data, loading, error }] = usePostVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostVoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PostVoteMutation, PostVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<PostVoteMutation, PostVoteMutationVariables>(PostVoteDocument, options);
      }
export type PostVoteMutationHookResult = ReturnType<typeof usePostVoteMutation>;
export type PostVoteMutationResult = Apollo.MutationResult<PostVoteMutation>;
export type PostVoteMutationOptions = Apollo.BaseMutationOptions<PostVoteMutation, PostVoteMutationVariables>;
export const PostDocument = gql`
    query post($id: String!) {
  post(id: $id) {
    ...Post
    author {
      ...User
    }
    server {
      id
      name
      avatarUrl
      displayName
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: ApolloReactHooks.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query posts($sort: PostsSort, $offset: NonNegativeInt, $limit: PositiveInt, $time: PostsTime, $folderId: ID, $serverName: String, $search: String, $feed: PostsFeed) {
  posts(
    sort: $sort
    time: $time
    folderId: $folderId
    serverName: $serverName
    search: $search
    offset: $offset
    limit: $limit
    feed: $feed
  ) {
    ...Post
    author {
      ...User
    }
    server {
      id
      name
      avatarUrl
      displayName
    }
  }
}
    ${PostFragmentDoc}
${UserFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      time: // value for 'time'
 *      folderId: // value for 'folderId'
 *      serverName: // value for 'serverName'
 *      search: // value for 'search'
 *      feed: // value for 'feed'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const AllPostsDocument = gql`
    query allPosts {
  allPosts {
    id
    server {
      name
    }
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
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
    channels {
      ...Channel
    }
  }
}
    ${ServerFragmentDoc}
${ChannelFragmentDoc}`;

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
    postCount
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