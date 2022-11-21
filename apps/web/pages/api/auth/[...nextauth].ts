import { MikroOrmAdapter } from "@next-auth/mikro-orm-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import short from "short-uuid";

const mikroOrmAdapter = MikroOrmAdapter({
  type: "postgresql",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
});

export const authOptions = {
  adapter: mikroOrmAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  events: {
    async createUser(message: any) {
      await mikroOrmAdapter.updateUser({
        id: message.user.id,
        name: short.generate(),
        image: null,
      });
    },
  },
};

export default NextAuth(authOptions);
