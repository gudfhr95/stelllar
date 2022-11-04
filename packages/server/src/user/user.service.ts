import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
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

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getUserById(userId);

    const isRefreshTokenMatching = await argon2.verify(
      user.currentHashedRefreshToken,
      refreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
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

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await argon2.hash(refreshToken);

    const user = await this.userRepository.findOne({ id: userId });
    user.currentHashedRefreshToken = currentHashedRefreshToken;

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async removeRefreshToken(userId: string) {
    const user = await this.userRepository.findOne({ id: userId });
    user.currentHashedRefreshToken = null;

    await this.userRepository.persistAndFlush(user);
    return user;
  }
}
