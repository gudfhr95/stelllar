import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
})
export class UserModule {}
