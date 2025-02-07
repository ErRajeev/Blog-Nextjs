
import dbConnect from "@/lib/DataBase/utils";
import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "./api/models/userModel";


const GOOGLE_CLIENT_ID  = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET  = process.env.GOOGLE_CLIENT_SECRET!
const NEXTAUTH_SECRET =  process.env.NEXTAUTH_SECRET!
const NODE_ENV = process.env.NODE_ENV!


const getUserByEmail = async (email: string) => {
  await dbConnect();
  return User.findOne({ email }).select('+password');
};

const updateOrCreateGoogleUser = async (user: any) => {
  await dbConnect();
  const { name, email, id, image } = user;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return User.findOneAndUpdate(
      { email },
      { $set: { name, image, googleI: id } },
      { new: true, upsert: true } // Create if not exists
    );
  } else {
    return User.create({ name, email, image, googleId: id });
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string; password: string };

        if (!email || !password) {
          throw new CredentialsSignin({cause : "Please provide email and password"})
        }

        const user = await getUserByEmail(email);        

        if (!user) {
          throw new CredentialsSignin({cause: "User not found."});
        }

        if (!user.password) {
          throw new CredentialsSignin({ cause: "This account was registered with Google. Please use Google login or set a password."});
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new CredentialsSignin({cause : "Invalid credentials"});
        }

        return { name: user.name, email: user.email, id: user._id };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          await updateOrCreateGoogleUser(user);
          return true;
        } catch (error) {
          // console.error("Google SignIn Error:", error);
          return false; // Deny login on error
        }
      }
      return true; // Allow other providers to pass through
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.name = user.name ?? "";
        token.email = user.email ?? "";
        token.picture = user.image ?? "";
        token.emailVerified = (user as any).emailVerified ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        image: token.picture as string, 
        emailVerified: token.emailVerified as Date | null,
      };
      return session;
    },
    
  },
  secret: NEXTAUTH_SECRET,
  trustHost: true, 
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`, // You can customize the cookie name if needed
      options: {
        httpOnly: true,    // Ensures the cookie is sent only over HTTP(S)
        secure: NODE_ENV === "production", // Use secure cookies in production (HTTPS)
        sameSite: "lax",   // Adjust this according to your needs (lax or strict)
      },
    }
  }
});