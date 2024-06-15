import dotenv from 'dotenv'; // Import dotenv
dotenv.config({ path: '.env.local' }); // Load environment variables from .env.local

import mongoose from 'mongoose'; // Ensure mongoose is imported
import bcrypt from 'bcryptjs';
import connectToDatabase from './src/lib/db';
import User from './src/models/User';

// Debugging line to check if the environment variable is loaded
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const createAdminUser = async () => {
  try {
    await connectToDatabase();

    const email = 'admin@admin.com';
    const username = 'admin';
    const password = '123456789'; // Replace with a secure password
    const role = 'Admin';

    // Check if the admin user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new admin user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
