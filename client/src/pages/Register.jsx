// client/src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import api from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/register', {
        username,
        email,
        password
      });
      alert(`Usuario "${data.username}" creado correctamente.`);
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="bg-gray-700 bg-opacity-40 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-sm p-8 space-y-6">
        <div className="flex justify-center mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-center text-white text-xl font-semibold">Crear Cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-600 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="flex-1 mr-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full transition-colors"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex-1 ml-2 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-full transition-colors"
            >
              Login
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-gray-300 hover:underline"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}