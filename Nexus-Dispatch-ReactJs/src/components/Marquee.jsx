const loads = [
  { from: 'Dallas, TX', to: 'Chicago, IL', type: 'Dry Van', rate: '$3.45/mi' },
  { from: 'Atlanta, GA', to: 'Miami, FL', type: 'Reefer', rate: '$4.10/mi' },
  { from: 'Los Angeles, CA', to: 'Phoenix, AZ', type: 'Flatbed', rate: '$3.80/mi' },
  { from: 'Houston, TX', to: 'Denver, CO', type: 'Step Deck', rate: '$3.20/mi' },
  { from: 'Seattle, WA', to: 'Portland, OR', type: 'Dry Van', rate: '$4.50/mi' },
]

function MarqueeItems({ keyPrefix = '' }) {
  return loads.map((load, i) => (
    <div className="marquee-item" key={`${keyPrefix}${load.from}-${load.to}-${i}`}>
      <div className="status-dot"></div>{' '}
      <strong>
        {load.from} <i className="fas fa-arrow-right"></i> {load.to}
      </strong>{' '}
      | {load.type} | {load.rate} |{' '}
      <span style={{ color: 'var(--primary-color)' }}>BOOKED</span>
    </div>
  ))
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-content">
        <MarqueeItems keyPrefix="a-" />
      </div>
      <div className="marquee-content">
        <MarqueeItems keyPrefix="b-" />
      </div>
    </div>
  )
}
