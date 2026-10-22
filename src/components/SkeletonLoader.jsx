export default function SkeletonLoader({ count = 3 }) {
  return <div className="developer-grid">{Array.from({ length: count }, (_, index) => <div className="developer-card skeleton-card" key={index}><div className="skeleton-line short" /><div className="skeleton-line medium" /><div className="skeleton-line" /><div className="skeleton-block" /><div className="skeleton-line medium" /></div>)}</div>;
}
