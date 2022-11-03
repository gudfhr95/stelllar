import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ id });

    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  async createUser(email: string, username: string, password: string) {
    const user = await this.userRepository.create({
      username,
      email,
      password,
    });

    await this.userRepository.persistAndFlush(user);

    return user;
  }
}
