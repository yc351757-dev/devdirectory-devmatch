import { ArrowRight, ArrowUpRight, Bot, CheckCircle2, Compass, Search, ShieldCheck, Sparkles, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { developerDetails } from '../data/developers.js';
import UserCard from '../components/UserCard.jsx';

const steps = [
  { number: '01', icon: Search, title: 'Describe your idea', copy: 'Tell DevMatch what you want to build. No complex filters or technical jargon needed.' },
  { number: '02', icon: Bot, title: 'Find the right skills', copy: 'The matching engine extracts key skills and compares them with developer profiles.' },
  { number: '03', icon: Users, title: 'Build a balanced team', copy: 'See match reasons, missing skills and a team plan you can explain to your mentor.' }
];

export default function Home() {
  const featured = [developerDetails[0], developerDetails[2], developerDetails[4]];
  return <div className="page-wrap">
    <section className="hero-section">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> DEVELOPER DISCOVERY, REIMAGINED</div>
        <h1>Great projects start with <span>the right people.</span></h1>
        <p className="hero-description">Discover developers, understand your team's skill gaps, and turn a rough idea into a team that can actually build it.</p>
        <div className="hero-actions"><Link to="/match" className="button button-primary">Build my team <ArrowRight size={17} /></Link><Link to="/users" className="button button-secondary">Explore developers <ArrowUpRight size={16} /></Link></div>
        <div className="hero-proof"><div className="mini-avatars"><span className="mini-avatar av-one">LG</span><span className="mini-avatar av-two">CD</span><span className="mini-avatar av-three">CB</span><span className="mini-avatar av-four">+</span></div><span><strong>Student-built teams,</strong> smarter by design</span></div>
      </div>
      <div className="hero-visual">
        <div className="visual-glow" />
        <div className="match-window">
          <div className="window-header"><div className="window-dots"><i /><i /><i /></div><span>devmatch / team-builder</span><span className="live-label"><span /> LIVE DEMO</span></div>
          <div className="window-content">
            <div className="project-badge"><Sparkles size={14} /> PROJECT BRIEF</div>
            <h3>College attendance dashboard</h3>
            <p className="window-subtitle">A simple way for students to track attendance and spot trends.</p>
            <div className="detected-skills"><span>React</span><span>SQL</span><span>API Integration</span><span>Analytics</span></div>
            <div className="window-divider" />
            <div className="match-summary"><div><span className="summary-label">TEAM FIT</span><strong>92<span>%</span></strong></div><div className="summary-copy"><CheckCircle2 size={15} /> Strong frontend + data coverage<br /><span>1 skill gap detected</span></div></div>
            <div className="fit-meter"><span style={{ width: '92%' }} /></div>
            <div className="suggested-row"><div className="suggested-avatar avatar-violet">LG</div><div className="suggested-name"><strong>Leanne Graham</strong><span>Frontend Developer</span></div><span className="match-score">96% fit</span></div>
            <div className="suggested-row"><div className="suggested-avatar avatar-mint">CB</div><div className="suggested-name"><strong>Clementine Bauch</strong><span>Data Analyst</span></div><span className="match-score">91% fit</span></div>
            <div className="insight-line"><Zap size={14} /> <span>Consider adding a <strong>backend developer</strong> for API ownership.</span></div>
          </div>
        </div>
        <div className="floating-note note-top"><span className="floating-icon purple"><Bot size={16} /></span><span><strong>Skill gap found</strong><small>Backend / API ownership</small></span></div>
        <div className="floating-note note-bottom"><span className="floating-icon green"><ShieldCheck size={16} /></span><span><strong>Explainable matches</strong><small>Know why each person fits</small></span></div>
      </div>
      <div className="hero-grid-lines" />
    </section>

    <section className="stats-strip" aria-label="Platform highlights">
      <div className="stat-item"><strong>3-step</strong><span>team-building workflow</span></div><div className="stat-item"><strong>15+</strong><span>skills recognized in demo</span></div><div className="stat-item"><strong>100%</strong><span>match reasons explained</span></div><div className="stat-item"><strong>0 setup</strong><span>to try the local demo</span></div>
    </section>

    <section className="section-block how-section">
      <div className="section-heading"><div><div className="eyebrow">HOW IT WORKS</div><h2>From idea to <span>team plan.</span></h2></div><p>No black-box recommendations. DevMatch shows what the project needs and why each developer belongs on the shortlist.</p></div>
      <div className="steps-grid">{steps.map(({ number, icon: Icon, title, copy }) => <article className="step-card" key={number}><div className="step-top"><span>{number}</span><Icon size={21} /></div><h3>{title}</h3><p>{copy}</p><div className="step-bottom-line" /></article>)}</div>
    </section>

    <section className="section-block featured-section">
      <div className="section-heading"><div><div className="eyebrow">THE COMMUNITY</div><h2>Meet potential <span>teammates.</span></h2></div><Link to="/users" className="text-link">View all developers <ArrowRight size={16} /></Link></div>
      <div className="developer-grid">{featured.map((developer) => <UserCard key={developer.id} developer={developer} />)}</div>
    </section>

    <section className="cta-band"><div className="cta-orb"><Compass size={27} /></div><div><div className="eyebrow">YOUR NEXT PROJECT STARTS HERE</div><h2>Have an idea? Find your people.</h2><p>Build a shortlist, spot missing skills, and take a better team plan to your mentor.</p></div><Link to="/match" className="button button-light">Try the team matcher <ArrowRight size={17} /></Link></section>
  </div>;
}
