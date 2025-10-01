import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import AISection from '../components/AIDashboard/AISection'
import ChatbotWidget from '../components/Chatbot/ChatbotWidget'
import CropForm from '../components/CropForm'
import CropCard from '../components/CropCard'
import WeatherWidget from '../components/WeatherWidget'

const dummyCrops = [
  {
    id: 1,
    name: 'Wheat',
    type: 'Grains',
    soilType: 'Loamy',
    pesticide: 'Chlorpyrifos (regulated)',
    harvestDate: '2025-02-15',
    expiryDate: '2025-06-15',
    image: 'https://images.pexels.com/photos/33862310/pexels-photo-33862310.jpeg',
    description: 'High-yield wheat crop ready for milling.'
  },
  {
    id: 2,
    name: 'Rice',
    type: 'Grains',
    soilType: 'Clay',
    pesticide: 'Imidacloprid (regulated)',
    harvestDate: '2025-01-20',
    expiryDate: '2025-05-20',
    image: 'https://images.pexels.com/photos/1838552/pexels-photo-1838552.jpeg',
    description: 'Aromatic long-grain rice from paddy fields.'
  },
  {
    id: 3,
    name: 'Tomato',
    type: 'Vegetables',
    soilType: 'Sandy',
    pesticide: 'Neem-based organic spray',
    harvestDate: '2025-03-02',
    expiryDate: '2025-03-25',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    description: 'Fresh vine tomatoes rich in lycopene.'
  },
  {
    id: 4,
    name: 'Mango',
    type: 'Fruits',
    soilType: 'Loamy',
    pesticide: 'Organic sulfur spray',
    harvestDate: '2025-04-01',
    expiryDate: '2025-05-10',
    image: 'https://images.unsplash.com/photo-1622955658214-d05c1c6fcf84?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuZ28lMjB0cmVlfGVufDB8fDB8fHww',
    description: 'Sweet Alphonso mangoes from western groves.'
  },
  {
    id: 5,
    name: 'Potato',
    type: 'Vegetables',
    soilType: 'Sandy',
    pesticide: 'Copper-based fungicide',
    harvestDate: '2025-01-10',
    expiryDate: '2025-04-10',
    image: 'https://images.pexels.com/photos/10854385/pexels-photo-10854385.jpeg',
    description: 'Starchy potatoes ideal for fries and mash.'
  },
  {
    id: 6,
    name: 'Apple',
    type: 'Fruits',
    soilType: 'Silt',
    pesticide: 'Bacillus thuringiensis (organic)',
    harvestDate: '2025-09-20',
    expiryDate: '2026-01-20',
    image: 'https://images.pexels.com/photos/574919/pexels-photo-574919.jpeg',
    description: 'Crisp orchard apples with natural sweetness.'
  },
  {
    id: 7,
    name: 'Corn',
    type: 'Grains',
    soilType: 'Loamy',
    pesticide: 'Spinosad (organic)',
    harvestDate: '2025-07-12',
    expiryDate: '2025-10-01',
    image: 'https://images.pexels.com/photos/3658482/pexels-photo-3658482.jpeg',
    description: 'Golden corn cobs perfect for feed and food.'
  },
  {
    id: 8,
    name: 'Banana',
    type: 'Fruits',
    soilType: 'Peaty',
    pesticide: 'Mineral oil (organic)',
    harvestDate: '2025-03-18',
    expiryDate: '2025-04-05',
    image: 'https://images.pexels.com/photos/2880741/pexels-photo-2880741.jpeg',
    description: 'Sweet bananas rich in potassium.'
  },
  {
    id: 9,
    name: 'Onion',
    type: 'Vegetables',
    soilType: 'Sandy',
    pesticide: 'Sulfur dust',
    harvestDate: '2025-02-05',
    expiryDate: '2025-03-15',
    image: 'https://images.pexels.com/photos/9117894/pexels-photo-9117894.jpeg',
    description: 'Red onions with strong flavor.'
  },
  {
    id: 10,
    name: 'Grapes',
    type: 'Fruits',
    soilType: 'Chalky',
    pesticide: 'Sulfur spray (organic)',
    harvestDate: '2025-08-10',
    expiryDate: '2025-09-10',
    image: 'https://images.pexels.com/photos/45209/purple-grapes-vineyard-napa-valley-napa-vineyard-45209.jpeg',
    description: 'Seedless table grapes, juicy and sweet.'
  }
]

