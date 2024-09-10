// pages/api/auth/[...nextauth].js
import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./api/models/userModel";
import dbConnect from "@/lib/DataBase/utils";
import { compare } from "bcryptjs";

export const {handlers, signIn, signOut, auth} =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string; password: string };
        if (!email || !password) throw new CredentialsSignin({cause : "Please provide email and password"})
        
        await dbConnect();
        
        const user = await User.findOne({ email })

        if (!user) throw new CredentialsSignin({cause: "User not found."});

        if (!user.password) {
          throw new CredentialsSignin({ cause: "This account was registered with Google. Please use Google login or set a password."});
        }

        const isMatch = await compare(password, user.password)
      
        if (!isMatch) throw new CredentialsSignin({cause : "Invalid credentials"});
        
        return {name : user.name, email : user.email, id : user._id}
      },
    }),
  ],
  pages : {
    signIn : '/login'
  },

  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        try {
          const { name, email, id, image } = user;
          await dbConnect();
          const isUser = await User.exists({ email });
  
          if (!isUser) await User.create({ name, email, image, googleId: id });
          
          return true;  // Ensure this returns true for successful sign-in
        } catch (error) {
          // console.error("SignIn Error:", error);
          return false;  // Returning false will deny the login
        }
      }
      return true;  // Allow other providers (credentials) to pass through
    }
  }
  

  // callbacks: {
  //   async session({ session, token, user }) {
  //     session.user = user;
  //     return session;
  //   },
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  // },
  // secret: process.env.AUTH_SECRET,
});
