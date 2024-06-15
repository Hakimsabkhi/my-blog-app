"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div>
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/" className="text-2xl font-bold">
              My Blog
            </Link>
          </div>
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
            {session ? (
              <>
                <span>{session.user?.name || session.user?.email}</span>
                <button onClick={() => signOut()} className="bg-red-500 px-3 py-1 rounded">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => signIn()} className="bg-green-500 px-3 py-1 rounded">
                  Sign In
                </button>
                <Link href="/auth/signup">
                  <button className="bg-blue-500 px-3 py-1 rounded">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2023 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClientLayout;
