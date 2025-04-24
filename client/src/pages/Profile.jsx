// client/src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import api from '../api';
import { jwtDecode } from 'jwt-decode';

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (user) {
      api.get('/api/posts')
        .then(res => {
          // filtrar sólo los posts de este usuario
          setPosts(res.data.filter(p => p.userId === user.id));
        })
        .catch(console.error);
    }
  }, [user]);

  if (!user) return <p>Debes iniciar sesión para ver tu perfil.</p>;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Perfil de {user.username}</h2>
      <h3 className="text-xl">Mis publicaciones</h3>

      {posts.length === 0
        ? <p>No has publicado nada aún.</p>
        : posts.map(p => (
            <div key={p.id} className="border p-4 rounded">
              <h4 className="font-semibold">{p.title}</h4>
              <p className="text-gray-600 text-sm">{new Date(p.createdAt).toLocaleDateString()}</p>
            </div>
          ))
      }
    </div>
  );
}