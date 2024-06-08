 
// src/pages/api/posts/[id].js
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } else if (req.method === 'PUT') {
    const { title, content, author } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content, author }, { new: true });
    res.status(200).json(updatedPost);
  } else if (req.method === 'DELETE') {
    await Post.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
