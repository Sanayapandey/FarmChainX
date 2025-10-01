import React, { useMemo } from 'react'
import RoleSwitcher from './RoleSwitcher'
import HotQuestions from './HotQuestions'
import LivePriceTicker from './LivePriceTicker'
import MarketChart from './MarketChart'
import RecommendationCards from './RecommendationCards'
import CameraDetector from './CameraDetector'

const AISection = ({ user, crops = [], onRoleChange }) => {
  const role = user?.role || 'Farmer'

  const roleTitle = useMemo(() => {
    switch (role) {
      case 'Farmer':
        return 'AI Insights for Farmers'
      case 'Consumer':
        return 'AI Insights for Consumers'
      case 'Retailer':
        return 'AI Insights for Retailers'
      case 'Wholesaler':
        return 'AI Insights for Wholesalers'
      default:
        return 'AI Insights'
    }
  }, [role])

  return (
    <section aria-label="AI Assistant" className="mt-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{roleTitle}</h2>
          <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">Conversational guidance, live market analytics, and smart recommendations.</p>
        </div>
        <RoleSwitcher role={role} onChange={onRoleChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <HotQuestions role={role} />
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-4">
            <MarketChart role={role} crops={crops} />
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">Camera</h3>
              <span className="text-xs text-emerald-700/70 dark:text-emerald-300/70">Realtime fruit detection</span>
            </div>
            <CameraDetector />
          </div>
        </div>
        <div className="space-y-4">
          <LivePriceTicker crops={crops} />
          <RecommendationCards role={role} crops={crops} />
        </div>
      </div>
    </section>
  )
}

export default AISection




