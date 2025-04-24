// client/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../api';
export default function Home() {
  const [posts, setPosts] = useState([]);
  
  
  useEffect(() => {
    api.get('/api/posts').then(res => setPosts(res.data));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Entradas de Blog</h2>
      {posts.length === 0 ? (
        <p>No hay posts aún.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600">por {post.User.username} • {new Date(post.createdAt).toLocaleString()}</p>
            <Link to={`/posts/${post.id}`} className="text-blue-600 underline mt-2 inline-block">
                Leer más
                </Link>

          </div>
        ))
      )}
    </div>
  );
}