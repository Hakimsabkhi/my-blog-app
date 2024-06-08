import React from 'react';
import ClientLayout from './client-layout';
import PostList from '../components/PostList';
import { IPost } from '../models/Post';
import dbConnect from '../lib/db';
import Post from '../models/Post';

async function fetchPosts(): Promise<IPost[]> {
  await dbConnect();
  const result = await Post.find({});
  const posts = result.map((doc) => {
    const post = doc.toObject() as IPost;
    post._id = post._id.toString();
    return post;
  });
  return posts;
}

const HomePage = async () => {
  const posts = await fetchPosts();

  return (
    <ClientLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome to My Blog</h1>
        <PostList posts={posts} />
      </div>
    </ClientLayout>
  );
};

export default HomePage;
