import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { defaultEntities } from "@next-auth/mikro-orm-adapter";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(defaultEntities.Session)
    private readonly sessionRepository: EntityRepository<defaultEntities.Session>
  ) {}

  async verifySessionAndGetUser(sessionToken: string) {
    const session = await this.verifySession(sessionToken);

    if (!session) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: "Invalid Session",
      });
    }

    return await this.userService.getUserById(session.userId);
  }

  async verifySession(sessionToken: string) {
    return await this.sessionRepository.findOne({
      sessionToken,
    });
  }
}
