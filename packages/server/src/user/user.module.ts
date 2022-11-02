import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entity/user.entity';
import { UserResolver } from './user.resolver';
import UserService from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
