import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <div className="page-wrap not-found-page"><div className="not-found-code">404</div><div className="not-found-icon"><Compass size={25} /></div><h1>This route went off-grid.</h1><p>The page you are looking for does not exist, or the link may be outdated.</p><Link to="/" className="button button-primary"><ArrowLeft size={16} /> Back to overview</Link></div>;
}
