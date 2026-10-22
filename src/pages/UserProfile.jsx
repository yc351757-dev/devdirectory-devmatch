import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Github, Mail, MapPin, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getDeveloper, getPostsByDeveloper } from '../services/postService.js';
import AlertBanner from '../components/AlertBanner.jsx';

const initials = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

export default function UserProfile() {
  const { id } = useParams();
  const [developer, setDeveloper] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true); setError('');
      try { const [person, articles] = await Promise.all([getDeveloper(id), getPostsByDeveloper(id)]); if (active) { setDeveloper(person); setPosts(articles); } }
      catch { if (active) setError('We could not find that developer profile. Try returning to the directory.'); }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [id]);

  if (loading) return <div className="page-wrap inner-page"><div className="profile-loading"><div className="skeleton-block" /><div className="skeleton-line medium" /><div className="skeleton-line" /></div></div>;
  if (!developer || error) return <div className="page-wrap inner-page"><AlertBanner type="error">{error || 'Developer not found.'}</AlertBanner><Link to="/users" className="text-link"><ArrowLeft size={16} /> Back to directory</Link></div>;

  return <div className="page-wrap inner-page">
    <Link to="/users" className="back-link"><ArrowLeft size={16} /> Back to developers</Link>
    <section className="profile-hero"><div className={`profile-avatar avatar-${developer.color || 'violet'}`}>{initials(developer.name)}</div><div className="profile-main"><div className="eyebrow">DEVELOPER PROFILE</div><h1>{developer.name}</h1><p className="profile-role">{developer.role || 'Software Developer'} <span>·</span> {developer.company?.name || developer.company || 'Independent'}</p><p className="profile-bio">{developer.bio || 'A developer who enjoys collaborating on practical projects.'}</p><div className="profile-meta"><span><MapPin size={15} /> {developer.address?.city || developer.location || 'India'}</span><span><Mail size={15} /> {developer.email || 'Contact through platform'}</span><span><BriefcaseBusiness size={15} /> {developer.projects?.length || 1} projects</span></div><div className="profile-actions"><a className="button button-secondary" href={`mailto:${developer.email || ''}`}><Mail size={16} /> Contact developer</a><Link className="button button-primary" to="/match">Match for a project <ArrowUpRight size={16} /></Link></div></div><div className="profile-badge"><Sparkles size={16} /><span><strong>Community</strong><small>Open to collaboration</small></span></div></section>
    <div className="profile-columns"><section className="profile-panel"><div className="panel-heading"><h2>Skills & strengths</h2><span>{developer.skills?.length || 3} skills</span></div><div className="profile-skill-list">{(developer.skills || ['React', 'JavaScript', 'Git']).map((skill, index) => <div className="skill-bar-row" key={skill}><div><span>{skill}</span><span>{[94, 88, 82, 78, 74, 70][index % 6]}%</span></div><div className="skill-bar"><span style={{ width: `${[94, 88, 82, 78, 74, 70][index % 6]}%` }} /></div></div>)}</div></section>
      <section className="profile-panel"><div className="panel-heading"><h2>Project highlights</h2><span>{developer.projects?.length || 1} items</span></div><div className="project-list">{(developer.projects || ['Community contribution']).map((project, index) => <article className="project-item" key={project}><div className="project-icon">{index + 1 < 10 ? `0${index + 1}` : index + 1}</div><div><h3>{project}</h3><p>Project contribution · Team collaboration</p></div><ArrowUpRight size={16} /></article>)}</div></section></div>
    <section className="profile-panel posts-panel"><div className="panel-heading"><div><h2>Technical publications</h2><p>Recent notes and write-ups from this developer.</p></div><Link to="/add-post" className="text-link">Publish an article <ArrowUpRight size={15} /></Link></div><div className="post-grid">{posts.map((post) => <article className="publication-card" key={post.id}><span className="publication-tag">ENGINEERING NOTES</span><h3>{post.title}</h3><p>{post.body}</p><span className="publication-read">Read summary <ArrowUpRight size={14} /></span></article>)}</div></section>
  </div>;
}
