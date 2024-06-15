"use client";

import React, { useEffect, useState } from 'react';
import ClientLayout from './client-layout';
import PostList from '../components/PostList';
import { IPost } from '../models/Post';
import { useSession } from 'next-auth/react';

const HomePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <ClientLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Welcome to My Blog</h1>
        {session ? (
          <div className="text-center mb-4">
            <h2 className="text-2xl">Hello, {session.user?.name || session.user?.email}!</h2>
            <p>You are signed in as {session.user?.email}</p>
          </div>
        ) : (
          <div className="text-center mb-4">
            <p>Please sign in to access more features.</p>
          </div>
        )}
        <PostList posts={posts} />
      </div>
    </ClientLayout>
  );
};

export default HomePage;
