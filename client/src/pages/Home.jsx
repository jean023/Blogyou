// client/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Últimas Entradas</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No hay posts aún.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-500 text-sm mb-4">
                por <strong>{post.User.username}</strong> •{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 flex-1">
                {post.content.length > 100
                  ? post.content.slice(0, 100) + '…'
                  : post.content}
              </p>
              <Link
                to={`/posts/${post.id}`}
                className="mt-4 inline-block text-blue-600 hover:underline font-medium"
              >
                Leer más →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}