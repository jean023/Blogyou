// client/src/pages/Register.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Llamada al endpoint /api/auth/register
      const { data } = await axios.post(
        'http://localhost:4000/api/auth/register',
        { username, email, password }
      );
      // Opcional: auto-login guardando token (si lo devolviera)
      // localStorage.setItem('token', data.token);
      alert(`Usuario "${data.username}" creado correctamente.`);
      navigate('/login');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Error en el registro';
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Registro</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        Crear cuenta
      </button>
    </form>
  );
}