import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    email?: string;
    image?: string;
    isVerified?: boolean;
    fullName?: string;
  }
  interface Session {
    user: {
      fullName?:string,
      _id?: string;
      email?: string;
      isVerified?: boolean;
      username?: string;
      image?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullName?: string;
    _id?: string;
    email?: string;
    isVerified?: boolean;
    username?: string;
    image?: string;
  }
}

// Extra: override the signIn callback param
declare module "next-auth" {
  interface CallbacksOptions {
    signIn?: (params: { user: User; account: any }) => any;
  }
}
