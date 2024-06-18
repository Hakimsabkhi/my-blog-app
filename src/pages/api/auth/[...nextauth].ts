import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

// Ensure environment variables are defined
const googleClientId = process.env.GOOGLE_CLIENT_ID!;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET!;
const nextAuthSecret = process.env.NEXTAUTH_SECRET!;

if (!googleClientId || !googleClientSecret || !nextAuthSecret) {
  throw new Error('Missing required environment variables for Google authentication or NextAuth secret.');
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email });

        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return { id: user._id, name: user.username, email: user.email, role: user.role };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: undefined,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as 'Visitor' | 'Rédacteur' | 'Admin',
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      await connectToDatabase();

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // If the user does not exist, create a new user
        const newUser = new User({
          username: user.name,
          email: user.email,
          password: undefined, // No password for Google users
          role: 'Visitor', // Default role
        });

        await newUser.save();
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect user to home page after sign-in
      return baseUrl;
    },
  },
  secret: nextAuthSecret,
});
