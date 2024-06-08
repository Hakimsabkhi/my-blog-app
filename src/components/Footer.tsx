import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
