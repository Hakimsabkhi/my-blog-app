"use client";

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
