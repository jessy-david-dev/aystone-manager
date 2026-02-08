import NextAuth, { type NextAuthConfig, type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import Discord from "next-auth/providers/discord";

export const authConfig: NextAuthConfig = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  trustHost: true,
};

export const { auth, handlers } = NextAuth(authConfig);