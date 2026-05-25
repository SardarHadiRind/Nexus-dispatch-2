import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAppData } from '../../context/AppDataContext'

export default function Dashboard() {
  const { user } = useAuth()
  const { walletBalance, confirmedMeetings, meetingRequests, documents, fundingDeals, transactions } =
    useAppData()

  const isInvestor = user?.role === 'investor'
  const pendingRequests = meetingRequests.filter((m) => m.status === 'pending')
  const pendingDocs = documents.filter((d) => d.status !== 'signed')
  const pendingDeals = fundingDeals.filter((f) => f.status === 'pending')

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p>
            {isInvestor
              ? 'Track investments, meetings, and funding deals.'
              : 'Manage your fleet partnerships, documents, and payouts.'}
          </p>
        </div>
        <span className={`portal-role-tag ${user?.role}`}>
          {isInvestor ? 'Investor Dashboard' : 'Entrepreneur Dashboard'}
        </span>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-icon wallet">
            <i className="fas fa-wallet"></i>
          </div>
          <div>
            <p>Wallet Balance</p>
            <h3>${walletBalance.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon meetings">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div>
            <p>Confirmed Meetings</p>
            <h3>{confirmedMeetings.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon docs">
            <i className="fas fa-file-signature"></i>
          </div>
          <div>
            <p>Active Documents</p>
            <h3>{pendingDocs.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon deals">
            <i className="fas fa-hand-holding-usd"></i>
          </div>
          <div>
            <p>{isInvestor ? 'Pending Deals' : 'Funding Requests'}</p>
            <h3>{pendingDeals.length}</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="portal-card">
          <div className="portal-card-header">
            <h2><i className="fas fa-calendar-check"></i> Confirmed Meetings</h2>
            <Link to="/dashboard/calendar" className="portal-link">View Calendar</Link>
          </div>
          {confirmedMeetings.length === 0 ? (
            <p className="empty-state">No confirmed meetings yet.</p>
          ) : (
            <ul className="portal-list">
              {confirmedMeetings.map((m) => (
                <li key={m.id}>
                  <strong>{m.title}</strong>
                  <span>{m.date} at {m.time}</span>
                  <span className="badge badge-success">Confirmed</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="portal-card">
          <div className="portal-card-header">
            <h2><i className="fas fa-inbox"></i> Meeting Requests</h2>
            <Link to="/dashboard/calendar" className="portal-link">Manage</Link>
          </div>
          {pendingRequests.length === 0 ? (
            <p className="empty-state">No pending requests.</p>
          ) : (
            <ul className="portal-list">
              {pendingRequests.slice(0, 3).map((m) => (
                <li key={m.id}>
                  <strong>{m.title}</strong>
                  <span>{m.from} → {m.to}</span>
                  <span className="badge badge-warning">Pending</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {isInvestor ? (
          <section className="portal-card">
            <div className="portal-card-header">
              <h2><i className="fas fa-chart-line"></i> Investment Overview</h2>
              <Link to="/dashboard/payments" className="portal-link">Payments</Link>
            </div>
            <ul className="portal-list">
              {fundingDeals.map((deal) => (
                <li key={deal.id}>
                  <strong>{deal.title}</strong>
                  <span>${deal.amount.toLocaleString()} → {deal.entrepreneur}</span>
                  <span className={`badge badge-${deal.status === 'funded' ? 'success' : 'warning'}`}>
                    {deal.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="portal-card">
            <div className="portal-card-header">
              <h2><i className="fas fa-truck"></i> Operations</h2>
              <Link to="/dashboard/documents" className="portal-link">Documents</Link>
            </div>
            <ul className="portal-list">
              {documents.map((doc) => (
                <li key={doc.id}>
                  <strong>{doc.name}</strong>
                  <span className={`badge badge-${doc.status === 'signed' ? 'success' : doc.status === 'in_review' ? 'info' : 'muted'}`}>
                    {doc.status.replace('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="portal-card">
          <div className="portal-card-header">
            <h2><i className="fas fa-history"></i> Recent Transactions</h2>
            <Link to="/dashboard/payments" className="portal-link">View All</Link>
          </div>
          <div className="table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 4).map((tx) => (
                  <tr key={tx.id}>
                    <td className="capitalize">{tx.type}</td>
                    <td>${tx.amount.toLocaleString()}</td>
                    <td><span className="badge badge-success">{tx.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="quick-actions">
        <Link to="/dashboard/video" className="btn btn-primary">
          <i className="fas fa-video"></i> Start Video Call
        </Link>
        <Link to="/dashboard/documents" className="btn btn-outline">
          <i className="fas fa-file-upload"></i> Upload Document
        </Link>
        <Link to="/dashboard/payments" className="btn btn-outline">
          <i className="fas fa-exchange-alt"></i> Transfer Funds
        </Link>
      </div>
    </div>
  )
}
