import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      // Fetch all users excluding those with 'Admin' role
      const users = await User.find({ role: { $ne: 'Admin' } });
      res.status(200).json({ success: true, users });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
