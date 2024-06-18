import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Post from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { postId } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const post = await Post.findByIdAndUpdate(postId, req.body, { new: true, runValidators: true });
        if (!post) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedPost = await Post.deleteOne({ _id: postId });
        if (!deletedPost) {
          return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
