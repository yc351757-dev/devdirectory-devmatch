import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const initials = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

export default function UserCard({ developer }) {
  return (
    <article className="developer-card">
      <div className="developer-card-top">
        <div className={`avatar avatar-${developer.color || 'violet'}`}>{initials(developer.name)}</div>
        <span className={`availability ${developer.availability === 'Available' ? 'available' : ''}`}><span />{developer.availability || 'Open to connect'}</span>
      </div>
      <div className="developer-identity">
        <h3>{developer.name}</h3>
        <p className="muted">@{developer.username || developer.name?.toLowerCase().replaceAll(' ', '')}</p>
        <p className="developer-role">{developer.role || 'Software Developer'}</p>
        <p className="company-line">{developer.company?.name || developer.company || 'Independent'} <span>·</span> <MapPin size={13} /> {developer.location || 'India'}</p>
      </div>
      <p className="developer-bio">{developer.bio || 'Developer interested in building useful products and collaborating with others.'}</p>
      <div className="skill-list">
        {(developer.skills || ['React', 'JavaScript', 'Git']).slice(0, 4).map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
        {(developer.skills?.length || 0) > 4 && <span className="skill-chip more-chip">+{developer.skills.length - 4}</span>}
      </div>
      <div className="developer-card-footer">
        <span className="project-count">✦ {developer.projects?.length || 1} projects</span>
        <Link to={`/users/${developer.id}`} className="text-link">View profile <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  );
}
