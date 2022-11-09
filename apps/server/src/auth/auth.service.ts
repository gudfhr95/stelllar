import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { defaultEntities } from "@next-auth/mikro-orm-adapter";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(defaultEntities.Session)
    private readonly sessionRepository: EntityRepository<defaultEntities.Session>
  ) {}

  async verifySession(sessionToken: string) {
    return await this.sessionRepository.findOne({
      sessionToken,
    });
  }
}
