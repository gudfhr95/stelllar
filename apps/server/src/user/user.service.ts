import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./entity/user.entity";

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
      "User with this id does not exist",
      HttpStatus.NOT_FOUND
    );
  }
}
