import React from 'react'
import { motion } from 'framer-motion'

const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter, 
  locationFilter, 
  setLocationFilter 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Statuses', color: 'bg-gray-100 text-gray-800' },
    { value: 'in_transit', label: 'In Transit', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' }
  ]

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'gujarat', label: 'Gujarat' }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
            Search Batches
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by batch ID, crop, or origin..."
              className="w-full pl-10 pr-4 py-2 border border-emerald-200 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/90 text-emerald-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-emerald-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
            Status Filter
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-emerald-200 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/90 text-emerald-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
            Location Filter
          </label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-3 py-2 border border-emerald-200 dark:border-gray-700 rounded-lg bg-white/90 dark:bg-gray-800/90 text-emerald-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          >
            {locationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-emerald-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-emerald-700/70 dark:text-emerald-300/70">
          <span>Quick Actions:</span>
          <button 
            onClick={() => setSearchQuery('')}
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline"
          >
            Clear Search
          </button>
          <span>•</span>
          <button 
            onClick={() => {
              setSearchQuery('')
              setStatusFilter('all')
              setLocationFilter('all')
            }}
            className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 hover:underline"
          >
            Reset All
          </button>
        </div>
        
        <div className="text-xs text-emerald-700/60 dark:text-emerald-300/60">
          {searchQuery || statusFilter !== 'all' || locationFilter !== 'all' ? 'Filters Active' : 'No Filters'}
        </div>
      </div>
    </motion.div>
  )
}

export default SearchFilters


