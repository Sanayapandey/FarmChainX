import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const QRScanner = ({ onSuccess, onError }) => {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const fileInputRef = useRef(null)

  // Mock QR data for demonstration
  const mockQRData = {
    batchId: 'B001',
    cropName: 'Organic Tomatoes',
    origin: 'Maharashtra Farm',
    harvestDate: '2025-01-15',
    expiryDate: '2025-02-15',
    farmer: 'Rajesh Patel',
    location: 'Nashik, Maharashtra',
    certification: 'Organic Certified',
    supplyChain: [
      { stage: 'Harvested', date: '2025-01-15', location: 'Maharashtra Farm' },
      { stage: 'Processed', date: '2025-01-18', location: 'Mumbai Processing Center' },
      { stage: 'Shipped', date: '2025-01-20', location: 'In Transit' }
    ]
  }

  const startCamera = () => {
    setIsCameraActive(true)
    // Simulate camera activation
    setTimeout(() => {
      // Simulate successful scan
      onSuccess(mockQRData)
    }, 2000)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        // Simulate processing uploaded image
        setTimeout(() => {
          onSuccess(mockQRData)
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!isCameraActive && !uploadedImage ? (
        <div className="space-y-4">
          {/* Camera Option */}
          <button
            onClick={startCamera}
            className="w-full p-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-3"
          >
            <span>📷</span>
            Use Camera
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 dark:bg-gray-800/80 text-emerald-700/70 dark:text-emerald-300/70">
                or
              </span>
            </div>
          </div>

          {/* Upload Option */}
          <button
            onClick={triggerFileUpload}
            className="w-full p-4 border-2 border-dashed border-emerald-300 dark:border-gray-600 rounded-xl hover:border-emerald-400 dark:hover:border-gray-500 transition-colors flex items-center justify-center gap-3 text-emerald-700 dark:text-emerald-300"
          >
            <span>📁</span>
            Upload QR Image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      ) : isCameraActive ? (
        <div className="text-center">
          <div className="w-64 h-64 mx-auto bg-gray-900 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
            {/* Camera View Simulation */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm opacity-75">Camera Active</div>
                <div className="text-xs opacity-50 mt-1">Scanning for QR code...</div>
              </div>
            </div>
            
            {/* Scanning Animation */}
            <div className="absolute inset-0 border-2 border-emerald-400 rounded-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-emerald-400 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-1 h-full bg-emerald-400 animate-pulse"></div>
            </div>
          </div>
          
          <div className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
            Point camera at QR code
          </div>
        </div>
      ) : uploadedImage ? (
        <div className="text-center">
          <div className="w-64 h-64 mx-auto bg-gray-900 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
            <img 
              src={uploadedImage} 
              alt="Uploaded QR" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-2xl mb-1">🔍</div>
                <div className="text-sm">Processing...</div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
            Analyzing uploaded image
          </div>
        </div>
      ) : null}

      {/* Instructions */}
      <div className="mt-6 text-center">
        <div className="text-sm text-emerald-700/80 dark:text-emerald-300/80 mb-2">
          How to scan:
        </div>
        <div className="text-xs text-emerald-700/60 dark:text-emerald-300/60 space-y-1">
          <div>• Ensure good lighting</div>
          <div>• Hold camera steady</div>
          <div>• Center QR code in frame</div>
        </div>
      </div>
    </div>
  )
}

export default QRScanner


