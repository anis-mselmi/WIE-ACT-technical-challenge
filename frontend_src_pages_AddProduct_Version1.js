import { useState } from 'react';
import api from '../frontend_src_api';
import { useNavigate } from 'react-router-dom';

export default function AddProduct(){
  const [form, setForm] = useState({ title:'', description:'', price:0, quantity:1, images:[] });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try{
      const payload = { ...form };
      // images: accept comma-separated URLs for simplicity
      if(typeof payload.images === 'string') payload.images = payload.images.split(',').map(u=> ({ url:u.trim() }));
      const res = await api.post('/products', payload);
      navigate(`/products/${res.data.data._id || res.data._id}`);
    }catch(err){ setError(err.response?.data?.error || 'Failed'); }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <input className="input mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
      <textarea className="input mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
      <input className="input mb-2" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
      <input className="input mb-2" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} />
      <input className="input mb-2" placeholder="Image URLs (comma separated)" value={form.images} onChange={e=>setForm({...form,images:e.target.value})} />
      {error && <div className="text-red-500">{error}</div>}
      <button className="btn bg-green-600 text-white py-2 rounded mt-2">Add Product</button>
    </form>
  );
}
