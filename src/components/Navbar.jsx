import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Bot, LogOut, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand" aria-label="DevMatch home">
          <span className="brand-mark"><Users size={20} strokeWidth={2.6} /></span>
          <span>dev<span className="brand-accent">match</span><small>TEAM INTELLIGENCE</small></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink end to="/" className={navClass}>Overview</NavLink>
          <NavLink to="/users" className={navClass}>Developers</NavLink>
          <NavLink to="/match" className={navClass}><Bot size={16} /> Team matcher <span className="nav-new">NEW</span></NavLink>
        </nav>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="user-pill"><span className="user-dot" />{user?.name || 'Student'}</span>
              <button className="icon-button" title="Log out" onClick={handleLogout}><LogOut size={17} /></button>
            </>
          ) : <Link className="login-link" to="/login">Log in <ArrowUpRight size={16} /></Link>}
        </div>
      </div>
    </header>
  );
}
