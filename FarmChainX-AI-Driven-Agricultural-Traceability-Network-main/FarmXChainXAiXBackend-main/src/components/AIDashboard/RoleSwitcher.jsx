import React from 'react'

const roles = ['Farmer', 'Consumer', 'Retailer', 'Wholesaler']

const RoleSwitcher = ({ role, onChange = () => {} }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 border border-emerald-100 dark:border-gray-700 rounded-2xl p-2 inline-flex items-center gap-2" role="radiogroup" aria-label="Switch role">
      {roles.map(r => (
        <button
          key={r}
          role="radio"
          aria-checked={role === r}
          onClick={() => onChange(r)}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${role === r ? 'bg-gradient-to-r from-emerald-600 to-lime-600 text-white' : 'text-emerald-700 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-gray-700'}`}
        >
          {r}
        </button>
      ))}
    </div>
  )
}

export default RoleSwitcher




