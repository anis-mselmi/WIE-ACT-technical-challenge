import { useEffect, useState } from 'react';
import api from '../frontend_src_api';
import { useParams } from 'react-router-dom';

export default function ProductDetails(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(()=>{ api.get(`/products/${id}`).then(r=>setP(r.data.data || r.data)); }, [id]);
  if(!p) return <div className="p-4">Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold">{p.title}</h2>
      {p.images?.length>0 && <img src={p.images[0].url || p.images[0]} className="w-full h-64 object-cover my-4" alt={p.title} />}
      <div className="mb-4">{p.description}</div>
      <div className="font-semibold">Price: {p.price}</div>
      <div>Qty: {p.quantity}</div>
      <div>Farmer: {p.farmer?.name}</div>
    </div>
  );
}
