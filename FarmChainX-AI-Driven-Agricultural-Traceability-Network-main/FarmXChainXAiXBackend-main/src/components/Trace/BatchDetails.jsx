import React from 'react'
import { motion } from 'framer-motion'

const BatchDetails = ({ batch }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'in_transit': { color: 'bg-emerald-100 text-emerald-800', icon: '🚚' },
      'processing': { color: 'bg-blue-100 text-blue-800', icon: '⚙️' },
      'delivered': { color: 'bg-green-100 text-green-800', icon: '✅' }
    }
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: '❓' }
    
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <span>{config.icon}</span>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    )
  }

  const supplyChainEvents = [
    {
      id: 1,
      stage: 'Harvested',
      location: batch.origin,
      timestamp: batch.harvestDate,
      handler: 'Farm Worker',
      notes: 'Fresh harvest completed'
    },
    {
      id: 2,
      stage: 'Shipped',
      location: batch.location,
      timestamp: batch.timestamp,
      handler: batch.handler,
      notes: 'Batch shipped to next destination'
    }
  ]

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
            Batch {batch.id}
          </h3>
          <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
            {batch.cropName} • {batch.origin}
          </p>
        </div>
        {getStatusBadge(batch.status)}
      </div>

      {/* Product Image */}
      <div className="mb-4">
        <img 
          src={batch.image} 
          alt={batch.cropName}
          className="w-full h-32 object-cover rounded-xl"
        />
      </div>

      {/* Key Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-lg p-3">
          <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70 mb-1">Harvest Date</p>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
            {formatDate(batch.harvestDate)}
          </p>
        </div>
        
        <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-lg p-3">
          <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70 mb-1">Expiry Date</p>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
            {formatDate(batch.expiryDate)}
          </p>
        </div>
        
        <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-lg p-3">
          <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70 mb-1">Current Location</p>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
            {batch.location}
          </p>
        </div>
        
        <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-lg p-3">
          <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70 mb-1">Handler</p>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
            {batch.handler}
          </p>
        </div>
      </div>

      {/* Supply Chain Timeline */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
          Supply Chain Timeline
        </h4>
        <div className="space-y-3">
          {supplyChainEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    {event.stage}
                  </p>
                  <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70">
                    {formatDate(event.timestamp)}
                  </p>
                </div>
                <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 mb-1">
                  {event.location} • {event.handler}
                </p>
                <p className="text-xs text-emerald-700/60 dark:text-emerald-300/60">
                  {event.notes}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors">
          View Full History
        </button>
        <button className="px-4 py-2 border border-emerald-200 dark:border-gray-700 text-emerald-700 dark:text-emerald-300 text-sm font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors">
          Export Data
        </button>
      </div>
    </div>
  )
}

export default BatchDetails


