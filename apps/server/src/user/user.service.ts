import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileUpload } from "graphql-upload-minimal";
import { FileService } from "../file/file.service";
import { User } from "./entity/user.entity";
import { UpdateProfileInput } from "./input/update-profile.input";

@Injectable()
export class UserService {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
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

  async updateAvatar(user: User, file: Promise<FileUpload>) {
    if (
      user.image &&
      user.image.includes(this.configService.get("AWS_ENDPOINT"))
    ) {
      const splited = user.image.split("/");
      const key = splited[splited.length - 1];

      await this.fileService.deleteFileInS3(key);
    }

    const avatarUrl = await this.fileService.uploadSingleFile(file, {
      width: 256,
      height: 256,
    });
    user.image = avatarUrl;

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async updateProfile(user: User, input: UpdateProfileInput) {
    if (input.name) {
      if (await this.existsUserByName(input.name)) {
        throw new HttpException("duplicateName", HttpStatus.BAD_REQUEST);
      }
    }

    user.name = input.name ?? user.name;

    await this.userRepository.persistAndFlush(user);
    return user;
  }

  async deleteUser(user: User) {
    user.isDeleted = true;

    await this.userRepository.persistAndFlush(user);
    return true;
  }

  async existsUserByName(name: string) {
    return !!(await this.userRepository.findOne({
      name,
      isDeleted: false,
    }));
  }
}
