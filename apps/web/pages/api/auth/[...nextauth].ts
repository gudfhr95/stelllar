import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, account, profile }) {
      token.id = "test";

      return token;
    },
  },
};

export default NextAuth(authOptions);
