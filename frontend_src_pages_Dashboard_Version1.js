import { useEffect, useState } from 'react';
import api from '../frontend_src_api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [rides, setRides] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    api.get('/auth/profile').then(r=>setUser(r.data.data?.user || r.data.user || r.data));
    api.get('/products').then(r=>setProducts(r.data.data || r.data));
    api.get('/rides').then(r=>setRides(r.data.data || r.data));
    api.get('/forum').then(r=>setPosts(r.data.data || r.data));
  }, []);
  if(!user) return <div className="p-4">Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="bg-white p-4 rounded mb-4">
        <h3 className="font-bold">Profile</h3>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded">
          <h4 className="font-bold">My Products</h4>
          {products.filter(p=>p.farmer?._id === user._id).map(p=> <div key={p._id}><Link to={`/products/${p._id}`}>{p.title}</Link></div>)}
        </div>
        <div className="bg-white p-4 rounded">
          <h4 className="font-bold">My Rides</h4>
          {rides.filter(r=>r.driver?._id === user._id).map(r=> <div key={r._id}>{r.departure} → {r.destination}</div>)}
        </div>
        <div className="bg-white p-4 rounded">
          <h4 className="font-bold">My Posts</h4>
          {posts.filter(p=>p.author?._id === user._id).map(p=> <div key={p._id}><Link to={`/forum/${p._id}`}>{p.title}</Link></div>)}
        </div>
      </div>
    </div>
  );
}
