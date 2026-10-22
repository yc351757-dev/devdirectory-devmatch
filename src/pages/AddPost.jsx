import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, FilePlus2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDevelopers, createPost } from '../services/postService.js';
import { useAuth } from '../context/AuthContext.jsx';
import AlertBanner from '../components/AlertBanner.jsx';

export default function AddPost() {
  const { user } = useAuth();
  const [developers, setDevelopers] = useState([]);
  const [author, setAuthor] = useState('1');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => { let active = true; getDevelopers().then((list) => { if (active) setDevelopers(list); }).catch(() => { if (active) setError('Could not load authors. Please refresh and retry.'); }).finally(() => { if (active) setLoadingAuthors(false); }); return () => { active = false; }; }, []);

  const titleError = title.length > 0 && (title.trim().length < 5 || title.length > 80) ? 'Title must be 5–80 characters.' : '';
  const bodyError = body.length > 0 && (body.trim().length < 20 || body.length > 500) ? 'Body must be 20–500 characters.' : '';
  const valid = Boolean(author) && title.trim().length >= 5 && title.length <= 80 && body.trim().length >= 20 && body.length <= 500;
  const submit = async (event) => {
    event.preventDefault(); if (!valid || submitting) return;
    setSubmitting(true); setError(''); setSuccess(false);
    try {
      const result = await createPost({ title: title.trim(), body: body.trim(), userId: Number(author) });
      if (result.status === 201) { setSuccess(true); setTitle(''); setBody(''); setAuthor('1'); }
      else setError('The post was not created. Please try again.');
    } catch { setError('The demo API could not save your post. Check your connection and retry.'); }
    finally { setSubmitting(false); }
  };

  return <div className="page-wrap inner-page add-post-page"><Link to="/users" className="back-link"><ArrowLeft size={16} /> Back to developers</Link><div className="post-page-heading"><div><div className="eyebrow">COMMUNITY CONTRIBUTIONS</div><h1>Publish an <span>engineering note.</span></h1><p>Share a build log, lesson learned or project write-up with the developer community.</p></div><div className="post-heading-icon"><FilePlus2 size={25} /></div></div>
    {success && <AlertBanner type="success" onDismiss={() => setSuccess(false)}><strong>Post created successfully.</strong> The demo API returned HTTP 201 Created. The form has been reset.</AlertBanner>}{error && <AlertBanner type="error" onDismiss={() => setError('')}>{error}</AlertBanner>}
    <div className="post-layout"><form className="post-form-card" onSubmit={submit} noValidate><div className="panel-heading"><div><h2>Article details</h2><p>Fields marked required need valid content.</p></div><span className="required-label">* REQUIRED</span></div>
      <label htmlFor="author" className="field-label">AUTHOR (USER) <span>Choose who is publishing</span></label><select id="author" className="form-select" value={author} onChange={(event) => setAuthor(event.target.value)} disabled={loadingAuthors} required>{loadingAuthors ? <option>Loading authors...</option> : developers.map((developer) => <option value={developer.id} key={developer.id}>{developer.name} — {developer.role || 'Developer'}</option>)}</select>
      <label htmlFor="post-title" className="field-label">ARTICLE TITLE <span>5–80 characters</span></label><input id="post-title" className={titleError ? 'invalid-field' : ''} value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} minLength={5} placeholder="e.g. What I learned building my first API" required aria-describedby="title-count title-error" />{titleError && <small className="field-error" id="title-error">{titleError}</small>}<div id="title-count" className="input-count">{title.length}/80 characters</div>
      <label htmlFor="post-body" className="field-label">BODY CONTENT <span>20–500 characters</span></label><textarea id="post-body" className={`post-body-input ${bodyError ? 'invalid-field' : ''}`} value={body} onChange={(event) => setBody(event.target.value)} maxLength={500} minLength={20} placeholder="Explain what you built, why you made certain decisions, what worked, and what you would improve next time..." required aria-describedby="body-count body-error" />{bodyError && <small className="field-error" id="body-error">{bodyError}</small>}<div id="body-count" className="input-count">{body.length}/500 characters</div>
      <div className="form-actions"><button type="button" className="button button-secondary" onClick={() => { setTitle(''); setBody(''); setError(''); setSuccess(false); }}>Reset fields</button><button type="submit" className="button button-primary" disabled={!valid || submitting || loadingAuthors}>{submitting ? 'Publishing...' : 'Publish article'} <Send size={15} /></button></div>
      </form>
      <aside className="post-sidebar"><div className="author-preview"><div className="preview-top"><span>POSTING AS</span><CheckCircle2 size={17} /></div><div className="preview-avatar">{(user?.name || 'S').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</div><strong>{user?.name || 'Student Developer'}</strong><span className="preview-email">{user?.email || 'student@example.com'}</span><p>You are signed in with the local demo session. Choose the article's author from the form.</p></div><div className="publishing-tips"><h3>Make your note useful</h3><ul><li>Start with the problem you wanted to solve.</li><li>Mention the stack, trade-offs and one lesson learned.</li><li>Never include passwords, tokens or private data.</li></ul></div><div className="post-spec-note"><span><CheckCircle2 size={16} /> Form validation enabled</span><span><CheckCircle2 size={16} /> Axios POST request</span><span><CheckCircle2 size={16} /> HTTP 201 success state</span></div></aside></div>
  </div>;
}
