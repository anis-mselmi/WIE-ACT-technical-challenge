import { useState } from "react";
import api from '../frontend_src_api';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.data?.token || res.data.token;
      const refresh = res.data.data?.refreshToken || res.data.refreshToken;
      if (token) localStorage.setItem('token', token);
      if (refresh) localStorage.setItem('refreshToken', refresh);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-16 p-8 shadow bg-white rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="input mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="input mb-2" />
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button className="btn w-full bg-green-600 text-white py-2 rounded">Login</button>
    </form>
  );
}