const Dashboard = ({ user, onLogout, theme, setTheme, onUpdateUser }) => {
  const [crops, setCrops] = useState([])
  const [showCropForm, setShowCropForm] = useState(false)
  const [editingCrop, setEditingCrop] = useState(null)
  const [filterType, setFilterType] = useState('All')
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('Dashboard')

  useEffect(() => {
    const storedCrops = localStorage.getItem('cropAppCrops')
    if (storedCrops && JSON.parse(storedCrops).length > 0) {
      setCrops(JSON.parse(storedCrops))
    } else {
      setCrops(dummyCrops)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cropAppCrops', JSON.stringify(crops))
  }, [crops])

  const addCrop = (cropData) => {
    if (cropData.id) {
      setCrops(prev => prev.map(c => c.id === cropData.id ? { ...cropData } : c))
    } else {
      const newCrop = { id: Date.now(), ...cropData, description: cropData.description || 'Newly added crop.', createdAt: new Date().toISOString() }
      setCrops(prev => [newCrop, ...prev])
    }
    setEditingCrop(null)
    setShowCropForm(false)
  }

  const deleteCrop = (cropId) => { setCrops(prev => prev.filter(crop => crop.id !== cropId)) }

  const onEditCrop = (crop) => {
    setEditingCrop(crop)
    setShowCropForm(true)
  }

  const filteredCrops = useMemo(() => crops.filter(c => (filterType === 'All' || c.type === filterType) && (c.name.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase()))), [crops, filterType, search])

  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
              <Navbar user={user} onLogout={onLogout} theme={theme} setTheme={setTheme} onUpdateUser={onUpdateUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6 h-[calc(100vh-4rem)]">
        <motion.aside initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="hidden md:block w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl border border-emerald-100 dark:border-gray-700 shadow-sm p-4 h-full sticky top-20 overflow-auto" >
          {/* sidebar content */}
          <nav className="space-y-2">
            {['Dashboard','Add Crop','My Crops','Trace','Settings'].map(item => (
              <button key={item} onClick={() => { 
                setActiveNav(item); 
                if (item === 'Add Crop') setShowCropForm(true);
                if (item === 'Trace') window.location.href = '/trace';
              }} className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${activeNav===item ? 'bg-emerald-100 text-emerald-700 dark:bg-gray-700 dark:text-emerald-100' : 'hover:bg-emerald-50 dark:hover:bg-gray-700 text-gray-700 dark:text-emerald-100/80'}`}>{item}</button>
            ))}
          </nav>
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-700 border border-emerald-100 dark:border-gray-700">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">Tip</p>
            <p className="text-xs text-emerald-700 mt-1 dark:text-emerald-300/80">Use filters to quickly find crops.</p>
          </div>
          
          {/* Weather Widget */}
          <WeatherWidget />
        </motion.aside>

        <div className="flex-1 h-full overflow-auto">
          {/* Controls row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 px-0">
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-700 to-lime-600 bg-clip-text text-transparent">Welcome to FarmX, {user?.name?.split(' ')[0] || 'Farmer'}</h1>
              <p className="text-emerald-700/80 dark:text-emerald-200/80 mt-1">Manage, track and share your crop information.</p>
            </div>
            <div className="flex items-stretch justify-end gap-3">
              <select value={filterType} onChange={(e)=>setFilterType(e.target.value)} className="input-field bg-white/90 dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400 h-11 rounded-xl">
                {['All','Fruits','Vegetables','Grains'].map(opt=> (<option key={opt} value={opt}>{opt}</option>))}
              </select>
              <div className="relative flex-1 max-w-sm">
                <input type="text" placeholder="Search crop..." value={search} onChange={(e)=>setSearch(e.target.value)} className="input-field pl-10 bg-white/90 dark:bg-gray-800 dark:text-emerald-100 border-emerald-200 dark:border-gray-700 focus:ring-emerald-400 h-11 rounded-xl" />
                <svg className="w-5 h-5 text-emerald-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" /></svg>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditingCrop(null); setShowCropForm(true) }} className="inline-flex items-center justify-center whitespace-nowrap h-11 px-4 md:px-5 rounded-xl shadow-sm bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-colors" aria-label="Add Crop">+ Add Crop</motion.button>
            </div>
          </div>

          {/* Grid with consistent side padding */}
          <div className="px-0 sm:px-1 md:px-2 lg:px-0">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
              <AnimatePresence>
                {filteredCrops.map((crop, index) => (
                  <motion.div key={crop.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25, delay: index * 0.03 }}>
                    <CropCard crop={crop} userRole={user?.role} onDelete={deleteCrop} onEdit={onEditCrop} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* AI Section */}
          <AISection user={{ ...user, role: user?.role || 'Farmer' }} crops={crops} onRoleChange={() => {}} />
        </div>
      </div>

      <AnimatePresence>
        {showCropForm && (<CropForm onClose={() => { setShowCropForm(false); setEditingCrop(null) }} onSubmit={addCrop} initialData={editingCrop} />)}
      </AnimatePresence>

      <ChatbotWidget user={{ ...user, role: user?.role || 'Farmer' }} crops={crops} />
    </div>
  )
}

export default Dashboard
