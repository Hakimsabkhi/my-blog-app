 // src/pages/api/posts/index.js
import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
