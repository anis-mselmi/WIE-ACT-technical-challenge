import { useState } from 'react';
import api from '../frontend_src_api';
import { useNavigate } from 'react-router-dom';

export default function AddRide(){
  const [form, setForm] = useState({ departure:'', destination:'', dateTime:'', seatsAvailable:1, costPerSeat:0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try{
      const res = await api.post('/rides', form);
      navigate('/rides');
    }catch(err){ setError(err.response?.data?.error || 'Failed'); }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Ride</h2>
      <input className="input mb-2" placeholder="Departure" value={form.departure} onChange={e=>setForm({...form,departure:e.target.value})} />
      <input className="input mb-2" placeholder="Destination" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} />
      <input className="input mb-2" type="datetime-local" value={form.dateTime} onChange={e=>setForm({...form,dateTime:e.target.value})} />
      <input className="input mb-2" placeholder="Seats" value={form.seatsAvailable} onChange={e=>setForm({...form,seatsAvailable:e.target.value})} />
      <input className="input mb-2" placeholder="Cost per seat" value={form.costPerSeat} onChange={e=>setForm({...form,costPerSeat:e.target.value})} />
      {error && <div className="text-red-500">{error}</div>}
      <button className="btn bg-green-600 text-white py-2 rounded mt-2">Create Ride</button>
    </form>
  );
}
