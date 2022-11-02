import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entity/base.entity';

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  username: string;

  @Property({ columnType: 'text', nullable: true })
  email: string;

  @Property({ columnType: 'text' })
  passwordHash: string;

  constructor(username: string, email: string, password: string) {
    super();

    this.username = username;
    this.email = email;
    this.passwordHash = password;
  }
}
