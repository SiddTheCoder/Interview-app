import NextAuth from "next-auth";
import dbConnect from "@/lib/db/dbConnect";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/user/User";
import { IUser } from "@/models/user/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
          placeholder: "you@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        const { identifier, password } = credentials;
        const user = await User.findOne({
          $or: [{ username: identifier }, { email: identifier }],
        });
        if (!user) {
          throw new Error("No user found with the provided credentials");
        }
        if (!user.isVerified) {
          throw new Error(
            "User email is not verified yet !, Please verify your email"
          );
        }
        if (
          user &&
          user.password &&
          (await bcrypt.compare(password, user.password))
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account || !profile) return false;

      await dbConnect();

      if (account.provider !== "credentials") {
        let existingUser = await User.findOne<IUser>({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            email: user.email,
            username: user.email
              ? user.email.split("@")[0].toLowerCase()
              : (user.name || "").replace(/\s+/g, "").toLowerCase(),
            fullName: profile.name || user.name || "Profile User",
            image: user.image,
            isVerified: true,
            password: null,
            provider: account.provider,
          });

          if (!existingUser) {
            throw new Error("Failed to create user");
          }
        }

        // Attach DB user data to `user` object for jwt callback
        const exUser = existingUser as IUser & { _id: Types.ObjectId };
        user._id = exUser._id.toString();
        user.username = exUser.username;
        user.isVerified = exUser.isVerified;
      }

      // allow login
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.isVerified = user.isVerified;
        token.image = user.image || "";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.isVerified = token.isVerified;
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
