import { useEffect, useState } from 'react';
import api from '../frontend_src_api';
import { useParams, Link } from 'react-router-dom';

export default function PostList(){
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(()=>{ api.get(`/forum${category?`?category=${category}`:''}`).then(r=>setPosts(r.data.data || r.data)); }, [category]);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Posts {category && `- ${category}`}</h2>
      {posts.map(p=> (
        <Link key={p._id} to={`/forum/${p._id}`} className="block mb-3 p-4 border rounded bg-white">
          <div className="font-bold">{p.title}</div>
          <div className="text-sm text-gray-600">by {p.author?.name}</div>
        </Link>
      ))}
    </div>
  );
}
