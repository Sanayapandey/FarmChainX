import React, { useMemo } from 'react'

const roleToQuestions = {
  Farmer: [
    {
      q: 'Which crop is best to grow now given current weather, soil, and market?',
      a: 'Considering recent rainfall, loamy soil, and rising demand, Corn and Wheat look optimal for the next 6–8 weeks.'
    },
    {
      q: 'Which crop will yield the maximum profit this season?',
      a: 'Based on price momentum and input costs, Tomatoes show the highest profit margin; Mango has strong mid-season upside.'
    },
    {
      q: 'What are the optimal soil conditions for my region?',
      a: 'Your region shows best results with pH 6.0-7.0, organic matter 3-5%, and proper drainage for most crops.'
    },
    {
      q: 'How to optimize irrigation for water conservation?',
      a: 'Implement drip irrigation systems, monitor soil moisture sensors, and schedule watering during early morning hours.'
    }
  ],
  Consumer: [
    {
      q: 'Which available crop will last longest and offer maximum value?',
      a: 'Apples and Potatoes have higher shelf-life; current deals on Onions and Bananas maximize value.'
    },
    {
      q: 'What are the seasonal availability trends for fresh produce?',
      a: 'Spring: Asparagus, Strawberries; Summer: Tomatoes, Corn; Fall: Apples, Pumpkins; Winter: Citrus, Root Vegetables.'
    },
    {
      q: 'How to identify the freshest produce at the market?',
      a: 'Look for bright colors, firm texture, fresh smell, and check harvest dates. Avoid bruised or wilted items.'
    },
    {
      q: 'What are the nutritional benefits of different crop types?',
      a: 'Leafy greens: Iron & Vitamins; Root vegetables: Fiber & Minerals; Fruits: Antioxidants & Vitamins; Grains: Energy & Protein.'
    },
    {
      q: 'How to store different crops for maximum freshness?',
      a: 'Refrigerate: Berries, Leafy greens; Room temp: Tomatoes, Bananas; Dark & cool: Potatoes, Onions; Freeze: Corn, Peas.'
    }
  ],
  Retailer: [
    {
      q: 'Which crops to sell in each state for maximum profit?',
      a: 'South and West show elevated demand for Mango; North-East trending toward Potatoes and Onions at improved margins.'
    },
    {
      q: 'How to optimize inventory levels for different seasons?',
      a: 'Increase stock 20% during peak seasons, maintain safety stock of 15%, and use demand forecasting for planning.'
    },
    {
      q: 'What are the current supply chain bottlenecks?',
      a: 'Transportation delays affecting 15% of deliveries, cold storage capacity at 85%, recommend alternative suppliers.'
    },
    {
      q: 'How to reduce food waste in retail operations?',
      a: 'Implement FIFO rotation, monitor expiry dates, offer discounts on near-expiry items, and donate surplus to food banks.'
    },
    {
      q: 'What pricing strategies work best for different customer segments?',
      a: 'Premium pricing for organic produce, volume discounts for bulk buyers, dynamic pricing based on demand and supply.'
    }
  ],
  Wholesaler: [
    {
      q: 'How much crop should be distributed to each state?',
      a: 'Allocate 30% Corn to West, 25% Wheat to North, 20% Rice to South; hold 10% for surge demand.'
    },
    {
      q: 'What are the optimal transportation routes for cost efficiency?',
      a: 'Use rail for long-distance bulk transport, optimize truck routes with GPS tracking, and consolidate shipments.'
    },
    {
      q: 'How to manage bulk pricing negotiations with suppliers?',
      a: 'Negotiate volume discounts, establish long-term contracts, and offer advance payments for better rates.'
    },
    {
      q: 'What are the regional demand forecasting trends?',
      a: 'Urban areas: Premium organic products; Rural areas: Bulk staples; Coastal regions: Fresh seafood; Mountain regions: Root vegetables.'
    },
    {
      q: 'How to optimize warehouse storage and logistics?',
      a: 'Implement automated sorting systems, use vertical storage solutions, maintain temperature-controlled zones, and optimize picking routes.'
    }
  ]
}

const HotQuestions = ({ role = 'Farmer' }) => {
  const items = useMemo(() => roleToQuestions[role] || [], [role])

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Hot Questions</h3>
        <button className="text-sm text-emerald-700 dark:text-emerald-200 hover:underline">Ask more</button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {items.map((item, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-emerald-50/60 dark:bg-gray-700/60 border border-emerald-100 dark:border-gray-700">
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{item.q}</p>
            <p className="text-sm text-emerald-700/90 dark:text-emerald-300/90 mt-1">{item.a}</p>
            <div className="mt-2 flex gap-2">
              <button className="text-xs px-2 py-1 rounded-lg bg-white dark:bg-gray-800 border border-emerald-100 dark:border-gray-700 text-emerald-700 dark:text-emerald-200">See chart</button>
              <button className="text-xs px-2 py-1 rounded-lg bg-emerald-600 text-white">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotQuestions




