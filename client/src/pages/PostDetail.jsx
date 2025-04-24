// client/src/pages/PostDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost]           = useState(null);
  const [comments, setComments]   = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    api.get(`/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(console.error);

    api.get(`/api/posts/${id}/comments`)
      .then(res => setComments(res.data))
      .catch(console.error);
  }, [id]);

  const handleComment = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        `/api/posts/${id}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(prev => [...prev, res.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al comentar');
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <article>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-gray-600">
          por <strong>{post.User.username}</strong> •{' '}
          {new Date(post.createdAt).toLocaleString()}
        </p>
        <div className="mt-4">{post.content}</div>
      </article>

      <section>
        <h2 className="text-2xl font-semibold">Comentarios</h2>
        {comments.map(c => (
          <div key={c.id} className="border-b py-2">
            <p>{c.content}</p>
            <small className="text-gray-500">— {c.User.username}</small>
          </div>
        ))}

        {localStorage.getItem('token') && (
          <form onSubmit={handleComment} className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Escribe tu comentario..."
              required
            />
            <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Enviar
            </button>
          </form>
        )}
      </section>
    </div>
  );
}