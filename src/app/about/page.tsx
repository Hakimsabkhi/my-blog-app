"use client";

import React from 'react';

const AboutPage: React.FC = () => {
  return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to My Blog! We are a group of enthusiastic writers and developers who are passionate about sharing our knowledge and insights with the world. Our mission is to create a platform where we can discuss various topics, share our experiences, and provide valuable information to our readers.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our team consists of professionals from different fields, including technology, health, education, and more. We believe that sharing knowledge can make a positive impact on society, and we strive to deliver high-quality content that is both informative and engaging.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for visiting our blog. We hope you find our posts helpful and inspiring. If you have any questions or suggestions, feel free to reach out to us through our Contact page. We would love to hear from you!
        </p>
      </div>
  );
};

export default AboutPage;
