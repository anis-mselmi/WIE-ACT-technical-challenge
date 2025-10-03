import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    setUser(token ? true : null);
  }, []);

  const logout = ()=>{ localStorage.removeItem('token'); setUser(null); navigate('/login'); };

  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="font-bold text-lg">AgriNova</div>
        <div className="hidden md:flex gap-4">
          <Link to="/products">Marketplace</Link>
          <Link to="/rides">Rides</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          {user ? <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button> : <Link to="/login" className="bg-white text-green-700 px-3 py-1 rounded">Login</Link>}
        </div>
      </div>
    </nav>
  );
}