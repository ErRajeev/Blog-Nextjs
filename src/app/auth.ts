// pages/api/auth/[...nextauth].js
import NextAuth, { CredentialsSignin } from "next-auth";
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
        const email = credentials.email as string
        const password = credentials.password as string

        
        if (!email || !password) throw new CredentialsSignin({cause : "Please provide email and password"})
        
        await dbConnect();
        const user = await User.findOne({ email }).select("+password");

        
        if (!user) throw new CredentialsSignin({cause: "User not found"});

        const isMatch = await compare(password, user.password)
      
        // const isPasswordCorrect = user.password === password; // Replace with actual password check


        if (!isMatch) throw new CredentialsSignin({cause : "Invalid credentials"});
        
        return {name : user.name, email : user.email, id : user._id}
      },
    }),
  ],
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
