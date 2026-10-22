import { useState } from 'react';
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck, Users } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AlertBanner from '../components/AlertBanner.jsx';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('Student Developer');
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('devmatch123');
  const [error, setError] = useState('');
  if (isAuthenticated) return <Navigate to="/" replace />;

  const submit = (event) => {
    event.preventDefault(); setError('');
    if (!email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (password.length < 6) { setError('Password must contain at least 6 characters.'); return; }
    login({ name: name.trim() || email.split('@')[0], email });
    const target = location.state?.from?.pathname || '/add-post';
    navigate(target, { replace: true });
  };

  return <div className="auth-page page-wrap"><div className="auth-card"><div className="auth-illustration"><div className="auth-orbit orbit-one" /><div className="auth-orbit orbit-two" /><div className="auth-illustration-icon"><Users size={34} /></div><span className="auth-float float-one">React</span><span className="auth-float float-two">SQL</span><span className="auth-float float-three">Teamwork</span><div className="auth-illustration-copy"><span className="eyebrow">BUILD TOGETHER</span><h2>Your next idea deserves a great team.</h2><p>Sign in to publish engineering notes and manage your team's project ideas.</p></div></div><div className="auth-form-side"><Link to="/" className="back-link"><ArrowLeft size={15} /> Back home</Link><div className="auth-heading"><div className="auth-icon"><LockKeyhole size={21} /></div><h1>Welcome back.</h1><p>Use the demo login to access protected features.</p></div>{error && <AlertBanner type="error" onDismiss={() => setError('')}>{error}</AlertBanner>}<form className="stacked-form" onSubmit={submit}><label className="field-label" htmlFor="name">DISPLAY NAME</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name" /><label className="field-label" htmlFor="email">EMAIL ADDRESS</label><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" /><label className="field-label" htmlFor="password">PASSWORD</label><input id="password" type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /><button className="button button-primary auth-submit" type="submit">Continue to DevMatch <ArrowRight size={16} /></button></form><div className="demo-credentials"><ShieldCheck size={16} /><span><strong>Demo authentication</strong><small>Any valid email and 6+ character password work. No real account is created.</small></span></div><p className="auth-small">New here? Start by <Link to="/match">building a team</Link>.</p></div></div></div>;
}
