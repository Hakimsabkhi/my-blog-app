import 'dotenv/config'; // Load environment variables
console.log('MONGODB_URI:', process.env.MONGODB_URI);

import connectToDatabase from './src/lib/db';

async function createAdminUser() {
  await connectToDatabase();

  // Your code to create an admin user goes here
  console.log('Admin user created successfully.');
}

createAdminUser().catch((error) => {
  console.error('Error creating admin user:', error);
});
