import React from 'react';
import '../styles/globals.css'; // Ensure global styles are imported

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
