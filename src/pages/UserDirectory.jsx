import { useEffect, useMemo, useState } from 'react';
import { Filter, Search, SlidersHorizontal, Users } from 'lucide-react';
import UserCard from '../components/UserCard.jsx';
import SkeletonLoader from '../components/SkeletonLoader.jsx';
import AlertBanner from '../components/AlertBanner.jsx';
import { getDevelopers } from '../services/postService.js';
import useDebounce from '../hooks/useDebounce.js';

const roles = ['All roles', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Analyst', 'Python Developer', 'UI/UX Designer', 'QA Engineer'];

export default function UserDirectory() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All roles');
  const [availableOnly, setAvailableOnly] = useState(false);
  const debouncedQuery = useDebounce(query, 250);

  const load = async () => {
    setLoading(true); setError('');
    try { setDevelopers(await getDevelopers()); }
    catch { setError('We could not load the directory. Please retry.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => developers.filter((dev) => {
    const searchable = [dev.name, dev.company?.name || dev.company, dev.role, dev.bio, ...(dev.skills || [])].join(' ').toLowerCase();
    const matchQuery = searchable.includes(debouncedQuery.toLowerCase());
    const matchRole = role === 'All roles' || dev.role === role;
    const matchAvailable = !availableOnly || dev.availability === 'Available';
    return matchQuery && matchRole && matchAvailable;
  }), [developers, debouncedQuery, role, availableOnly]);

  return <div className="page-wrap inner-page">
    <div className="page-title-row"><div><div className="eyebrow">THE DEVELOPER NETWORK</div><h1>Find your <span>people.</span></h1><p>Search by name, skill, company or role. Every profile tells you what they bring to a project.</p></div><div className="title-stat"><Users size={19} /><strong>{developers.length || 8}</strong><span>demo profiles</span></div></div>
    <div className="directory-toolbar"><label className="search-input"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skills, names, companies..." aria-label="Search developers" /><kbd>⌘ K</kbd></label><label className="select-wrap"><SlidersHorizontal size={16} /><select value={role} onChange={(event) => setRole(event.target.value)} aria-label="Filter by role">{roles.map((item) => <option key={item}>{item}</option>)}</select></label><label className="toggle-filter"><input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)} /><span className="toggle-track" /><span>Available now</span></label></div>
    {error && <AlertBanner type="error" onDismiss={() => setError('')} action={<button className="inline-retry" onClick={load}>Retry</button>}>{error}</AlertBanner>}
    {loading ? <SkeletonLoader count={6} /> : <><div className="results-meta"><span><strong>{filtered.length}</strong> developer{filtered.length !== 1 ? 's' : ''} found</span><span><Filter size={14} /> Sorted by relevance</span></div>{filtered.length ? <div className="developer-grid">{filtered.map((developer) => <UserCard key={developer.id} developer={developer} />)}</div> : <div className="empty-state"><div className="empty-icon"><Search size={23} /></div><h3>No developers found</h3><p>Try a different name, skill or role filter.</p><button className="button button-secondary" onClick={() => { setQuery(''); setRole('All roles'); setAvailableOnly(false); }}>Clear filters</button></div>}</>}
  </div>;
}
