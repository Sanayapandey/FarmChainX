import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CropForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    id: undefined,
    name: '',
    type: '',
    soilType: '',
    pesticide: '',
    harvestDate: '',
    expiryDate: '',
    image: null,
    description: ''
  })
  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name || '',
        type: initialData.type || '',
        soilType: initialData.soilType || '',
        pesticide: initialData.pesticide || '',
        harvestDate: initialData.harvestDate || '',
        expiryDate: initialData.expiryDate || '',
        image: initialData.image || null,
        description: initialData.description || ''
      })
      if (typeof initialData.image === 'string') {
        setImagePreview(initialData.image)
      }
    }
  }, [initialData])

  const cropTypes = ['Fruits','Vegetables','Grains']
  const soilTypes = ['Clay','Sandy','Loamy','Silt','Peaty','Chalky','Black Soil']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return setErrors(prev => ({ ...prev, image: 'Image must be < 5MB' }))
    if (!file.type.startsWith('image/')) return setErrors(prev => ({ ...prev, image: 'Invalid image file' }))
    setFormData(prev => ({ ...prev, image: file }))
    const reader = new FileReader()
    reader.onload = ev => setImagePreview(ev.target.result)
    reader.readAsDataURL(file)
    if (errors.image) setErrors(prev => ({ ...prev, image: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Crop name is required'
    if (!formData.type) newErrors.type = 'Crop type is required'
    if (!formData.soilType) newErrors.soilType = 'Soil type is required'
    if (!formData.pesticide.trim()) newErrors.pesticide = 'Pesticide details required'
    if (!formData.harvestDate) newErrors.harvestDate = 'Harvest date required'
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date required'
    if (formData.harvestDate && formData.expiryDate && new Date(formData.harvestDate) >= new Date(formData.expiryDate)) newErrors.expiryDate = 'Expiry after harvest'
    if (!formData.image) newErrors.image = 'Image required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    onSubmit(formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 800)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-emerald-600 to-lime-600 p-5">
            <h2 className="text-xl font-extrabold text-white">{initialData ? 'Edit Crop' : 'Add New Crop'}</h2>
            <p className="text-emerald-50/90 text-sm">{initialData ? 'Update crop details' : 'Fill details to add a new crop'}</p>
          </div>

          {submitted && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="m-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200"
            >
              {initialData ? 'Changes saved!' : 'Crop added successfully!'}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Crop Name *</label>
                <input id="name" name="name" type="text" className={`input-field bg-white dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400 ${errors.name && 'border-red-500 focus:ring-red-500'}`} value={formData.name} onChange={handleChange} />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Crop Type *</label>
                <select id="type" name="type" className={`input-field bg-white dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400 ${errors.type && 'border-red-500 focus:ring-red-500'}`} value={formData.type} onChange={handleChange}>
                  <option value="">Select crop type</option>
                  {cropTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
              </div>
              <div>
                <label htmlFor="soilType" className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Soil Type *</label>
                <select id="soilType" name="soilType" className={`input-field bg-white dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400 ${errors.soilType && 'border-red-500 focus:ring-red-500'}`} value={formData.soilType} onChange={handleChange}>
                  <option value="">Select soil type</option>
                  {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.soilType && <p className="mt-1 text-sm text-red-600">{errors.soilType}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="pesticide" className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Pesticide Used *</label>
                <textarea id="pesticide" name="pesticide" rows="3" className={`input-field bg-white dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400 ${errors.pesticide && 'border-red-500 focus:ring-red-500'}`} value={formData.pesticide} onChange={handleChange} />
                {errors.pesticide && <p className="mt-1 text-sm text-red-600">{errors.pesticide}</p>}
              </div>
              <div>
                <label htmlFor="harvestDate" className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Harvest Date *</label>
                <input id="harvestDate" name="harvestDate" type="date" className={`input-field bg-white dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400 ${errors.harvestDate && 'border-red-500 focus:ring-red-500'}`} value={formData.harvestDate} onChange={handleChange} />
                {errors.harvestDate && <p className="mt-1 text-sm text-red-600">{errors.harvestDate}</p>}
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Expiry Date *</label>
                <input id="expiryDate" name="expiryDate" type="date" className={`input-field bg-white dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400 ${errors.expiryDate && 'border-red-500 focus:ring-red-500'}`} value={formData.expiryDate} onChange={handleChange} />
                {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Crop Image *</label>
                {!imagePreview ? (
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg hover:border-emerald-400 border-emerald-200 dark:border-gray-700">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-emerald-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-emerald-700 dark:text-emerald-200 justify-center gap-1 mt-2">
                        <label htmlFor="image" className="cursor-pointer font-semibold text-emerald-700 dark:text-emerald-200">
                          Upload a file
                          <input id="image" name="image" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                        </label>
                        <p>or drag and drop</p>
                      </div>
                      <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 relative">
                    <img src={imagePreview} alt="Crop preview" className="w-full h-48 object-cover rounded-lg" />
                    <button type="button" onClick={()=>{setFormData(p=>({...p, image:null})); setImagePreview(null)}} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">✕</button>
                  </div>
                )}
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1">Short Description</label>
                <textarea id="description" name="description" rows="3" className="input-field bg-white dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400" value={formData.description} onChange={handleChange} />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={onClose} className="btn-secondary">Cancel</motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-primary bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700">{initialData ? 'Save Changes' : 'Add Crop'}</motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default CropForm
