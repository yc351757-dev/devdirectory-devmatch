import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import UserDirectory from './pages/UserDirectory.jsx';
import UserProfile from './pages/UserProfile.jsx';
import AddPost from './pages/AddPost.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import TeamMatcher from './pages/TeamMatcher.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return <div className="app-shell"><Navbar /><main><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users" element={<UserDirectory />} />
    <Route path="/users/:id" element={<UserProfile />} />
    <Route path="/match" element={<TeamMatcher />} />
    <Route path="/login" element={<Login />} />
    <Route path="/add-post" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes></main><footer className="site-footer"><div className="footer-inner"><span>© 2026 DevMatch</span><span>Built for better student teams <span className="footer-heart">✦</span></span><span>React · Axios · Intelligent matching</span></div></footer></div>;
}
