import { MikroOrmAdapter } from "@next-auth/mikro-orm-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const nextAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  return {
    adapter: MikroOrmAdapter({
      type: "postgresql",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      dbName: process.env.POSTGRES_DB,
    }),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
  };
};

export default (req: NextApiRequest, res: NextApiResponse<any>) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
