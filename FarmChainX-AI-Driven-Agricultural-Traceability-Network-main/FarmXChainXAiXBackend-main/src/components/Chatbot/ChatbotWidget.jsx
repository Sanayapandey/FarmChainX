import React, { useEffect, useMemo, useRef, useState } from 'react'
import ChatPanel from './ChatPanel'

const ChatbotWidget = ({ user, crops = [] }) => {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState(user?.role || 'Farmer')

  useEffect(() => {
    const storedRole = localStorage.getItem('cropAppChatRole')
    if (storedRole) setRole(storedRole)
  }, [])

  useEffect(() => {
    localStorage.setItem('cropAppChatRole', role)
  }, [role])

  return (
    <div className="fixed z-50 bottom-5 right-5">
      {open && (
        <div className="mb-3 w-[92vw] sm:w-[420px] max-h-[75vh] rounded-3xl shadow-2xl border border-emerald-200 dark:border-gray-700 overflow-hidden bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-800">
          <ChatPanel role={role} setRole={setRole} user={user} crops={crops} onClose={() => setOpen(false)} />
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-4 py-3 rounded-full shadow-xl bg-gradient-to-r from-emerald-600 to-lime-600 text-white hover:from-emerald-700 hover:to-lime-700">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.84L3 20l.87-3.48A7.64 7.64 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </span>
        {open ? 'Close Assistant' : 'Ask FarmX AI'}
      </button>
    </div>
  )
}

export default ChatbotWidget


