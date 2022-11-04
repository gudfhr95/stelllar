import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  Property,
  QueryOrder,
} from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base.entity';
import { GraphQLEmailAddress, GraphQLNonNegativeInt } from 'graphql-scalars';
import { GraphQLBoolean } from 'graphql/type';
import { OnlineStatus } from './online-status.enum';
import { Relationship } from './relationship.entity';
import { RelationshipStatus } from './relationship-status.enum';
import { Color } from '../../common/entity/color.enum';
import { randomEnum } from '../../common/util/random-enum';
import { UserFolder } from '../../folder/entity/user-folder.entity';
import { ServerUser } from '../../server/entity/server-user.entity';
import { GroupUser } from '../../group/entity/group-user.entity';
import { Group } from '../../group/entity/group.entity';
import { Folder } from '../../folder/entity/folder.entity';
import { Server } from '../../server/entity/server.entity';

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field(() => GraphQLEmailAddress)
  @Property({ columnType: 'text', unique: true })
  email: string;

  @Field()
  @Property({ columnType: 'text', unique: true })
  username: string;

  @Property({ nullable: true })
  currentHashedRefreshToken?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastLoginAt?: Date;

  @Field({ nullable: true })
  lastMessageAt?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  avatarUrl?: string;

  @Field(() => OnlineStatus)
  @Enum({ items: () => OnlineStatus })
  onlineStatus: OnlineStatus = OnlineStatus.Online;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: 'boolean' })
  isAdmin = false;

  @Field(() => Color)
  @Enum({ items: () => Color })
  color: Color = randomEnum(Color);

  @Field()
  isCurrentUser: boolean;

  @Property({ columnType: 'text' })
  password: string;

  @Property({ columnType: 'boolean' })
  isDeleted = false;

  @Property({ columnType: 'boolean' })
  isBanned = false;

  @Property({ nullable: true, columnType: 'text' })
  banReason?: string;

  @OneToMany(() => UserFolder, 'user', {
    orderBy: { position: QueryOrder.ASC },
  })
  userFolders = new Collection<UserFolder>(this);

  @OneToMany(() => ServerUser, 'user', {
    orderBy: { position: QueryOrder.ASC },
  })
  serverUsers = new Collection<ServerUser>(this);

  @OneToMany(() => GroupUser, 'user', {
    orderBy: { lastMessageAt: QueryOrder.DESC },
  })
  groupUsers = new Collection<GroupUser>(this);

  @Field(() => [Group])
  @ManyToMany(() => Group, 'users')
  groups: Group[];

  @OneToMany(() => Relationship, 'owner')
  relationships = new Collection<Relationship>(this);

  @Field(() => [User])
  relatedUsers: User[];

  @Field(() => [Folder])
  folders: Folder[];

  @Field(() => [Server])
  servers: Server[];

  @Field(() => GraphQLNonNegativeInt)
  unreadCount: number;

  @Field()
  showChat: boolean;

  @Field(() => RelationshipStatus)
  relationshipStatus: RelationshipStatus;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: 'boolean', default: false })
  isOg = false;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: 'boolean', default: false })
  isStaff = false;

  @Field()
  get isOnline(): boolean {
    if (!this.lastLoginAt) return false;
    const timeout = 5 * 60 * 1000; // five minutes
    return new Date().getTime() - this.lastLoginAt.getTime() < timeout;
  }
}
