"use client"; // This directive tells Next.js that this is a Client Component

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SessionProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow container mx-auto p-4 bg-white shadow-md rounded-md mt-4">
          {children}
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
};

export default ClientLayout;
