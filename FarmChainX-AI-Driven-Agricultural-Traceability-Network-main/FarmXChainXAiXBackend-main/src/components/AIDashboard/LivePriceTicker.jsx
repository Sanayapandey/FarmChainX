import React, { useEffect, useMemo, useState } from 'react'

const randomWalk = (start) => start + (Math.random() - 0.5) * 2

const LivePriceTicker = ({ crops = [] }) => {
  const initial = useMemo(() => {
    const byName = {}
    crops.slice(0, 6).forEach(c => { byName[c.name] = Math.round(50 + Math.random() * 150) })
    return byName
  }, [crops])

  const [prices, setPrices] = useState(initial)

  useEffect(() => {
    const id = setInterval(() => {
      setPrices(prev => Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, Math.max(5, Math.round(randomWalk(v)))])))
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Live Market Prices</h3>
        <span className="text-xs text-emerald-700/70 dark:text-emerald-300/70">updates every 2s</span>
      </div>
      <div className="space-y-2 max-h-64 overflow-auto pr-1">
        {Object.entries(prices).map(([name, price]) => (
          <div key={name} className="flex items-center justify-between text-sm p-2 rounded-xl bg-emerald-50/60 dark:bg-gray-700/60 border border-emerald-100 dark:border-gray-700">
            <span className="font-medium text-emerald-900 dark:text-emerald-100">{name}</span>
            <span className="text-emerald-700 dark:text-emerald-200">₹{price}/kg</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LivePriceTicker




