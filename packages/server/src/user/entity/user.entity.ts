import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base.entity';
import { GraphQLBoolean } from 'graphql/type';

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  username: string;

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
  @Property()
  isAdmin = false;

  @Field()
  isCurrentUser: boolean;

  @Property({ columnType: 'text' })
  passwordHash: string;

  @Property()
  isDeleted = false;

  @Property()
  isBanned = false;

  @Property({ nullable: true, columnType: 'text' })
  banReason?: string;

  @Field(() => [User])
  relatedUsers: User[];

  @Field(() => GraphQLBoolean)
  @Property({ default: false })
  isOg = false;

  @Field(() => GraphQLBoolean)
  @Property({ default: false })
  isStaff = false;

  @Field()
  get isOnline(): boolean {
    if (!this.lastLoginAt) return false;
    const timeout = 5 * 60 * 1000; // five minutes
    return new Date().getTime() - this.lastLoginAt.getTime() < timeout;
  }
}
