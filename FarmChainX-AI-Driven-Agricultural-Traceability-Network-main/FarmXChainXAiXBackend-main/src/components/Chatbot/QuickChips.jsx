import React from 'react'
import { motion } from 'framer-motion'

const QuickChips = ({ items = [], onPick = () => {} }) => {
  // Enhanced role-based quick responses with more variety
  const enhancedChips = {
    Farmer: [
      "What crop to plant next month?",
      "Sell my wheat now?",
      "Best profit crop",
      "Soil health check",
      "Weather forecast",
      "Harvest timing",
      "Fertilizer advice",
      "Market prices"
    ],
    Consumer: [
      "Which fruits are fresh this week?",
      "Is tomato good to buy?",
      "Best deals",
      "Organic options",
      "Storage tips",
      "Nutrition info",
      "Local farms",
      "Seasonal produce"
    ],
    Retailer: [
      "High demand state for rice?",
      "Promote crop for margin",
      "Price trend",
      "Inventory planning",
      "Customer preferences",
      "Competition analysis",
      "Supply chain",
      "Marketing strategy"
    ],
    Wholesaler: [
      "Mango crates for State X?",
      "Who needs more supply?",
      "Allocation plan",
      "Logistics optimization",
      "Supplier network",
      "Demand forecasting",
      "Quality standards",
      "Cost analysis"
    ]
  }

  // Get current role from items context or use default
  const currentRole = items.length > 0 ? 
    (enhancedChips.Farmer.includes(items[0]) ? 'Farmer' :
     enhancedChips.Consumer.includes(items[0]) ? 'Consumer' :
     enhancedChips.Retailer.includes(items[0]) ? 'Retailer' : 'Wholesaler') : 'Farmer'

  const chipsToShow = enhancedChips[currentRole] || enhancedChips.Farmer

  return (
    <div className="flex flex-wrap gap-2">
      {chipsToShow.map((item, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPick(item)}
          className="px-3 py-2 text-xs bg-emerald-100 hover:bg-emerald-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-emerald-800 dark:text-emerald-200 rounded-full transition-colors duration-200 border border-emerald-200 dark:border-gray-600"
        >
          {item}
        </motion.button>
      ))}
    </div>
  )
}

export default QuickChips
