import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useAuth } from '../../context/AuthContext'
import { useAppData } from '../../context/AppDataContext'

export default function CalendarPage() {
  const { user } = useAuth()
  const {
    availabilitySlots,
    meetingRequests,
    addAvailabilitySlot,
    modifyAvailabilitySlot,
    removeAvailabilitySlot,
    sendMeetingRequest,
    respondMeetingRequest,
  } = useAppData()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [slotForm, setSlotForm] = useState({ start: '09:00', end: '17:00' })
  const [editId, setEditId] = useState(null)
  const [requestForm, setRequestForm] = useState({
    title: '',
    date: '',
    time: '10:00',
    to: user?.role === 'investor' ? 'Sam Entrepreneur' : 'Alex Investor',
  })

  const dateStr = selectedDate.toISOString().slice(0, 10)
  const slotsForDate = availabilitySlots.filter((s) => s.date === dateStr)

  const handleAddSlot = (e) => {
    e.preventDefault()
    if (editId) {
      modifyAvailabilitySlot(editId, { date: dateStr, ...slotForm })
      setEditId(null)
    } else {
      addAvailabilitySlot({ date: dateStr, ...slotForm })
    }
    setSlotForm({ start: '09:00', end: '17:00' })
  }

  const handleSendRequest = (e) => {
    e.preventDefault()
    sendMeetingRequest({
      title: requestForm.title,
      from: user?.name,
      fromRole: user?.role,
      to: requestForm.to,
      toRole: user?.role === 'investor' ? 'entrepreneur' : 'investor',
      date: requestForm.date || dateStr,
      time: requestForm.time,
    })
    setRequestForm({ title: '', date: '', time: '10:00', to: requestForm.to })
  }

  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null
    const d = date.toISOString().slice(0, 10)
    const hasSlot = availabilitySlots.some((s) => s.date === d)
    const hasMeeting = meetingRequests.some(
      (m) => m.date === d && (m.status === 'accepted' || m.status === 'pending')
    )
    if (hasMeeting) return 'cal-has-meeting'
    if (hasSlot) return 'cal-has-slot'
    return null
  }

  return (
    <div className="portal-page">
      <div className="portal-page-header">
        <div>
          <h1>Meeting Scheduler</h1>
          <p>Manage availability, send requests, and confirm meetings.</p>
        </div>
      </div>

      <div className="calendar-layout">
        <section className="portal-card calendar-widget">
          <h2><i className="fas fa-calendar"></i> Calendar</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={tileClassName}
            className="nexus-calendar"
          />
          <p className="cal-legend">
            <span className="dot-slot"></span> Availability
            <span className="dot-meeting"></span> Meeting
          </p>
        </section>

        <div className="calendar-panels">
          <section className="portal-card">
            <h2><i className="fas fa-clock"></i> Availability — {dateStr}</h2>
            <form onSubmit={handleAddSlot} className="inline-form">
              <input
                type="time"
                className="form-control"
                value={slotForm.start}
                onChange={(e) => setSlotForm({ ...slotForm, start: e.target.value })}
                required
              />
              <span>to</span>
              <input
                type="time"
                className="form-control"
                value={slotForm.end}
                onChange={(e) => setSlotForm({ ...slotForm, end: e.target.value })}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm">
                {editId ? 'Update Slot' : 'Add Slot'}
              </button>
            </form>
            <ul className="portal-list">
              {slotsForDate.length === 0 ? (
                <li className="empty-state">No slots for this date.</li>
              ) : (
                slotsForDate.map((slot) => (
                  <li key={slot.id}>
                    <strong>{slot.start} – {slot.end}</strong>
                    <div className="slot-actions">
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setEditId(slot.id)
                          setSlotForm({ start: slot.start, end: slot.end })
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => removeAvailabilitySlot(slot.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="portal-card">
            <h2><i className="fas fa-paper-plane"></i> Send Meeting Request</h2>
            <form onSubmit={handleSendRequest} className="stack-form">
              <input
                className="form-control"
                placeholder="Meeting title"
                value={requestForm.title}
                onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                required
              />
              <input
                type="date"
                className="form-control"
                value={requestForm.date || dateStr}
                onChange={(e) => setRequestForm({ ...requestForm, date: e.target.value })}
                required
              />
              <input
                type="time"
                className="form-control"
                value={requestForm.time}
                onChange={(e) => setRequestForm({ ...requestForm, time: e.target.value })}
                required
              />
              <button type="submit" className="btn btn-primary">
                Send Request
              </button>
            </form>
          </section>

          <section className="portal-card">
            <h2><i className="fas fa-inbox"></i> Meeting Requests</h2>
            <ul className="portal-list request-list">
              {meetingRequests.map((m) => (
                <li key={m.id}>
                  <div>
                    <strong>{m.title}</strong>
                    <span>{m.from} → {m.to} · {m.date} {m.time}</span>
                  </div>
                  {m.status === 'pending' && user?.name !== m.from ? (
                    <div className="request-actions">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => respondMeetingRequest(m.id, 'accepted')}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => respondMeetingRequest(m.id, 'declined')}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span className={`badge badge-${m.status === 'accepted' ? 'success' : m.status === 'declined' ? 'danger' : 'warning'}`}>
                      {m.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
