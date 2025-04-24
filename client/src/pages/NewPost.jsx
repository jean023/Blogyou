// client/src/pages/NewPost.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function NewPost() {
  const [title, setTitle]     = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // redirigir al detalle del post recién creado
      navigate(`/posts/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al crear el post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Crear Nueva Entrada</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full p-2 border rounded h-40"
        required
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        Publicar
      </button>
    </form>
  );
}