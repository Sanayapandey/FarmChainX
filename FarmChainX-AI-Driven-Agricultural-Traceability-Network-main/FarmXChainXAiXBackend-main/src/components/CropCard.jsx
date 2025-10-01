import React, { useState } from 'react'
import { motion } from 'framer-motion'
import QRModal from './QRModal'

const CropCard = ({ crop, userRole, onDelete, onEdit }) => {
  const [showQRModal, setShowQRModal] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Helper to get image path from crop name (case-insensitive, match your file names)
  const getImageSrc = (cropName) => {
    // Normalize name to lowercase, capitalize first letter for matching your file names if needed
    const formattedName = cropName.charAt(0).toUpperCase() + cropName.slice(1).toLowerCase()
    // Return path assuming images are in public folder
    return `/${formattedName}.jpeg`
  }

  return (
    <>
      <motion.div whileHover={{ y: -6 }} className="overflow-hidden rounded-2xl border border-emerald-100 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all group">
        <div className="relative h-40 bg-emerald-50 overflow-hidden">
          {/* Display image using getImageSrc helper */}
          <img
            src={crop.image || getImageSrc(crop.name)}
            alt={crop.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute left-3 bottom-3 px-2 py-0.5 rounded-lg text-xs font-semibold bg-white/90 text-emerald-700">{crop.type}</div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">{crop.name}</h3>
          <p className="text-sm text-emerald-700/80 dark:text-emerald-200/80 mt-1 line-clamp-2">{crop.description || 'Healthy crop'}</p>

          <div className="grid grid-cols-2 gap-2 text-xs text-emerald-700/80 dark:text-emerald-200/80 mt-4">
            <div className="bg-emerald-50 dark:bg-gray-700 rounded-lg p-2">Harvest: {formatDate(crop.harvestDate)}</div>
            <div className="bg-emerald-50 dark:bg-gray-700 rounded-lg p-2">Expiry: {formatDate(crop.expiryDate)}</div>
          </div>

          <div className="flex gap-2 mt-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => setShowQRModal(true)} className="flex-1 text-sm py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-lime-600 text-white font-semibold hover:from-emerald-700 hover:to-lime-700">QR Code</motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => onEdit && onEdit(crop)} className="px-3 py-2 text-sm rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100">Edit</motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => onDelete(crop.id)} className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Delete</motion.button>
          </div>
        </div>
      </motion.div>

      {showQRModal && (<QRModal crop={crop} userRole={userRole} onClose={() => setShowQRModal(false)} />)}
    </>
  )
}

export default CropCard
