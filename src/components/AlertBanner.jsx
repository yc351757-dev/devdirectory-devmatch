import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function AlertBanner({ type = 'error', children, onDismiss, action }) {
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
  return <div className={`alert-banner alert-${type}`} role={type === 'error' ? 'alert' : 'status'}><Icon size={18} /><div className="alert-message">{children}</div>{action}{onDismiss && <button className="alert-close" aria-label="Dismiss message" onClick={onDismiss}><X size={16} /></button>}</div>;
}
