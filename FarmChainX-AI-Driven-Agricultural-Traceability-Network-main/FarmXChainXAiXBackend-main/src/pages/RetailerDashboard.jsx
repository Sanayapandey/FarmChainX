import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import WeatherWidget from '../components/WeatherWidget'

const RetailerDashboard = ({ user, onLogout, theme, setTheme, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('inventory')
  const [searchQuery, setSearchQuery] = useState('')

  // Sample inventory data for retailers
  const inventory = [
    {
      id: 1,
      product: 'Fresh Tomatoes',
      image: 'https://agricultureguruji.com/wp-content/uploads/2018/09/tomato-2643774_1280.jpg.webp',
      quantity: 150,
      unit: 'kg',
      supplier: 'Local Farm Co.',
      arrivalDate: '2025-01-20',
      expiryDate: '2025-01-30',
      status: 'in_stock',
      price: '$2.50/kg',
      reorderPoint: 50,
      location: 'Warehouse A'
    },
    {
      id: 2,
      product: 'Organic Apples',
      image: 'https://extension.umn.edu/sites/extension.umn.edu/files/Two%20apples%20close-up_screen.jpg',
      quantity: 75,
      unit: 'kg',
      supplier: 'Himachal Farm',
      arrivalDate: '2025-01-15',
      expiryDate: '2025-02-15',
      status: 'low_stock',
      price: '$3.20/kg',
      reorderPoint: 100,
      location: 'Warehouse B'
    },
    {
      id: 3,
      product: 'Sweet Corn',
      image: 'https://naturespath.com/cdn/shop/articles/growing_corn-948938.jpg?v=1725927714&width=2000',
      quantity: 200,
      unit: 'pieces',
      supplier: 'Local Farm Co.',
      arrivalDate: '2025-01-18',
      expiryDate: '2025-01-25',
      status: 'in_stock',
      price: '$1.80/piece',
      reorderPoint: 100,
      location: 'Warehouse A'
    }
  ]

  const supplyChainUpdates = [
    {
      id: 1,
      product: 'Fresh Tomatoes',
      status: 'in_transit',
      origin: 'Local Farm Co.',
      destination: 'Warehouse A',
      estimatedArrival: '2025-01-22',
      handler: 'Transport Co.',
      trackingId: 'TRK001'
    },
    {
      id: 2,
      product: 'Organic Apples',
      status: 'processing',
      origin: 'Himachal Farm',
      destination: 'Warehouse B',
      estimatedArrival: '2025-01-25',
      handler: 'Quality Control',
      trackingId: 'TRK002'
    }
  ]

  const logisticsData = {
    totalOrders: 45,
    pendingDeliveries: 12,
    completedDeliveries: 33,
    averageDeliveryTime: '2.3 days',
    onTimeDeliveryRate: '94%'
  }

  const filteredInventory = inventory.filter(item =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800'
      case 'low_stock': return 'bg-yellow-100 text-yellow-800'
      case 'out_of_stock': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock': return '✅'
      case 'low_stock': return '⚠️'
      case 'out_of_stock': return '❌'
      default: return '❓'
    }
  }

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Navbar user={user} onLogout={onLogout} theme={theme} setTheme={setTheme} onUpdateUser={onUpdateUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.4 }} 
          className="hidden md:block w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm p-4 h-full sticky top-20 overflow-auto"
        >
          <nav className="space-y-2">
            {['inventory', 'supply_chain', 'logistics', 'analytics'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:text-emerald-100' 
                    : 'hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-emerald-100/80'
                }`}
              >
                {tab.replace('_', ' ').charAt(0).toUpperCase() + tab.replace('_', ' ').slice(1)}
              </button>
            ))}
          </nav>
          
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-700 border border-emerald-100 dark:border-gray-700">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">Retailer Tip</p>
            <p className="text-xs text-emerald-700 mt-1 dark:text-emerald-300/80">Monitor inventory levels to avoid stockouts!</p>
          </div>
          
          <WeatherWidget />
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 h-full overflow-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">
              Welcome, {user?.name || 'Retailer'}!
            </h1>
            <p className="text-emerald-700/80 dark:text-emerald-200/80 mt-1">
              Manage your inventory and track supply chain operations
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Total Orders</p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{logisticsData.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 dark:text-emerald-400 text-xl">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Pending Deliveries</p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{logisticsData.pendingDeliveries}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 dark:text-yellow-400 text-xl">🚚</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">On-Time Rate</p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{logisticsData.onTimeDeliveryRate}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xl">⏱️</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl border border-emerald-100 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Avg Delivery</p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{logisticsData.averageDeliveryTime}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">📊</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/90 dark:bg-gray-800/90 border border-emerald-200 dark:border-gray-700 rounded-xl text-emerald-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-emerald-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>

          {/* Content based on active tab */}
          <AnimatePresence mode="wait">
            {activeTab === 'inventory' && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {filteredInventory.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <img 
                        src={item.image} 
                        alt={item.product}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
                              {item.product}
                            </h3>
                            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                              Supplier: {item.supplier}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            <span className="mr-1">{getStatusIcon(item.status)}</span>
                            {item.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Quantity</p>
                            <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                              {item.quantity} {item.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Price</p>
                            <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                              {item.price}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Location</p>
                            <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                              {item.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Expiry</p>
                            <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                              {new Date(item.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'supply_chain' && (
              <motion.div
                key="supply_chain"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {supplyChainUpdates.map((update) => (
                  <motion.div
                    key={update.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
                          {update.product}
                        </h3>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                          Tracking ID: {update.trackingId}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        update.status === 'in_transit' ? 'bg-emerald-100 text-emerald-800' :
                        update.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {update.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Origin</p>
                        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                          {update.origin}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Destination</p>
                        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                          {update.destination}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Handler</p>
                        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                          {update.handler}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">ETA</p>
                        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                          {new Date(update.estimatedArrival).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'logistics' && (
              <motion.div
                key="logistics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                    Delivery Performance
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {logisticsData.onTimeDeliveryRate}
                      </p>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                        On-Time Delivery Rate
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {logisticsData.averageDeliveryTime}
                      </p>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                        Average Delivery Time
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {logisticsData.completedDeliveries}
                      </p>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                        Completed Deliveries
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                    Inventory Analytics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700 dark:text-emerald-300">Low Stock Items</span>
                      <span className="text-emerald-900 dark:text-emerald-100 font-semibold">
                        {inventory.filter(item => item.status === 'low_stock').length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700 dark:text-emerald-300">Total Inventory Value</span>
                      <span className="text-emerald-900 dark:text-emerald-100 font-semibold">
                        ${inventory.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-700 dark:text-emerald-300">Expiring Soon (7 days)</span>
                      <span className="text-emerald-900 dark:text-emerald-100 font-semibold">
                        {inventory.filter(item => {
                          const daysUntilExpiry = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
                          return daysUntilExpiry <= 7 && daysUntilExpiry > 0
                        }).length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default RetailerDashboard
