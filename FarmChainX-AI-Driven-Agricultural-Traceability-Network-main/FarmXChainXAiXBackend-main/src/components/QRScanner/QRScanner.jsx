import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QRScanner = ({ userRole, onScanResult }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsScanning(true)
        setError(null)
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.')
    }
  }

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
    }
    setIsScanning(false)
  }

  const simulateScan = () => {
    // Simulate QR code scan with sample data
    const sampleData = {
      name: 'Fresh Tomatoes',
      type: 'Vegetables',
      harvestDate: '2025-01-15',
      expiryDate: '2025-01-25',
      soilType: 'Sandy',
      pesticide: 'Neem-based organic spray',
      origin: 'Local Farm Co.',
      batchId: 'BATCH001',
      supplyChain: [
        { stage: 'Harvested', location: 'Local Farm', timestamp: '2025-01-15T08:00:00Z', handler: 'Farmer Singh' },
        { stage: 'Shipped', location: 'Warehouse A', timestamp: '2025-01-20T10:30:00Z', handler: 'Transport Co.' },
        { stage: 'Delivered', location: 'Retail Store', timestamp: '2025-01-22T14:00:00Z', handler: 'Retail Manager' }
      ]
    }
    
    setScanResult(sampleData)
    onScanResult && onScanResult(sampleData)
  }

  const getRoleBasedInfo = (data) => {
    const baseInfo = {
      name: data.name,
      type: data.type,
      harvestDate: data.harvestDate,
      expiryDate: data.expiryDate,
      origin: data.origin,
      batchId: data.batchId
    }

    switch (userRole) {
      case 'Consumer':
        return {
          ...baseInfo,
          nutrition: {
            calories: 22,
            protein: '1.1g',
            fiber: '1.2g',
            vitaminC: '13.7mg'
          },
          cookingMethods: ['Salad', 'Sauce', 'Soup', 'Grilled'],
          storageTips: 'Store at room temperature until ripe, then refrigerate',
          seasonalAvailability: 'Year-round'
        }
      case 'Farmer':
        return {
          ...baseInfo,
          soilType: data.soilType,
          pesticide: data.pesticide,
          cropRotation: 'Plant after legumes for nitrogen fixation',
          expectedYield: '8-12 tons per hectare',
          marketPrice: '$2.50/kg',
          bestPractices: ['Regular watering', 'Organic pest control', 'Proper spacing']
        }
      case 'Retailer':
        return {
          ...baseInfo,
          supplier: data.origin,
          inventoryStatus: 'In Stock',
          reorderPoint: 50,
          storageConditions: 'Temperature: 10-15°C, Humidity: 85-90%',
          logisticsInfo: 'Shelf life: 7-10 days, Transport: Refrigerated truck'
        }
      default:
        return baseInfo
    }
  }

  const renderScanResult = () => {
    if (!scanResult) return null

    const roleInfo = getRoleBasedInfo(scanResult)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
              {roleInfo.name}
            </h3>
            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
              Batch ID: {roleInfo.batchId}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-gray-700 dark:text-emerald-300">
            {userRole}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Type:</p>
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{roleInfo.type}</p>
          </div>
          <div>
            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Origin:</p>
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{roleInfo.origin}</p>
          </div>
          <div>
            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Harvest Date:</p>
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{roleInfo.harvestDate}</p>
          </div>
          <div>
            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Expiry Date:</p>
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{roleInfo.expiryDate}</p>
          </div>
        </div>

        {/* Role-specific information */}
        {userRole === 'Consumer' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Nutrition (per 100g)</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(roleInfo.nutrition).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-emerald-700/70 dark:text-emerald-300/70 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-emerald-900 dark:text-emerald-100 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Cooking Methods</h4>
              <div className="flex flex-wrap gap-2">
                {roleInfo.cookingMethods.map((method, index) => (
                  <span key={index} className="px-2 py-1 bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">
                    {method}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Storage Tips</h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">{roleInfo.storageTips}</p>
            </div>
          </div>
        )}

        {userRole === 'Farmer' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Soil Type:</p>
                <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{roleInfo.soilType}</p>
              </div>
              <div>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Pesticide:</p>
                <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{roleInfo.pesticide}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Crop Guidance</h4>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-700 dark:text-emerald-300">{roleInfo.cropRotation}</p>
                <p className="text-emerald-700 dark:text-emerald-300">Expected Yield: {roleInfo.expectedYield}</p>
                <p className="text-emerald-700 dark:text-emerald-300">Market Price: {roleInfo.marketPrice}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Best Practices</h4>
              <ul className="list-disc list-inside text-sm text-emerald-700 dark:text-emerald-300 space-y-1">
                {roleInfo.bestPractices.map((practice, index) => (
                  <li key={index}>{practice}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {userRole === 'Retailer' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Supplier:</p>
                <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{roleInfo.supplier}</p>
              </div>
              <div>
                <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Status:</p>
                <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{roleInfo.inventoryStatus}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Storage Conditions</h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">{roleInfo.storageConditions}</p>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Logistics Info</h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">{roleInfo.logisticsInfo}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setScanResult(null)}
            className="flex-1 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Scan Another
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setScanResult(null)
              stopScanning()
            }}
            className="px-4 py-2 border border-emerald-200 dark:border-gray-700 text-emerald-700 dark:text-emerald-300 text-sm font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startScanning}
          disabled={isScanning}
          className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isScanning ? 'Scanning...' : 'Start Camera'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={stopScanning}
          disabled={!isScanning}
          className="px-6 py-3 border border-emerald-200 dark:border-gray-700 text-emerald-700 dark:text-emerald-300 font-medium rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Stop Camera
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateScan}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Simulate Scan
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Camera View */}
      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative bg-black rounded-2xl overflow-hidden"
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'none' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-emerald-400 rounded-lg w-48 h-48 relative">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scan Result */}
      <AnimatePresence>
        {renderScanResult()}
      </AnimatePresence>
    </div>
  )
}

export default QRScanner
