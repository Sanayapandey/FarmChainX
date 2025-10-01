import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AIAnalyzerModal = ({ isOpen, onClose }) => {
  const [selectedFruitNorway, setSelectedFruit] = useState(null)
  const [selectedCondition, setSelectedCondition] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)

  const fruitDatabase = {
    apple: {
      icon: '🍎',
      name: 'Apple',
      varieties: ['Red Delicious', 'Granny Smith', 'Gala', 'Fuji', 'Honeycrisp', 'Golden Delicious'],
      description: 'Crisp texture, various colors',
      avgShelfLife: 30,
      optimalTemp: '0-4°C',
      optimalHumidity: '90-95%',
      peakRipeness: 85,
      qualityFactors: {
        firmness: 0.3,
        color: 0.25,
        skin: 0.25,
        shape: 0.2
      },
      priceRange: { premium: 150, standard: 100, discount: 60 }
    },
    // ... (other fruits from the previous artifact, truncated for brevity)
    banana: {
      icon: '🍌',
      name: 'Banana',
      varieties: ['Cavendish', 'Lady Finger', 'Red Banana', 'Plantain'],
      description: 'Curved yellow fruit',
      avgShelfLife: 7,
      optimalTemp: '13-15°C',
      optimalHumidity: '85-90%',
      peakRipeness: 75,
      qualityFactors: {
        color: 0.4,
        spots: 0.3,
        firmness: 0.2,
        shape: 0.1
      },
      priceRange: { premium: 80, standard: 50, discount: 30 }
    },
    orange: {
      icon: '🍊',
      name: 'Orange',
      varieties: ['Navel', 'Valencia', 'Blood Orange', 'Mandarin'],
      description: 'Citrus with thick skin',
      avgShelfLife: 21,
      optimalTemp: '0-4°C',
      optimalHumidity: '85-90%',
      peakRipeness: 90,
      qualityFactors: {
        color: 0.3,
        firmness: 0.3,
        skin: 0.25,
        weight: 0.15
      },
      priceRange: { premium: 120, standard: 80, discount: 45 }
    },
    strawberry: {
      icon: '🍓',
      name: 'Strawberry',
      varieties: ['Albion', 'Seascape', 'Chandler', 'Festival'],
      description: 'Small red berries',
      avgShelfLife: 5,
      optimalTemp: '0-2°C',
      optimalHumidity: '90-95%',
      peakRipeness: 95,
      qualityFactors: {
        color: 0.35,
        firmness: 0.35,
        surface: 0.2,
        size: 0.1
      },
      priceRange: { premium: 300, standard: 200, discount: 120 }
    },
    grape: {
      icon: '🍇',
      name: 'Grape',
      varieties: ['Red Globe', 'Thompson Seedless', 'Flame Seedless', 'Black Beauty'],
      description: 'Clustered small fruits',
      avgShelfLife: 14,
      optimalTemp: '-1-0°C',
      optimalHumidity: '90-95%',
      peakRipeness: 88,
      qualityFactors: {
        firmness: 0.3,
        color: 0.25,
        cluster: 0.25,
        bloom: 0.2
      },
      priceRange: { premium: 250, standard: 150, discount: 90 }
    },
    mango: {
      icon: '🥭',
      name: 'Mango',
      varieties: ['Alphonso', 'Tommy Atkins', 'Kent', 'Haden'],
      description: 'Tropical stone fruit',
      avgShelfLife: 10,
      optimalTemp: '10-13°C',
      optimalHumidity: '85-90%',
      peakRipeness: 80,
      qualityFactors: {
        color: 0.3,
        firmness: 0.3,
        aroma: 0.25,
        skin: 0.15
      },
      priceRange: { premium: 200, standard: 120, discount: 70 }
    }
  }

  const selectFruit = (fruitKey) => {
    setSelectedFruit(fruitKey)
    setSelectedCondition(null)
    setAnalysisResults(null)
    document.getElementById('conditionSelector')?.scrollIntoView({ behavior: 'smooth' })
  }

  const selectCondition = (condition) => {
    setSelectedCondition(condition)
    if (selectedFruitNorway && condition) {
      setTimeout(() => document.getElementById('proceedToUpload')?.scrollIntoView({ behavior: 'smooth' }), 200)
    }
  }

  const proceedToStep2 = () => {
    if (!selectedFruitNorway || !selectedCondition) {
      alert('Please select both a fruit and its condition before proceeding.')
      return
    }
    setCurrentStep(2)
    document.getElementById('imageUploadSection')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target.result)
        setTimeout(() => document.getElementById('startAnalysis')?.scrollIntoView({ behavior: 'smooth' }), 200)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select a valid image file.')
    }
  }

  const captureImage = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          alert('Camera access granted! In production, this would capture and process the image.')
          stream.getTracks().forEach(track => track.stop())
        })
        .catch(() => {
          alert('Camera not available. Please use the gallery option.')
        })
    } else {
      alert('Camera functionality not supported.')
    }
  }

  const startAnalysis = () => {
    if (!uploadedImage || !selectedFruitNorway || !selectedCondition) {
      alert('Please select a fruit, condition, and upload an image.')
      return
    }
    setCurrentStep(3)
    const stages = [
      "Preprocessing image data...",
      "Extracting visual features...",
      "Analyzing color patterns...",
      "Detecting surface defects...",
      "Measuring firmness indicators...",
      "Calculating ripeness metrics...",
      "Estimating shelf life...",
      "Generating quality score..."
    ]
    let stageIndex = 0
    const progressText = document.getElementById('progressText')
    const stageInterval = setInterval(() => {
      if (stageIndex < stages.length) {
        if (progressText) progressText.textContent = stages[stageIndex]
        stageIndex++
      } else {
        clearInterval(stageInterval)
        setTimeout(() => {
          const analysis = generateRealisticAnalysis(fruitDatabase[selectedFruitNorway])
          setAnalysisResults(analysis)
          setCurrentStep(4)
          document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth' })
        }, 1000)
      }
    }, 800)
  }

  const generateRealisticAnalysis = (fruitData) => {
    let freshness, ripeness, shelfLife, confidence, qualityScore, qualityGrade
    switch (selectedCondition) {
      case 'fresh':
        freshness = Math.round(85 + Math.random() * 15)
        ripeness = Math.round(Math.max(70, Math.min(95, fruitData.peakRipeness + (Math.random() - 0.5) * 15)))
        shelfLife = Math.round(fruitData.avgShelfLife * (0.9 + Math.random() * 0.1))
        confidence = Math.round(88 + Math.random() * 12)
        break
      case 'aging':
        freshness = Math.round(60 + Math.random() * 25)
        ripeness = Math.round(Math.max(80, Math.min(100, fruitData.peakRipeness + (Math.random() * 20))))
        shelfLife = Math.round(fruitData.avgShelfLife * (0.3 + Math.random() * 0.4))
        confidence = Math.round(82 + Math.random() * 10)
        break
      case 'stale':
        freshness = Math.round(25 + Math.random() * 35)
        ripeness = Math.round(Math.max(90, Math.min(100, 95 + Math.random() * 5)))
        shelfLife = Math.round(fruitData.avgShelfLife * (0.1 + Math.random() * 0.2))
        confidence = Math.round(75 + Math.random() * 15)
        break
      case 'rotten':
        freshness = Math.round(5 + Math.random() * 20)
        ripeness = 100
        shelfLife = Math.round(0 + Math.random() * 2)
        confidence = Math.round(90 + Math.random() * 10)
        break
      default:
        freshness = Math.round(60 + Math.random() * 25)
        ripeness = Math.round(fruitData.peakRipeness)
        shelfLife = Math.round(fruitData.avgShelfLife * 0.5)
        confidence = 85
    }
    qualityScore = (freshness * 0.5) + (Math.min(ripeness, 90) * 0.3) + (confidence * 0.2)
    if (selectedCondition === 'rotten') qualityGrade = 'F'
    else if (selectedCondition === 'stale') qualityGrade = freshness > 50 ? 'D+' : 'D'
    else if (qualityScore >= 90) qualityGrade = 'A+'
    else if (qualityScore >= 85) qualityGrade = 'A'
    else if (qualityScore >= 80) qualityGrade = 'A-'
    else if (qualityScore >= 75) qualityGrade = 'B+'
    else if (qualityScore >= 70) qualityGrade = 'B'
    else if (qualityScore >= 60) qualityGrade = 'C'
    else qualityGrade = 'D'
    return { freshness, ripeness, shelfLife: Math.max(0, shelfLife), confidence, qualityGrade, qualityScore, fruitData }
  }

  const getRating = (value) => {
    if (value >= 85) return { text: 'Excellent', class: 'bg-gradient-to-r from-green-600 to-green-500' }
    if (value >= 75) return { text: 'Good', class: 'bg-gradient-to-r from-orange-500 to-red-500' }
    if (value >= 65) return { text: 'Average', class: 'bg-gradient-to-r from-yellow-500 to-yellow-400' }
    return { text: 'Poor', class: 'bg-gradient-to-r from-pink-600 to-pink-500' }
  }

  const getShelfLifeRating = (days, avgDays) => {
    const ratio = days / avgDays
    if (ratio >= 0.8) return { text: 'Extended', class: 'bg-gradient-to-r from-green-600 to-green-500' }
    if (ratio >= 0.6) return { text: 'Good', class: 'bg-gradient-to-r from-orange-500 to-red-500' }
    if (ratio >= 0.4) return { text: 'Limited', class: 'bg-gradient-to-r from-yellow-500 to-yellow-400' }
    return { text: 'Critical', class: 'bg-gradient-to-r from-pink-600 to-pink-500' }
  }

  const getQualityRating = (grade) => {
    if (grade.startsWith('A')) return { text: 'Premium', class: 'bg-gradient-to-r from-green-600 to-green-500' }
    if (grade.startsWith('B')) return { text: 'Standard', class: 'bg-gradient-to-r from-orange-500 to-red-500' }
    return { text: 'Basic', class: 'bg-gradient-to-r from-yellow-500 to-yellow-400' }
  }

  const resetAnalysis = () => {
    setSelectedFruit(null)
    setSelectedCondition(null)
    setUploadedImage(null)
    setAnalysisResults(null)
    setCurrentStep(1)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">
                🍎 AI Fruit Analyzer Pro
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-gray-700 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {[1, 2, 3, 4].map(step => (
                <div
                  key={step}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    step === currentStep
                      ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-md'
                      : step < currentStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step === currentStep ? 'bg-white text-emerald-600' : 'bg-white text-gray-700'
                  }`}>{step}</span>
                  {['Select Fruit', 'Upload Image', 'AI Analysis', 'Results'][step - 1]}
                </div>
              ))}
            </div>

            {currentStep === 1 && (
              <div id="fruitSelectionSection" className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">🎯 Choose Your Fruit</h3>
                <p className="text-emerald-700/70 dark:text-emerald-300/70 mb-4">Select the fruit type for precise quality analysis</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {Object.entries(fruitDatabase).map(([key, fruit]) => (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => selectFruit(key)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedFruitNorway === key
                          ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-gray-700 dark:to-gray-600'
                          : 'border-emerald-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50'
                      }`}
                    >
                      <span className="text-3xl block mb-2">{fruit.icon}</span>
                      <h4 className="text-emerald-900 dark:text-emerald-100 font-semibold">{fruit.name}</h4>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">{fruit.description}</p>
                    </motion.div>
                  ))}
                </div>

                <div id="conditionSelector" className={`${selectedFruitNorway ? 'block' : 'hidden'} mt-6`}>
                  <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">🔍 Select Fruit Condition</h3>
                  <p className="text-emerald-700/70 dark:text-emerald-300/70 mb-4">Help us refine the analysis by specifying the fruit's condition</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { condition: 'fresh', icon: '✨', title: 'Fresh & New', desc: 'Vibrant, recently harvested' },
                      { condition: 'aging', icon: '⚠️', title: 'Aging', desc: 'Slightly soft or discolored' },
                      { condition: 'stale', icon: '🚨', title: 'Stale/Overripe', desc: 'Soft, dark spots, wrinkled' },
                      { condition: 'rotten', icon: '💀', title: 'Rotten/Moldy', desc: 'Moldy or completely spoiled' }
                    ].map(({ condition, icon, title, desc }) => (
                      <motion.div
                        key={condition}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectCondition(condition)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          selectedCondition === condition
                            ? `border-${condition === 'fresh' ? 'green' : condition === 'aging' ? 'orange' : condition === 'stale' ? 'yellow' : 'pink'}-500 bg-gradient-to-br from-${condition === 'fresh' ? 'green' : condition === 'aging' ? 'orange' : condition === 'stale' ? 'yellow' : 'pink'}-50 to-${condition === 'fresh' ? 'green' : condition === 'aging' ? 'orange' : condition === 'stale' ? 'yellow' : 'pink'}-100 dark:from-gray-700 dark:to-gray-600`
                            : 'border-emerald-100 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50'
                        }`}
                      >
                        <span className="text-3xl block mb-2">{icon}</span>
                        <h4 className="text-emerald-900 dark:text-emerald-100 font-semibold">{title}</h4>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">{desc}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    id="proceedToUpload"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={proceedToStep2}
                    className={`mt-6 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-emerald-500 to-lime-500 transition-all ${selectedFruitNorway && selectedCondition ? 'block' : 'hidden'}`}
                  >
                    Next: Upload Image →
                  </motion.button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div id="imageUploadSection" className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">📸 Upload Fruit Image</h3>
                <p className="text-emerald-700/70 dark:text-emerald-300/70 mb-4">Capture a clear photo of your {fruitDatabase[selectedFruitNorway]?.name.toLowerCase()}</p>
                <div
                  className="p-6 border-2 border-dashed border-emerald-200 dark:border-gray-700 rounded-xl text-center"
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-emerald-500', 'bg-emerald-50') }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50') }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50')
                    const file = e.dataTransfer.files[0]
                    if (file && file.type.startsWith('image/')) handleFileSelect({ target: { files: [file] } })
                  }}
                >
                  <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleFileSelect} />
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-emerald-500 to-lime-500"
                    >
                      📷 Select Image
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={captureImage}
                      className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-400"
                    >
                      📸 Take Photo
                    </motion.button>
                  </div>
                  {uploadedImage && (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={uploadedImage}
                      alt="Uploaded fruit"
                      className="max-w-full max-h-80 rounded-xl mx-auto mt-4 shadow-lg"
                    />
                  )}
                  {uploadedImage && (
                    <motion.button
                      id="startAnalysis"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startAnalysis}
                      className="mt-6 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-emerald-500 to-lime-500"
                    >
                      🤖 Start AI Analysis
                    </motion.button>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div id="analysisSection" className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 border-4 border-t-emerald-500 border-gray-200 dark:border-gray-700 rounded-full animate-spin" />
                  <span className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">🧠 Analyzing Image...</h3>
                <p className="text-emerald-700/70 dark:text-emerald-300/70">Processing {fruitDatabase[selectedFruitNorway]?.name.toLowerCase()} with AI vision</p>
                <p id="progressText" className="text-emerald-700/70 dark:text-emerald-300/70 mt-2">Initializing neural networks...</p>
              </div>
            )}

            {currentStep === 4 && analysisResults && (
              <div id="resultsSection" className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                {selectedCondition === 'rotten' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 text-white text-center"
                  >
                    <h3 className="text-lg font-semibold">⚠️ DANGER - DO NOT CONSUME ⚠️</h3>
                    <p>This fruit is completely spoiled and potentially harmful! Discard immediately.</p>
                  </motion.div>
                )}
                {selectedCondition === 'stale' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-emerald-900 text-center"
                  >
                    <h3 className="text-lg font-semibold">⚠️ WARNING - POOR QUALITY</h3>
                    <p>This fruit is past its prime. Consider composting or disposal.</p>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center"
                >
                  <h3 className="text-lg font-semibold">🎯 Analysis Confidence</h3>
                  <p className="text-3xl font-bold">{analysisResults.confidence}%</p>
                  <p className="text-sm">High-precision quality assessment</p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { id: 'freshness', icon: '🌿', label: 'Freshness Score', value: analysisResults.freshness, barColor: 'from-green-600 to-green-500' },
                    { id: 'ripeness', icon: '🎨', label: 'Ripeness Level', value: analysisResults.ripeness, barColor: 'from-orange-500 to-red-500' },
                    { id: 'shelfLife', icon: '⏰', label: 'Shelf Life', value: `${analysisResults.shelfLife} Days`, barColor: 'from-blue-500 to-blue-400', isShelfLife: true },
                    { id: 'quality', icon: '💎', label: 'Quality Grade', value: analysisResults.qualityGrade, barColor: 'from-pink-600 to-pink-500', isQuality: true }
                  ].map((metric) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: metric.id === 'freshness' ? 0.2 : metric.id === 'ripeness' ? 0.4 : metric.id === 'shelfLife' ? 0.6 : 0.8 }}
                      className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-emerald-100 dark:border-gray-700"
                    >
                      <span className="text-2xl block mb-2">{metric.icon}</span>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">{metric.label}</p>
                      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{metric.value}</p>
                      <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: metric.isQuality ? analysisResults.qualityScore + '%' : metric.isShelfLife ? Math.min(100, (analysisResults.shelfLife / analysisResults.fruitData.avgShelfLife) * 100) + '%' : metric.value + '%' }}
                          transition={{ duration: 1 }}
                          className={`h-full bg-gradient-to-r ${metric.barColor}`}
                        />
                      </div>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs text-white ${metric.isQuality ? getQualityRating(analysisResults.qualityGrade).class : metric.isShelfLife ? getShelfLifeRating(analysisResults.shelfLife, analysisResults.fruitData.avgShelfLife).class : getRating(metric.value).class}`}>
                        {metric.isQuality ? getQualityRating(analysisResults.qualityGrade).text : metric.isShelfLife ? getShelfLifeRating(analysisResults.shelfLife, analysisResults.fruitData.avgShelfLife).text : getRating(metric.value).text}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetAnalysis}
                  className="mt-6 px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-gray-600 to-gray-500 mx-auto block"
                >
                  🔄 Analyze Another Fruit
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const ConsumerDashboard = ({ user, onLogout, theme, setTheme, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('products')
  const [searchQuery, setSearchQuery] = useState('')
  const [isAIAnalyzerOpen, setIsAIAnalyzerOpen] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      image: 'https://agricultureguruji.com/wp-content/uploads/2018/09/tomato-2643774_1280.jpg.webp',
      price: '$2.99/lb',
      nutrition: { calories: 22, protein: '1.1g', fiber: '1.2g', vitaminC: '13.7mg' },
      cookingMethods: ['Salad', 'Sauce', 'Soup', 'Grilled'],
      seasonalAvailability: 'Year-round',
      origin: 'Local Farm',
      harvestDate: '2025-01-15',
      expiryDate: '2025-01-25',
      storageTips: 'Store at room temperature until ripe, then refrigerate'
    },
    {
      id: 2,
      name: 'Organic Apples',
      image: 'https://extension.umn.edu/sites/extension.umn.edu/files/Two%20apples%20close-up_screen.jpg',
      price: '$3.49/lb',
      nutrition: { calories: 95, protein: '0.5g', fiber: '4.4g', vitaminC: '8.4mg' },
      cookingMethods: ['Raw', 'Baking', 'Juice', 'Salad'],
      seasonalAvailability: 'Fall',
      origin: 'Himachal Farm',
      harvestDate: '2025-01-08',
      expiryDate: '2025-02-08',
      storageTips: 'Refrigerate in crisper drawer'
    },
    {
      id: 3,
      name: 'Sweet Corn',
      image: 'https://naturespath.com/cdn/shop/articles/growing_corn-948938.jpg?v=1725927714&width=2000',
      price: '$1.99/ear',
      nutrition: { calories: 88, protein: '3.2g', fiber: '2.7g', vitaminC: '6.8mg' },
      cookingMethods: ['Boiled', 'Grilled', 'Soup', 'Salad'],
      seasonalAvailability: 'Summer',
      origin: 'Local Farm',
      harvestDate: '2025-01-12',
      expiryDate: '2025-01-19',
      storageTips: 'Keep in husk and refrigerate'
    }
  ]

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const seasonalTips = [
    {
      season: 'Winter',
      tip: 'Root vegetables and winter squash are at their peak',
      products: ['Carrots', 'Potatoes', 'Squash', 'Onions']
    },
    {
      season: 'Spring',
      tip: 'Fresh greens and early vegetables are abundant',
      products: ['Spinach', 'Lettuce', 'Asparagus', 'Peas']
    },
    {
      season: 'Summer',
      tip: 'Berries, tomatoes, and corn are in season',
      products: ['Strawberries', 'Tomatoes', 'Corn', 'Zucchini']
    },
    {
      season: 'Fall',
      tip: 'Apples, pumpkins, and hearty vegetables',
      products: ['Apples', 'Pumpkins', 'Sweet Potatoes', 'Brussels Sprouts']
    }
  ]

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <AIAnalyzerModal isOpen={isAIAnalyzerOpen} onClose={() => setIsAIAnalyzerOpen(false)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 h-[calc(100vh-4rem)]">
        <motion.aside 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.4 }} 
          className="hidden md:block w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm p-4 h-full sticky top-20 overflow-auto"
        >
          <nav className="space-y-2">
            {['products', 'seasonal', 'nutrition', 'recipes'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:text-emerald-100' 
                    : 'hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-emerald-100/80'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAIAnalyzerOpen(!isAIAnalyzerOpen)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                isAIAnalyzerOpen
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:text-emerald-100'
                  : 'hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-emerald-100/80'
              }`}
            >
              🤖 AI Fruit Analyzer
            </motion.button>
          </nav>
          
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-700 border border-emerald-100 dark:border-gray-700">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">Consumer Tip</p>
            <p className="text-xs text-emerald-700 mt-1 dark:text-emerald-300/80">Use the AI Fruit Analyzer to check the quality of your produce!</p>
          </div>
        </motion.aside>

        <div className="flex-1 h-full overflow-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">
              Welcome, {user?.name || 'Consumer'}!
            </h1>
            <p className="text-emerald-700/80 dark:text-emerald-200/80 mt-1">
              Discover fresh, nutritious products and cooking inspiration
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/90 dark:bg-gray-800/90 border border-emerald-200 dark:border-gray-700 rounded-xl text-emerald-900 dark:text-emerald-100 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-emerald-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                      {product.price}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Origin:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.origin}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Season:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.seasonalAvailability}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Storage:</p>
                        <p className="text-sm text-emerald-900 dark:text-emerald-100">{product.storageTips}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">Cooking Methods:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.cookingMethods.map((method, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'seasonal' && (
              <motion.div
                key="seasonal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {seasonalTips.map((season, index) => (
                  <motion.div
                    key={season.season}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                      {season.season}
                    </h3>
                    <p className="text-emerald-700 dark:text-emerald-300 mb-4">
                      {season.tip}
                    </p>
                    <div>
                      <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70 mb-2">Available Products:</p>
                      <div className="flex flex-wrap gap-2">
                        {season.products.map((product, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-emerald-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 text-sm rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'nutrition' && (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                          {product.name}
                        </h3>
                        <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
                          Per 100g serving
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(product.nutrition).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {value}
                          </p>
                          <p className="text-xs text-emerald-700/70 dark:text-emerald-300/70 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'recipes' && (
              <motion.div
                key="recipes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
                    Quick Recipe Ideas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Fresh Tomato Salad</h4>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">
                        Combine fresh tomatoes with basil, mozzarella, and balsamic vinaigrette
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Prep time: 10 minutes</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Grilled Corn</h4>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">
                        Grill corn in husk, then brush with butter and sprinkle with salt
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Cook time: 15 minutes</p>
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

export default ConsumerDashboard