import { Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entity/user.entity';
import { Relationship } from '../user/entity/relationship.entity';
import { Folder } from '../folder/entity/folder.entity';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  entities: [User, Relationship, Folder],
  type: 'postgresql',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  user: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  dbName: configService.get('POSTGRES_DB'),
};

export default MikroOrmConfig;
