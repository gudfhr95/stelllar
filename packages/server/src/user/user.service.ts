import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async createAccount(username, email, password) {
    const user = await this.userRepository.create({
      username: username,
      email: email,
      passwordHash: password,
    });

    await this.userRepository.persistAndFlush(user);

    return user;
  }
}
