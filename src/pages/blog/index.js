 
// src/pages/blog/index.js
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Blog() {
  const { data, error } = useSWR('/api/posts', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
