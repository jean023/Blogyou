// client/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import api from '../api';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error en el login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-gray-700 bg-opacity-40 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-sm p-8 space-y-6">
        <div className="flex justify-center mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-center text-white text-xl font-semibold">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            <input
              type="email"
              placeholder="User Name"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="flex-1 mr-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="flex-1 ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-full transition-colors"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => alert('Función de recuperación aún no implementada')}
              className="text-sm text-gray-300 hover:underline"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}