import React, { useMemo } from 'react'

const RecommendationCards = ({ role = 'Farmer', crops = [] }) => {
  const cards = useMemo(() => {
    switch (role) {
      case 'Farmer':
        return [
          { title: 'Best Crop Now', desc: 'Based on weather and market, Corn is optimal to sow now.', cta: 'Why Corn?' },
          { title: 'Max Profit', desc: 'Tomato shows highest margin this season in your region.', cta: 'See simulation' },
          { title: 'Alerts', desc: 'High demand for Onions next 2 weeks. Consider planting schedule.', cta: 'Set alert' }
        ]
      case 'Consumer':
        return [
          { title: 'Longest Shelf-life', desc: 'Apples and Potatoes last longer this week.', cta: 'See storage tips' },
          { title: 'Hot Deals', desc: 'Onions expiring soon at 15% off.', cta: 'Buy now' },
          { title: 'Taste Picks', desc: 'Mango and Grapes rated best in taste.', cta: 'See reviews' }
        ]
      case 'Retailer':
        return [
          { title: 'State-wise Demand', desc: 'Maharashtra: Mango, Gujarat: Tomato, Delhi: Onion.', cta: 'Open map' },
          { title: 'Price Optimization', desc: 'Raise Mango price by 4% to match demand.', cta: 'Simulate' },
          { title: 'Inventory', desc: 'Buy 200kg Corn, Sell 150kg Rice.', cta: 'Adjust stock' }
        ]
      case 'Wholesaler':
        return [
          { title: 'Distribution Plan', desc: 'Allocate 30% Corn to West, 25% Wheat North.', cta: 'View plan' },
          { title: 'Warehouse', desc: 'Stock at 68% utilization; free up 12% for incoming Rice.', cta: 'Optimize' },
          { title: 'Supply Prediction', desc: 'Demand surge expected in South; pre-position Tomatoes.', cta: 'Auto-allocate' }
        ]
      default:
        return []
    }
  }, [role])

  return (
    <div className="space-y-3">
      {cards.map((c, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-emerald-100 dark:border-gray-700">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">{c.title}</p>
          <p className="text-sm text-emerald-700/90 dark:text-emerald-300/90 mt-1">{c.desc}</p>
          <div className="mt-2">
            <button className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white">{c.cta}</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecommendationCards




