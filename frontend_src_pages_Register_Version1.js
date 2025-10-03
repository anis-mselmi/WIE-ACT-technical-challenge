import { useState } from 'react';
import api from '../frontend_src_api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'farmer' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try{
  const res = await api.post('/auth/register', form);
  const token = res.data.data?.token || res.data.token;
  const refresh = res.data.data?.refreshToken || res.data.refreshToken;
  if (token) localStorage.setItem('token', token);
  if (refresh) localStorage.setItem('refreshToken', refresh);
  navigate('/dashboard');
    }catch(err){ setError(err.response?.data?.error || 'Register failed.'); }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="input mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <input className="input mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <input className="input mb-2" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
      <select className="input mb-2" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
        <option value="farmer">Farmer</option>
        <option value="buyer">Buyer</option>
      </select>
      {error && <div className="text-red-500">{error}</div>}
      <button className="btn bg-green-600 text-white py-2 rounded mt-2">Register</button>
    </form>
  );
}
