"use client";

import { useEffect, useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <a href={`/blog/${post._id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
