import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCode } from 'react-qrcode-logo'

const QRModal = ({ crop, userRole, onClose }) => {
  const getCropDetails = () => {
    const baseDetails = {
      name: crop.name,
      type: crop.type,
      harvestDate: new Date(crop.harvestDate).toLocaleDateString(),
      expiryDate: new Date(crop.expiryDate).toLocaleDateString()
    }

    switch (userRole) {
      case 'Farmer':
        return { ...baseDetails, soilType: crop.soilType, pesticide: crop.pesticide, createdAt: new Date(crop.createdAt).toLocaleDateString(), role: 'Farmer - Full Access' }
      case 'Consumer':
        return { ...baseDetails, role: 'Consumer - Basic Info' }
      case 'Wholesaler':
        return { ...baseDetails, soilType: crop.soilType, role: 'Wholesaler - Production Details' }
      case 'Retailer':
        return { ...baseDetails, soilType: crop.soilType, pesticide: crop.pesticide, role: 'Retailer - Quality Info' }
      default:
        return baseDetails
    }
  }

  const cropDetails = getCropDetails()

  // 🔥 Now QR will point to hosted product page instead of JSON
  const qrData = `https://anni-san.github.io/FarmXData/${crop.id}`

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 24, stiffness: 260 }} className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e)=>e.stopPropagation()}>
          <div className="bg-gradient-to-r from-emerald-600 to-lime-600 p-5">
            <h2 className="text-xl font-extrabold text-white">Crop QR Code</h2>
            <p className="text-emerald-50/90 text-sm">{crop.name}</p>
          </div>

          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-xl border-2 border-emerald-100">
                <QRCode value={qrData} size={200} qrStyle="dots" eyeRadius={4} fgColor="#065F46" bgColor="#FFFFFF" />
              </div>
            </div>

            <div className="text-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">{cropDetails.role}</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-emerald-900">Crop Information</h3>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-sm">
                {Object.entries(cropDetails).map(([key, value]) => key !== 'role' && (
                  <div key={key} className="flex justify-between py-0.5">
                    <span className="font-medium text-emerald-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span className="text-emerald-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-emerald-50">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClose} className="w-full btn-primary bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700">Close</motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default QRModal
