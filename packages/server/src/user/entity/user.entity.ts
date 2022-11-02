import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base.entity';
import { GraphQLEmailAddress, GraphQLNonNegativeInt } from 'graphql-scalars';
import { GraphQLBoolean } from 'graphql/type';

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  username: string;

  @Field(() => GraphQLEmailAddress, { nullable: true })
  @Property({ columnType: 'text', nullable: true })
  email: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastLoginAt?: Date;

  @Field({ nullable: true })
  lastMessageAt?: Date;

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  avatarUrl?: string;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: 'boolean' })
  isAdmin = false;

  @Field()
  isCurrentUser: boolean;

  @Property({ columnType: 'text' })
  passwordHash: string;

  @Property({ columnType: 'boolean' })
  isDeleted = false;

  @Property({ columnType: 'boolean' })
  isBanned = false;

  @Property({ nullable: true, columnType: 'text' })
  banReason?: string;

  @Field(() => [User])
  relatedUsers: User[];

  @Field(() => GraphQLNonNegativeInt)
  unreadCount: number;

  @Field()
  showChat: boolean;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: 'boolean', default: false })
  isOg = false;

  @Field(() => GraphQLBoolean)
  @Property({ columnType: 'boolean', default: false })
  isStaff = false;

  constructor(username: string, email: string, password: string) {
    super();

    this.username = username;
    this.email = email;
    this.passwordHash = password;
  }
}
