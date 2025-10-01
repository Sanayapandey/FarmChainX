import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Settings from './Settings'

const Navbar = ({ user, onLogout, theme = 'light', setTheme = () => {}, onUpdateUser = () => {} }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const location = useLocation()

  const getRoleColor = (role) => {
    switch (role) {
      case 'Farmer':
        return 'bg-emerald-100 text-emerald-800'
      case 'Retailer':
        return 'bg-sky-100 text-sky-800'
      case 'Wholesaler':
        return 'bg-violet-100 text-violet-800'
      case 'Consumer':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/trace', label: 'Trace', icon: '🔍' },
    { path: '/verification', label: 'Verify', icon: '✅' }
  ]

  return (
    <nav className="relative z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-emerald-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-600 flex items-center justify-center shadow-md">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">FarmX</h1>
              <p className="text-xs text-emerald-800/70 dark:text-emerald-200/70">Smart Agriculture Platform</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  location.pathname === item.path
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:text-emerald-100'
                    : 'text-emerald-700 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-gray-700'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-emerald-200">
              {theme === 'light' ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m14.14 6.36l-.7-.7M6.22 6.22l-.7-.7m12.02 0l-.7.7M6.22 17.78l-.7.7M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
              )}
            </button>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-300">
                <div className="h-9 w-9 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">{user?.name || 'User'}</p>
                  <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70">{user?.email || 'user@example.com'}</p>
                </div>
                <svg className="h-4 w-4 text-emerald-500 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-emerald-100 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-3 border-b border-emerald-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">{user?.name || 'User'}</p>
                      <p className="text-sm text-emerald-700/80 dark:text-emerald-300/70">{user?.email || 'user@example.com'}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getRoleColor(user?.role)}`}>{user?.role || 'User'}</span>
                    </div>
                    <button onClick={() => { setShowUserMenu(false); setShowSettings(true) }} className="w-full text-left px-4 py-2 text-sm text-emerald-900 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-gray-700">Settings</button>
                    <button onClick={toggleTheme} className="w-full text-left px-4 py-2 text-sm text-emerald-900 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-gray-700">Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
                    <div className="border-t border-emerald-100 dark:border-gray-700 mt-1 pt-1">
                      <button onClick={() => { setShowUserMenu(false); onLogout() }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Sign Out</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {showUserMenu && (<div className="fixed inset-0 z-30" onClick={() => setShowUserMenu(false)} />)}

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          user={user}
          onClose={() => setShowSettings(false)}
          onUpdateUser={onUpdateUser}
          theme={theme}
          setTheme={setTheme}
        />
      )}
    </nav>
  )
}

export default Navbar
