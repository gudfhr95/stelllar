import { Embeddable } from '@mikro-orm/core';
import { ObjectType } from '@nestjs/graphql';

@Embeddable()
@ObjectType()
export class LinkMetadata {}
