import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useAppData } from '../../context/AppDataContext'

export default function PaymentsPage() {
  const { user } = useAuth()
  const {
    walletBalance,
    transactions,
    fundingDeals,
    addTransaction,
    setWalletBalance,
    fundDeal,
  } = useAppData()

  const [tab, setTab] = useState('deposit')
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')

  const isInvestor = user?.role === 'investor'

  const processPayment = (e) => {
    e.preventDefault()
    const val = parseFloat(amount)
    if (!val || val <= 0) {
      setMessage('Enter a valid amount.')
      return
    }

    if (tab === 'deposit') {
      setWalletBalance(walletBalance + val)
      addTransaction({
        type: 'deposit',
        amount: val,
        sender: 'External Bank',
        receiver: 'Wallet',
        status: 'completed',
      })
      setMessage(`Deposited $${val.toLocaleString()} successfully.`)
    } else if (tab === 'withdraw') {
      if (val > walletBalance) {
        setMessage('Insufficient balance.')
        return
      }
      setWalletBalance(walletBalance - val)
      addTransaction({
        type: 'withdraw',
        amount: val,
        sender: 'Wallet',
        receiver: 'External Bank',
        status: 'completed',
      })
      setMessage(`Withdrew $${val.toLocaleString()} successfully.`)
    } else {
      if (val > walletBalance) {
        setMessage('Insufficient balance.')
        return
      }
      setWalletBalance(walletBalance - val)
      addTransaction({
        type: 'transfer',
        amount: val,
        sender: user?.name,
        receiver: recipient || 'Recipient',
        status: 'completed',
      })
      setMessage(`Transferred $${val.toLocaleString()} to ${recipient || 'recipient'}.`)
    }
    setAmount('')
    setRecipient('')
  }

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <div>
          <h1>Payments</h1>
          <p>Mock payment gateway — simulate deposits, withdrawals, and transfers.</p>
        </div>
      </div>

      <div className="payments-layout">
        <section className="portal-card wallet-card">
          <div className="wallet-display">
            <p>Available Balance</p>
            <h2>${walletBalance.toLocaleString()}</h2>
            <div className="wallet-brand">
              <i className="fab fa-stripe"></i>
              <span>Nexus Pay</span>
            </div>
          </div>
        </section>

        <section className="portal-card payment-form-card">
          <div className="payment-tabs">
            {['deposit', 'withdraw', 'transfer'].map((t) => (
              <button
                key={t}
                type="button"
                className={tab === t ? 'active' : ''}
                onClick={() => { setTab(t); setMessage('') }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={processPayment} className="stack-form payment-form">
            <div className="form-group">
              <label className="form-label">Amount (USD)</label>
              <div className="amount-input">
                <span>$</span>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {tab === 'transfer' && (
              <div className="form-group">
                <label className="form-label">Recipient</label>
                <input
                  className="form-control"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder={isInvestor ? 'Sam Entrepreneur' : 'Alex Investor'}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary payment-submit">
              <i className="fas fa-lock"></i> Confirm {tab}
            </button>
            {message && <p className="payment-message">{message}</p>}
          </form>

          <div className="payment-methods">
            <span><i className="fab fa-cc-visa"></i></span>
            <span><i className="fab fa-cc-mastercard"></i></span>
            <span><i className="fab fa-paypal"></i></span>
            <span><i className="fab fa-stripe"></i></span>
          </div>
        </section>

        {isInvestor && (
          <section className="portal-card funding-card">
            <h2><i className="fas fa-hand-holding-usd"></i> Fund a Deal</h2>
            <p className="funding-desc">Investor → Entrepreneur funding flow (simulation)</p>
            <ul className="funding-list">
              {fundingDeals.map((deal) => (
                <li key={deal.id}>
                  <div>
                    <strong>{deal.title}</strong>
                    <span>${deal.amount.toLocaleString()} → {deal.entrepreneur}</span>
                  </div>
                  {deal.status === 'pending' ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        if (deal.amount > walletBalance) {
                          setMessage('Insufficient balance to fund this deal.')
                          return
                        }
                        fundDeal(deal.id)
                        setMessage(`Funded "${deal.title}" — $${deal.amount.toLocaleString()} sent.`)
                      }}
                    >
                      Fund Deal
                    </button>
                  ) : (
                    <span className="badge badge-success">Funded</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="portal-card transactions-card">
          <h2><i className="fas fa-list"></i> Transaction History</h2>
          <div className="table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>
                    <td className="capitalize">{tx.type}</td>
                    <td>${tx.amount.toLocaleString()}</td>
                    <td>{tx.sender}</td>
                    <td>{tx.receiver}</td>
                    <td><span className="badge badge-success">{tx.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
