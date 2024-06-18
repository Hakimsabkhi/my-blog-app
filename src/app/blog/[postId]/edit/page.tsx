import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import connectToDatabase from '../../../../lib/db';
import Post from '../../../../models/Post';
import { EditPostProps, Post as PostType, PostQuery } from '../../../../types';

const EditPost = ({ post }: EditPostProps) => {
  const [formData, setFormData] = useState({ title: post.title, content: post.content });
  const router = useRouter();
  const { postId } = router.query as PostQuery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      router.push(`/blog/${postId}`);
    }
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Content:
          <textarea name="content" value={formData.content} onChange={handleChange} required />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.params as PostQuery;
  await connectToDatabase();
  const post = await Post.findById(postId).lean();
  return { props: { post: JSON.parse(JSON.stringify(post)) } };
};

export default EditPost;
