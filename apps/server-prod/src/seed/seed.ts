import { EntityManager } from "@mikro-orm/postgresql";
import {
  Channel,
  Folder,
  Message,
  MessageType,
  Role,
  Server,
  ServerCategory,
  ServerFolder,
  ServerUser,
  User,
  UserFolder,
} from "@/entity";
import { ReorderUtils } from "@/util";
import * as argon2 from "argon2";

export async function seed(em: EntityManager) {
  let stelllarServer = await em.findOne(Server, { name: "Stelllar" });

  if (!stelllarServer) {
    const stelllarUser = em.create(User, {
      username: "stelllar",
      isAdmin: true,
      avatarUrl:
        "https://user-images.githubusercontent.com/20228830/200124190-e0dd453e-606f-4c43-9b5e-b6a48894df30.png",
      passwordHash: await argon2.hash(
        process.env.STELLLAR_USER_PASSWORD || "password"
      ),
    });

    stelllarServer = em.create(Server, {
      name: "Stelllar",
      displayName: "Stelllar",
      description:
        "Stelllar 관련 소식, 업데이트, 토론, 버그 제보를 하는 행성입니다.",
      category: ServerCategory.Meta,
      avatarUrl:
        "https://user-images.githubusercontent.com/20228830/200124190-e0dd453e-606f-4c43-9b5e-b6a48894df30.png",
      bannerUrl:
        "https://user-images.githubusercontent.com/20228830/200124167-7292c0cb-d9c8-42b9-9977-0357d082cfa6.png",
      isFeatured: true,
      featuredPosition: ReorderUtils.FIRST_POSITION,
      owner: stelllarUser,
    });
    const defaultRole = em.create(Role, {
      name: "Default",
      server: stelllarServer,
      isDefault: true,
    });
    const stelllarServerUser = em.create(ServerUser, {
      server: stelllarServer,
      user: stelllarUser,
      role: defaultRole,
    });

    const generalChannel = em.create(Channel, {
      name: "general",
      server: stelllarServer,
      isDefault: true,
    });
    const initialMessage = em.create(Message, {
      channel: generalChannel,
      type: MessageType.Initial,
      author: stelllarUser,
    });

    const announcementsFolder = em.create(Folder, {
      name: "Announcements",
      server: stelllarServer,
    });
    const announcementsServerFolder = em.create(ServerFolder, {
      server: stelllarServer,
      folder: announcementsFolder,
    });

    const readLaterFolder = em.create(Folder, {
      name: "Read Later",
      owner: stelllarUser,
    });
    const favoritesFolder = em.create(Folder, {
      name: "Favorites",
      owner: stelllarUser,
    });
    const readLaterUserFolder = em.create(UserFolder, {
      user: stelllarUser,
      folder: readLaterFolder,
      position: ReorderUtils.positionAfter(ReorderUtils.FIRST_POSITION),
    });
    const favoritesUserFolder = em.create(UserFolder, {
      user: stelllarUser,
      folder: favoritesFolder,
    });

    await em.persistAndFlush([
      stelllarUser,
      stelllarServer,
      generalChannel,
      initialMessage,
      defaultRole,
      announcementsFolder,
      announcementsServerFolder,
      stelllarServerUser,
      readLaterFolder,
      readLaterUserFolder,
      favoritesFolder,
      favoritesUserFolder,
    ]);
  }
}
