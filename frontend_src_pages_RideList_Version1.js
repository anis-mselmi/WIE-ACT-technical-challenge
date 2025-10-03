import { useEffect, useState } from 'react';
import api from '../frontend_src_api';
import Card from '../components/Card';

export default function RideList(){
  const [rides, setRides] = useState([]);
  useEffect(()=>{ api.get('/rides').then(r=>setRides(r.data.data || r.data)); }, []);
  const join = async id => { await api.post(`/rides/${id}/join`).then(r=> setRides(s=>s.map(x=>x._id===id?r.data.data:r.data || r.data))); };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Rides</h2>
      {rides.map(r=> (
        <div key={r._id} className="mb-4">
          <Card title={`${r.departure} → ${r.destination}`} subtitle={`${new Date(r.dateTime).toLocaleString()} | Seats: ${r.seatsAvailable - (r.passengers?.length||0)}`}>
            <div>Driver: {r.driver?.name}</div>
            <button className="btn bg-green-600 text-white mt-2" onClick={()=>join(r._id)}>Join Ride</button>
          </Card>
        </div>
      ))}
    </div>
  );
}
