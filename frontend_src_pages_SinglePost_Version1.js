import { useEffect, useState } from 'react';
import api from '../frontend_src_api';
import { useParams } from 'react-router-dom';

export default function SinglePost(){
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState('');
  useEffect(()=>{ api.get(`/forum/${id}`).then(r=>setData(r.data.data || r.data)); }, [id]);
  const addComment = async ()=>{ await api.post(`/forum/${id}/comment`, { content: comment }); setComment(''); setData(null); api.get(`/forum/${id}`).then(r=>setData(r.data.data || r.data)); };
  const upvote = async ()=>{ await api.post(`/forum/${id}/upvote`); setData(null); api.get(`/forum/${id}`).then(r=>setData(r.data.data || r.data)); };
  const downvote = async ()=>{ await api.post(`/forum/${id}/downvote`); setData(null); api.get(`/forum/${id}`).then(r=>setData(r.data.data || r.data)); };
  if(!data) return <div className="p-4">Loading...</div>;
  const { post, comments } = data;
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <div className="text-sm text-gray-600">by {post.author?.name} | {post.category}</div>
      <div className="my-4">{post.content}</div>
      <div className="flex gap-2">
        <button className="btn bg-green-600 text-white" onClick={upvote}>Upvote ({post.upvotes})</button>
        <button className="btn bg-gray-200" onClick={downvote}>Downvote ({post.downvotes})</button>
      </div>
      <div className="mt-6">
        <h3 className="font-bold">Comments</h3>
        {comments.map(c=> (
          <div key={c._id} className="border-b py-2"><div className="text-sm text-gray-600">{c.author?.name}</div><div>{c.content}</div></div>
        ))}
        <div className="mt-4">
          <textarea className="input w-full" value={comment} onChange={e=>setComment(e.target.value)} />
          <button className="btn bg-green-600 text-white mt-2" onClick={addComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
}
