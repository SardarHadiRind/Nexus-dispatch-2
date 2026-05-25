import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="error-page container">
      <i className="fas fa-map-signs error-icon"></i>
      <h1 className="error-code">404</h1>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Route Not Found</h2>
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '1.125rem',
          maxWidth: 500,
          marginBottom: '2rem',
        }}
      >
        It looks like this lane is a dead end. The page you are looking for might have been moved
        or no longer exists.
      </p>
      <Link to="/" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
        <i className="fas fa-undo"></i> Return to Dispatch
      </Link>
    </div>
  )
}
