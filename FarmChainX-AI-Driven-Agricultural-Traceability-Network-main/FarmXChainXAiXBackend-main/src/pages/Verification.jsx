import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import QRScanner from '../components/QRScanner/QRScanner'
import ProductVerification from '../components/Verification/ProductVerification'

const Verification = ({ user, onLogout, theme, setTheme, onUpdateUser }) => {
  const [scannedData, setScannedData] = useState(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleScanSuccess = (data) => {
    setScannedData(data)
    setIsScanning(false)
  }

  const handleScanError = (error) => {
    console.error('QR Scan Error:', error)
    // You could show a toast notification here
  }

  const resetScan = () => {
    setScannedData(null)
    setIsScanning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Navbar user={user} onLogout={onLogout} theme={theme} setTheme={setTheme} onUpdateUser={onUpdateUser} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent mb-4">
            Product Verification Portal
          </h1>
          <p className="text-lg text-emerald-700/80 dark:text-emerald-200/80 max-w-2xl mx-auto">
            Scan QR codes to verify product authenticity, trace supply chain, and get detailed insights about your food
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!scannedData && !isScanning ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                {/* Welcome Section */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl border border-emerald-100 dark:border-gray-700 p-12 shadow-lg mb-8">
                  <div className="text-6xl mb-6">🌾</div>
                  <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                    Verify Your Food's Journey
                  </h2>
                  <p className="text-emerald-700/80 dark:text-emerald-300/80 mb-8 max-w-lg mx-auto">
                    Every FarmX product has a unique QR code that reveals its complete story - from farm to your table
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔍</div>
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Scan QR Code</h3>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Use your camera to scan the product QR code</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">📊</div>
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Get Details</h3>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">View origin, harvest date, and supply chain</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">✅</div>
                      <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Verify Authenticity</h3>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Ensure your food is genuine and safe</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsScanning(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-lime-600 text-white text-lg font-semibold rounded-2xl hover:from-emerald-700 hover:to-lime-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    <span>📱</span>
                    Start Scanning
                  </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">🌱 Farm to Table Transparency</h3>
                    <p className="text-emerald-700/80 dark:text-emerald-300/80 text-sm">
                      See exactly where your food was grown, when it was harvested, and every step of its journey
                    </p>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">🔒 Authenticity Guarantee</h3>
                    <p className="text-emerald-700/80 dark:text-emerald-300/80 text-sm">
                      Verify that your product is genuine and hasn't been tampered with during transport
                    </p>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">📈 Quality Insights</h3>
                    <p className="text-emerald-700/80 dark:text-emerald-300/80 text-sm">
                      Get AI-powered recommendations on freshness, storage, and optimal consumption
                    </p>
                  </div>
                  
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-3">💬 Community Feedback</h3>
                    <p className="text-emerald-700/80 dark:text-emerald-300/80 text-sm">
                      Share your experience and read reviews from other consumers
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : isScanning ? (
              <motion.div
                key="scanner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-3xl border border-emerald-100 dark:border-gray-700 p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-6">
                    Scan QR Code
                  </h2>
                  <QRScanner 
                    userRole={user?.role || 'Consumer'}
                    onScanResult={handleScanSuccess}
                  />
                  <button
                    onClick={resetScan}
                    className="mt-6 px-6 py-2 border border-emerald-200 dark:border-gray-700 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="verification"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <ProductVerification 
                  data={scannedData}
                  onReset={resetScan}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Verification


