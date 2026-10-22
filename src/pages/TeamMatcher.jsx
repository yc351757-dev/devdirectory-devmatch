import { useMemo, useState } from 'react';
import { ArrowRight, Bot, Check, ChevronDown, CircleHelp, ClipboardList, Sparkles, Target, Users, Zap } from 'lucide-react';
import UserCard from '../components/UserCard.jsx';
import { developerDetails, skillDictionary } from '../data/developers.js';

const defaultBrief = 'Build a college attendance dashboard using React and SQL. Students should log in, view attendance records, and see weekly trends in simple charts.';

function extractSkills(brief) {
  const normalized = brief.toLowerCase();
  return skillDictionary.filter(({ terms }) => terms.some((term) => normalized.includes(term))).map(({ skill }) => skill);
}

function analyzeBrief(brief) {
  const found = extractSkills(brief);
  const safeSkills = found.length ? found : ['React', 'API Integration', 'SQL'];
  const ranked = developerDetails.map((developer) => {
    const matched = developer.skills.filter((skill) => safeSkills.includes(skill));
    const matchRatio = matched.length / safeSkills.length;
    const extraCoverage = developer.skills.length ? Math.min(0.14, developer.skills.filter((skill) => ['Testing', 'Git', 'Documentation'].includes(skill)).length * 0.035) : 0;
    const score = Math.min(99, Math.round(55 + matchRatio * 40 + extraCoverage * 100));
    return { ...developer, matchScore: score, matchedSkills: matched, missingSkills: safeSkills.filter((skill) => !developer.skills.includes(skill)) };
  }).sort((a, b) => b.matchScore - a.matchScore || b.matchedSkills.length - a.matchedSkills.length);
  const selected = ranked.slice(0, 3);
  const coverage = new Set(selected.flatMap((person) => person.skills));
  const gaps = safeSkills.filter((skill) => !coverage.has(skill));
  const coveredCount = safeSkills.filter((skill) => coverage.has(skill)).length;
  return { skills: safeSkills, ranked, selected, gaps, coveragePercent: Math.round((coveredCount / safeSkills.length) * 100), roleText: /mobile|android|ios/i.test(brief) ? 'Mobile app development' : /data|prediction|machine learning|analytics/i.test(brief) ? 'Data-focused product' : /dashboard|website|web app|web application|portal/i.test(brief) ? 'Web application' : 'Software project' };
}

