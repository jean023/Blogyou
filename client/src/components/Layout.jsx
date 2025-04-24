// client/src/components/Layout.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">
          <Link to="/">BlogYou</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          {token ? (
            <>
              <Link to="/posts/new">New Post</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <main className="flex-1 container mx-auto p-4">{children}</main>
      <footer className="bg-gray-200 text-center py-4">© 2025 BlogYou</footer>
    </div>
  );
}