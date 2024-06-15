"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold">
            My Blog
          </Link>
          <Link href="/" className="hover:text-gray-300 transition-colors duration-300">Home</Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors duration-300">About Us</Link>
          <Link href="/services" className="hover:text-gray-300 transition-colors duration-300">Services</Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors duration-300">Contact</Link>
          <Link href="/blog" className="hover:text-gray-300 transition-colors duration-300">Blog</Link>
        </div>
        <div className="relative flex items-center space-x-4">
          {session ? (
            <div className="relative inline-block">
              <span className="cursor-pointer hover:text-gray-300 transition-colors duration-300">
                {session.user?.name || session.user?.email}
              </span>
              <div className="dropdown-content hidden absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-20">
                <Link href="/profile">
                  <span className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300">Profile</span>
                </Link>
                {session.user?.role === 'Admin' && (
                  <Link href="/admin/dashboard">
                    <span className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300">Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <button onClick={() => signIn()} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors duration-300">
                Sign In
              </button>
              <Link href="/auth/signup">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <style jsx>{`
        .relative:hover .dropdown-content {
          display: block;
        }
        .dropdown-content {
          display: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
