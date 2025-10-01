import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AIQualityAssurance = ({ userRole, crops = [] }) => {
  const [qualityData, setQualityData] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCrop, setSelectedCrop] = useState(null)

  // Simulate AI analysis
  const analyzeQuality = async (crop) => {
    setIsAnalyzing(true)
    setSelectedCrop(crop)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate AI analysis based on crop and role
    const analysis = generateAIAnalysis(crop, userRole)
    setQualityData(analysis)
    setIsAnalyzing(false)
  }

  const generateAIAnalysis = (crop, role) => {
    const baseQuality = {
      freshness: Math.floor(Math.random() * 40) + 60, // 60-100
      nutritionalValue: Math.floor(Math.random() * 30) + 70, // 70-100
      safetyScore: Math.floor(Math.random() * 20) + 80, // 80-100
      marketValue: Math.floor(Math.random() * 50) + 50 // 50-100
    }

    const roleSpecificAnalysis = {
      Farmer: {
        recommendations: [
          'Consider organic certification for premium pricing',
          'Implement crop rotation for soil health',
          'Monitor weather conditions for optimal harvest timing'
        ],
        marketInsights: {
          currentPrice: `$${(Math.random() * 2 + 1).toFixed(2)}/kg`,
          demandTrend: 'Increasing',
          bestHarvestTime: 'Early morning for maximum freshness'
        },
        qualityFactors: {
          soilHealth: 'Good - pH balanced',
          pestControl: 'Effective - organic methods',
          irrigation: 'Optimal - drip system'
        }
      },
      Consumer: {
        recommendations: [
          'Store in refrigerator for extended freshness',
          'Consume within 7 days for best taste',
          'Wash thoroughly before consumption'
        ],
        nutritionalInsights: {
          calories: `${Math.floor(Math.random() * 50) + 20} kcal/100g`,
          vitamins: 'Rich in Vitamin C and A',
          minerals: 'Good source of potassium'
        },
        qualityFactors: {
          ripeness: 'Perfect - ready to eat',
          appearance: 'Excellent - no blemishes',
          texture: 'Firm and fresh'
        }
      },
      Retailer: {
        recommendations: [
          'Maintain temperature at 10-15°C',
          'Rotate stock regularly (FIFO)',
          'Monitor expiry dates closely'
        ],
        inventoryInsights: {
          shelfLife: `${Math.floor(Math.random() * 5) + 5} days`,
          reorderPoint: `${Math.floor(Math.random() * 50) + 100} kg`,
          demandForecast: 'Stable - seasonal product'
        },
        qualityFactors: {
          packaging: 'Intact - no damage',
          temperature: 'Optimal - 12°C',
          humidity: 'Controlled - 85%'
        }
      }
    }

    return {
      crop: crop,
      qualityScores: baseQuality,
      roleAnalysis: roleSpecificAnalysis[role] || roleSpecificAnalysis.Farmer,
      aiConfidence: Math.floor(Math.random() * 20) + 80, // 80-100%
      timestamp: new Date().toISOString()
    }
  }

  const getQualityColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 75) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getQualityLabel = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 75) return 'Good'
    if (score >= 60) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🤖</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-100">
              AI Quality Assurance
            </h3>
            <p className="text-sm text-emerald-700/70 dark:text-emerald-300/70">
              Intelligent product analysis and recommendations
            </p>
          </div>
        </div>

        {/* Crop Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
            Select Crop for Analysis
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {crops.slice(0, 6).map((crop) => (
              <motion.button
                key={crop.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => analyzeQuality(crop)}
                disabled={isAnalyzing}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedCrop?.id === crop.id
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-emerald-200 dark:border-gray-700 hover:border-emerald-300'
                } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="text-center">
                  <div className="text-lg mb-1">{getCropEmoji(crop.name)}</div>
                  <div className="text-xs font-medium text-emerald-900 dark:text-emerald-100">
                    {crop.name}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Analysis Results */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
              <p className="text-emerald-700 dark:text-emerald-300">AI is analyzing {selectedCrop?.name}...</p>
            </motion.div>
          )}

          {qualityData && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quality Scores */}
              <div>
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                  Quality Assessment
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(qualityData.qualityScores).map(([key, score]) => (
                    <div key={key} className="text-center">
                      <div className={`text-2xl font-bold ${getQualityColor(score)}`}>
                        {score}%
                      </div>
                      <div className="text-xs text-emerald-700/70 dark:text-emerald-300/70 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-xs font-medium text-emerald-900 dark:text-emerald-100">
                        {getQualityLabel(score)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role-specific Analysis */}
              <div>
                <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                  AI Recommendations for {userRole}
                </h4>
                <div className="bg-emerald-50/60 dark:bg-gray-700/60 rounded-xl p-4">
                  <ul className="space-y-2">
                    {qualityData.roleAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">•</span>
                        <span className="text-emerald-700 dark:text-emerald-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                    Market Insights
                  </h4>
                  <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 space-y-2">
                    {Object.entries(qualityData.roleAnalysis.marketInsights || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-emerald-700/70 dark:text-emerald-300/70 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-emerald-900 dark:text-emerald-100 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                    Quality Factors
                  </h4>
                  <div className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 space-y-2">
                    {Object.entries(qualityData.roleAnalysis.qualityFactors || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-emerald-700/70 dark:text-emerald-300/70 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-emerald-900 dark:text-emerald-100 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Confidence */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-gray-700 rounded-full">
                  <span className="text-emerald-600 dark:text-emerald-400">🤖</span>
                  <span className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    AI Confidence: {qualityData.aiConfidence}%
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const getCropEmoji = (cropName) => {
  const emojiMap = {
    'Wheat': '🌾',
    'Rice': '🍚',
    'Tomato': '🍅',
    'Mango': '🥭',
    'Apple': '🍎',
    'Corn': '🌽',
    'Banana': '🍌',
    'Onion': '🧅',
    'Grapes': '🍇',
    'Potato': '🥔'
  }
  return emojiMap[cropName] || '🌱'
}

export default AIQualityAssurance
