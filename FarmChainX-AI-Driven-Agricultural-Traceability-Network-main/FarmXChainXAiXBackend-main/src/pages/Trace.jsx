import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Trace from '../components/Trace/Trace'

const TracePage = ({ user, onLogout, theme, setTheme, onUpdateUser }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Navbar user={user} onLogout={onLogout} theme={theme} setTheme={setTheme} onUpdateUser={onUpdateUser} />
      
      {/* Expand View Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
            Supply Chain Traceability
          </h1>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isExpanded ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
            {isExpanded ? 'Collapse View' : 'Expand View'}
          </button>
        </div>
      </div>

      {/* Trace Component */}
      <div className={isExpanded ? 'fixed inset-0 z-40 bg-white dark:bg-gray-900' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        <Trace user={user} isExpanded={isExpanded} onClose={() => setIsExpanded(false)} />
      </div>
    </div>
  )
}

export default TracePage
