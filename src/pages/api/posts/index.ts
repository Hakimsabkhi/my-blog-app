import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Post from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, posts });
      } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ success: false, error: errorMessage });
      }
      break;
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
