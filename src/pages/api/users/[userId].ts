import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const { userId } = req.query;

  if (req.method === 'GET') {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } else if (req.method === 'DELETE') {
    await User.findByIdAndDelete(userId);
    res.status(204).end();
  } else if (req.method === 'PUT') {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } else {
    res.status(405).end();
  }
}