export default function TeamMatcher() {
  const [brief, setBrief] = useState(defaultBrief);
  const [analysis, setAnalysis] = useState(() => analyzeBrief(defaultBrief));
  const [hasRun, setHasRun] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const computed = useMemo(() => analyzeBrief(brief), [brief]);

  const runAnalysis = (event) => {
    event.preventDefault();
    setAnalysis(computed);
    setHasRun(true);
    setShowAll(false);
  };

  return <div className="page-wrap inner-page matcher-page">
    <div className="page-title-row matcher-title"><div><div className="eyebrow"><span className="eyebrow-dot" /> DEVMatch INTELLIGENCE LAB</div><h1>Build your <span>dream team.</span></h1><p>Describe your project in plain English. Get an explainable shortlist and find the skills your team still needs.</p></div><div className="matcher-stamp"><Bot size={20} /><span><strong>Rule-based demo engine</strong><small>No paid API key required</small></span></div></div>

    <div className="matcher-layout">
      <section className="matcher-input-panel">
        <div className="panel-heading matcher-panel-heading"><div><span className="panel-kicker">STEP 01</span><h2>Tell us what you're building</h2></div><span className="live-dot" /></div>
        <form onSubmit={runAnalysis}>
          <label htmlFor="project-brief" className="field-label">PROJECT BRIEF <span>Be as descriptive as you like</span></label>
          <textarea id="project-brief" className="brief-textarea" value={brief} onChange={(event) => { setBrief(event.target.value); setHasRun(false); }} minLength={20} maxLength={1200} required placeholder="Example: I want to build a student portal with React, SQL, login and analytics..." />
          <div className="textarea-footer"><span><ClipboardList size={14} /> {brief.length}/1200 characters</span><button type="button" className="reset-brief" onClick={() => { setBrief(''); setAnalysis(null); setHasRun(false); }}>Clear brief</button></div>
          <div className="suggestion-label">TRY A STARTER BRIEF</div>
          <div className="starter-chips"><button type="button" onClick={() => { setBrief('Create a React website with a dashboard, SQL database, API integration, and responsive UI/UX.'); setHasRun(false); }}>Web dashboard <ArrowRight size={13} /></button><button type="button" onClick={() => { setBrief('Build a Python machine learning project to analyze student performance and create data visualization charts.'); setHasRun(false); }}>Data project <ArrowRight size={13} /></button><button type="button" onClick={() => { setBrief('Design a campus event booking app with Figma prototype, React interface, and API testing.'); setHasRun(false); }}>Campus app <ArrowRight size={13} /></button></div>
          <button className="button button-primary run-match-button" disabled={brief.trim().length < 20} type="submit"><Sparkles size={17} /> Analyze project & find teammates <ArrowRight size={17} /></button>
          <p className="matcher-disclaimer"><CircleHelp size={14} /> Demo matching uses project keywords and the local skills dataset. Scores are recommendations, not guarantees.</p>
        </form>
      </section>

      <section className="analysis-panel">
        <div className="analysis-panel-header"><div><span className="panel-kicker">STEP 02</span><h2>Project intelligence</h2></div><span className="analysis-status"><span /> {hasRun && analysis ? 'ANALYSIS READY' : 'WAITING FOR BRIEF'}</span></div>
        {!hasRun || !analysis ? <div className="analysis-empty"><div className="analysis-empty-icon"><Target size={26} /></div><h3>Your project breakdown will appear here</h3><p>Enter at least 20 characters, then run the analyzer to discover required skills and suitable developers.</p></div> : <>
          <div className="role-detected"><span className="role-icon"><Zap size={16} /></span><div><small>DETECTED PROJECT TYPE</small><strong>{analysis.roleText}</strong></div><span className="confidence-pill">Demo analysis</span></div>
          <div className="analysis-section-label">REQUIRED SKILLS <span>{analysis.skills.length} identified</span></div>
          <div className="required-skill-chips">{analysis.skills.map((skill) => <span key={skill}><Check size={13} />{skill}</span>)}</div>
          <div className="coverage-card"><div className="coverage-header"><div><span className="coverage-title">Team skill coverage</span><p>How much of the brief is covered by the top 3 matches</p></div><strong>{analysis.coveragePercent}<small>%</small></strong></div><div className="coverage-track"><span style={{ width: `${analysis.coveragePercent}%` }} /></div><div className="coverage-foot"><span>{analysis.skills.length - analysis.gaps.length} of {analysis.skills.length} skills covered</span><span>{analysis.gaps.length ? `${analysis.gaps.length} gap${analysis.gaps.length > 1 ? 's' : ''} remaining` : 'All skills covered'}</span></div></div>
          {analysis.gaps.length > 0 ? <div className="skill-gap-box"><div className="gap-icon"><CircleHelp size={17} /></div><div><strong>Potential skill gap</strong><p>Your shortlist could use extra coverage in <b>{analysis.gaps.join(', ')}</b>. Confirm the gap with your team before assigning roles.</p></div></div> : <div className="skill-gap-box gap-success"><div className="gap-icon"><Check size={17} /></div><div><strong>Good skill coverage</strong><p>The suggested shortlist covers the skills detected in your brief.</p></div></div>}
        </>}
      </section>
    </div>

    {hasRun && analysis && <section className="matches-section"><div className="section-heading"><div><div className="eyebrow">STEP 03 · RECOMMENDED SHORTLIST</div><h2>Your potential <span>teammates.</span></h2></div><div className="shortlist-count"><Users size={16} /> TOP {showAll ? analysis.ranked.length : analysis.selected.length} MATCHES</div></div><div className="match-reason-banner"><Sparkles size={17} /><p><strong>Why these people?</strong> Developers are ranked by overlap with the detected skill requirements. Each score is explainable from the profile's listed skills.</p></div><div className="developer-grid">{(showAll ? analysis.ranked : analysis.selected).map((developer, index) => <article className="match-card-wrap" key={developer.id}><div className="match-card-score"><span>{index === 0 ? 'BEST FIT' : `MATCH ${index + 1}`}</span><strong>{developer.matchScore}<small>%</small></strong></div><UserCard developer={developer} /><div className="match-card-reason"><strong><Check size={14} /> Matched skills</strong><div>{developer.matchedSkills.length ? developer.matchedSkills.map((skill) => <span key={skill}>{skill}</span>) : <span>Transferable skills</span>}</div><p>{developer.matchedSkills.length} of {analysis.skills.length} detected skills listed on profile.</p></div></article>)}</div><button className="button button-secondary show-more-button" onClick={() => setShowAll((current) => !current)}>{showAll ? 'Show top 3 only' : 'Compare all demo developers'} <ChevronDown className={showAll ? 'rotate-chevron' : ''} size={16} /></button></section>}
  </div>;
}
