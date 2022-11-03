import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver],
})
export class AuthModule {}
