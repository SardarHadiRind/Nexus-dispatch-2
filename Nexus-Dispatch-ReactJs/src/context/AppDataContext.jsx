/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AppDataContext = createContext(null)

const STORAGE_KEY = 'nexus_app_data'

const defaultData = {
  availabilitySlots: [
    { id: '1', date: '2026-05-22', start: '09:00', end: '12:00' },
    { id: '2', date: '2026-05-23', start: '14:00', end: '17:00' },
  ],
  meetingRequests: [
    {
      id: '1',
      title: 'Q2 Funding Discussion',
      from: 'Alex Investor',
      fromRole: 'investor',
      to: 'Sam Entrepreneur',
      toRole: 'entrepreneur',
      date: '2026-05-24',
      time: '10:00',
      status: 'pending',
    },
  ],
  documents: [
    {
      id: '1',
      name: 'Dispatch Partnership Agreement.pdf',
      status: 'draft',
      signatureData: null,
      uploadedAt: '2026-05-18',
    },
  ],
  walletBalance: 125000,
  transactions: [
    {
      id: '1',
      type: 'deposit',
      amount: 50000,
      sender: 'External Bank',
      receiver: 'Wallet',
      status: 'completed',
      date: '2026-05-15',
    },
    {
      id: '2',
      type: 'transfer',
      amount: 25000,
      sender: 'Alex Investor',
      receiver: 'Sam Entrepreneur',
      status: 'completed',
      date: '2026-05-17',
    },
  ],
  fundingDeals: [
    {
      id: '1',
      title: 'Fleet Expansion Round',
      amount: 75000,
      investor: 'Alex Investor',
      entrepreneur: 'Sam Entrepreneur',
      status: 'pending',
    },
  ],
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData
  } catch {
    return defaultData
  }
}

export function AppDataProvider({ children }) {
  const [data, setData] = useState(loadData)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const update = useCallback((fn) => setData((prev) => fn(prev)), [])

  const addAvailabilitySlot = (slot) =>
    update((d) => ({
      ...d,
      availabilitySlots: [...d.availabilitySlots, { ...slot, id: crypto.randomUUID() }],
    }))

  const modifyAvailabilitySlot = (id, changes) =>
    update((d) => ({
      ...d,
      availabilitySlots: d.availabilitySlots.map((s) =>
        s.id === id ? { ...s, ...changes } : s
      ),
    }))

  const removeAvailabilitySlot = (id) =>
    update((d) => ({
      ...d,
      availabilitySlots: d.availabilitySlots.filter((s) => s.id !== id),
    }))

  const sendMeetingRequest = (request) =>
    update((d) => ({
      ...d,
      meetingRequests: [
        ...d.meetingRequests,
        { ...request, id: crypto.randomUUID(), status: 'pending' },
      ],
    }))

  const respondMeetingRequest = (id, status) =>
    update((d) => ({
      ...d,
      meetingRequests: d.meetingRequests.map((m) => (m.id === id ? { ...m, status } : m)),
    }))

  const confirmedMeetings = data.meetingRequests.filter((m) => m.status === 'accepted')

  const addDocument = (doc) => {
    const id = crypto.randomUUID()
    update((d) => ({
      ...d,
      documents: [
        ...d.documents,
        {
          ...doc,
          id,
          status: doc.status || 'draft',
          signatureData: null,
          uploadedAt: new Date().toISOString().slice(0, 10),
        },
      ],
    }))
    return id
  }

  const updateDocument = (id, changes) =>
    update((d) => ({
      ...d,
      documents: d.documents.map((doc) => (doc.id === id ? { ...doc, ...changes } : doc)),
    }))

  const addTransaction = (tx) =>
    update((d) => ({
      ...d,
      transactions: [{ ...tx, id: crypto.randomUUID(), date: new Date().toISOString().slice(0, 10) }, ...d.transactions],
    }))

  const setWalletBalance = (balance) => update((d) => ({ ...d, walletBalance: balance }))

  const fundDeal = (dealId) =>
    update((d) => {
      const deal = d.fundingDeals.find((f) => f.id === dealId)
      if (!deal || deal.status !== 'pending') return d
      return {
        ...d,
        walletBalance: d.walletBalance - deal.amount,
        fundingDeals: d.fundingDeals.map((f) =>
          f.id === dealId ? { ...f, status: 'funded' } : f
        ),
        transactions: [
          {
            id: crypto.randomUUID(),
            type: 'transfer',
            amount: deal.amount,
            sender: deal.investor,
            receiver: deal.entrepreneur,
            status: 'completed',
            date: new Date().toISOString().slice(0, 10),
          },
          ...d.transactions,
        ],
      }
    })

  const addFundingDeal = (deal) =>
    update((d) => ({
      ...d,
      fundingDeals: [...d.fundingDeals, { ...deal, id: crypto.randomUUID(), status: 'pending' }],
    }))

  return (
    <AppDataContext.Provider
      value={{
        ...data,
        confirmedMeetings,
        addAvailabilitySlot,
        modifyAvailabilitySlot,
        removeAvailabilitySlot,
        sendMeetingRequest,
        respondMeetingRequest,
        addDocument,
        updateDocument,
        addTransaction,
        setWalletBalance,
        fundDeal,
        addFundingDeal,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
