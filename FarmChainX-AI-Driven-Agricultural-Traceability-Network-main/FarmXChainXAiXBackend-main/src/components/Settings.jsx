import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Settings = ({ user, onClose, onUpdateUser, theme, setTheme }) => {
  const [settings, setSettings] = useState({
    role: user?.role || 'Farmer',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    preferences: {
      language: 'English',
      currency: 'USD',
      timezone: 'UTC'
    },
    privacy: {
      shareData: false,
      analytics: true
    }
  })

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const handleSave = () => {
    // Update user role if changed
    if (settings.role !== user?.role) {
      onUpdateUser({ ...user, role: settings.role })
    }
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-emerald-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-emerald-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Role Selection */}
            <div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Role</h3>
              <select
                value={settings.role}
                onChange={(e) => handleSettingChange('role', 'role', e.target.value)}
                className="w-full p-3 border border-emerald-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-emerald-900 dark:text-emerald-100"
              >
                <option value="Farmer">Farmer</option>
                <option value="Consumer">Consumer</option>
                <option value="Retailer">Retailer</option>
                <option value="Wholesaler">Wholesaler</option>
              </select>
            </div>

            {/* Theme */}
            <div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Theme</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    theme === 'light'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-emerald-200 dark:border-gray-600 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Light</span>
                  </div>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                    theme === 'dark'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-emerald-200 dark:border-gray-600 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-6 h-6 bg-gray-600 rounded-full mx-auto mb-2"></div>
                    <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">Dark</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Notifications</h3>
              <div className="space-y-3">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-emerald-900 dark:text-emerald-100 capitalize">{key} Notifications</p>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                        Receive {key} notifications for updates
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('notifications', key, !value)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">Language</label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-emerald-900 dark:text-emerald-100"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">Currency</label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) => handleSettingChange('preferences', 'currency', e.target.value)}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-emerald-900 dark:text-emerald-100"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">Timezone</label>
                  <select
                    value={settings.preferences.timezone}
                    onChange={(e) => handleSettingChange('preferences', 'timezone', e.target.value)}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-emerald-900 dark:text-emerald-100"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="IST">IST</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">Privacy</h3>
              <div className="space-y-3">
                {Object.entries(settings.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-emerald-900 dark:text-emerald-100 capitalize">
                        {key === 'shareData' ? 'Share Data' : 'Analytics'}
                      </p>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                        {key === 'shareData' 
                          ? 'Allow sharing data for research purposes'
                          : 'Help improve the platform with analytics'
                        }
                      </p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('privacy', key, !value)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        value ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-emerald-100 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Settings
