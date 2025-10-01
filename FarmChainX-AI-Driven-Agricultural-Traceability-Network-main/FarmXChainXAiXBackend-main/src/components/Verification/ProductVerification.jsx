import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

const ProductVerification = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getExpiryStatus = (days) => {
    if (days < 0) return { status: 'expired', color: 'text-red-600', bg: 'bg-red-100', icon: '❌' }
    if (days <= 3) return { status: 'expiring soon', color: 'text-orange-600', bg: 'bg-orange-100', icon: '⚠️' }
    if (days <= 7) return { status: 'expiring this week', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: '⚠️' }
    return { status: 'fresh', color: 'text-green-600', bg: 'bg-green-100', icon: '✅' }
  }

  const expiryStatus = getExpiryStatus(getDaysUntilExpiry(data.expiryDate))

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'supply-chain', label: 'Supply Chain', icon: '🔄' },
    { id: 'quality', label: 'Quality & Safety', icon: '🔒' },
    { id: 'reviews', label: 'Reviews', icon: '💬' }
  ]

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl border border-emerald-100 dark:border-gray-700 p-8 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🍅</div>
        <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">
          {data.cropName}
        </h2>
        <p className="text-emerald-700/80 dark:text-emerald-300/80">
          Batch ID: {data.batchId} • {data.certification}
        </p>
      </div>

      {/* Authenticity Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          <span>✅</span>
          Authentic Product Verified
        </div>
      </div>

      {/* Expiry Alert */}
      <div className={`text-center mb-6 p-4 rounded-xl ${expiryStatus.bg}`}>
        <div className="text-2xl mb-2">{expiryStatus.icon}</div>
        <p className={`font-semibold ${expiryStatus.color} mb-1`}>
          {expiryStatus.status.toUpperCase()}
        </p>
        <p className="text-sm text-gray-700">
          {getDaysUntilExpiry(data.expiryDate) > 0 
            ? `Expires in ${getDaysUntilExpiry(data.expiryDate)} days`
            : 'Product has expired'
          }
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-emerald-50 dark:bg-gray-700 rounded-xl p-1 flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-gray-600'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-64">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-4">
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">🌱 Origin</h4>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80">{data.origin}</p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">Nashik, Maharashtra</p>
                </div>
                
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">👨‍🌾 Farmer</h4>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80">{data.farmer}</p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">Certified Organic Farmer</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">📅 Harvest Date</h4>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80">{formatDate(data.harvestDate)}</p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">Freshly harvested</p>
                </div>
                
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">🔒 Certification</h4>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80">{data.certification}</p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">Verified by FarmX</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'supply-chain' && (
            <motion.div
              key="supply-chain"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                Supply Chain Journey
              </h3>
              
              <div className="space-y-4">
                {data.supplyChain.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 dark:text-emerald-400 text-lg font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-emerald-900 dark:text-emerald-100">
                          {event.stage}
                        </h4>
                        <span className="text-sm text-emerald-700/60 dark:text-emerald-300/60">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <p className="text-emerald-700/80 dark:text-emerald-300/80">
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'quality' && (
            <motion.div
              key="quality"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                Quality & Safety Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">🧪 Pesticide Test</h4>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80">Passed</p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">No harmful residues detected</p>
                </div>
                
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">🌡️ Temperature</h4>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80">Maintained at 4°C</p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">Optimal storage conditions</p>
                </div>
                
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">📦 Packaging</h4>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80">Food-grade materials</p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">BPA-free containers</p>
                </div>
                
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">🚚 Transport</h4>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80">Refrigerated trucks</p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">GPS tracked delivery</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                Consumer Reviews
              </h3>
              
              <div className="space-y-4">
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {'⭐'.repeat(5)}
                    </div>
                    <span className="text-sm text-emerald-700/60 dark:text-emerald-300/60">5.0/5</span>
                  </div>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80 mb-2">
                    "Excellent quality tomatoes! Very fresh and flavorful. Love the transparency about origin."
                  </p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">- Priya S., Mumbai</p>
                </div>
                
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {'⭐'.repeat(4)}
                    </div>
                    <span className="text-sm text-emerald-700/60 dark:text-emerald-300/60">4.0/5</span>
                  </div>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80 mb-2">
                    "Good taste and texture. Appreciate the organic certification and traceability."
                  </p>
                  <p className="text-sm text-emerald-700/60 dark:text-emerald-300/60">- Amit K., Delhi</p>
                </div>
              </div>
              
              <button className="w-full px-4 py-2 border border-emerald-200 dark:border-gray-700 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors">
                Write a Review
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-emerald-100 dark:border-gray-700">
        <button
          onClick={onReset}
          className="flex-1 px-6 py-3 border border-emerald-200 dark:border-gray-700 text-emerald-700 dark:text-emerald-300 rounded-xl hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
        >
          Scan Another Product
        </button>
        <button className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
          Share Details
        </button>
      </div>
    </div>
  )
}

export default ProductVerification


