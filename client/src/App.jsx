import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewPost from './pages/NewPost';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts/new" element={<NewPost />} />
            <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;