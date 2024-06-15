import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const users = await User.find({});
    res.status(200).json({ users });
  } else {
    res.status(405).end();
  }
}
