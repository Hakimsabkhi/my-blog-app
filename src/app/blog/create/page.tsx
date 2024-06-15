import { useState } from 'react';
import { useRouter } from 'next/router';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      router.push('/blog');
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Content:
          <textarea name="content" value={formData.content} onChange={handleChange} required />
        </label>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
