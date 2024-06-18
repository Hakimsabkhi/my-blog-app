import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
      role: 'Visitor' | 'Rédacteur' | 'Admin';
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: 'Visitor' | 'Rédacteur' | 'Admin';
  }

  interface JWT {
    role?: 'Visitor' | 'Rédacteur' | 'Admin';
  }
}
