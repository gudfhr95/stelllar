import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import UserService from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  public async register(email: string, username: string, password: string) {
    const hashedPassword = await argon2.hash(password);
    try {
      const createdUser = await this.userService.createUser(
        email,
        username,
        hashedPassword
      );
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
