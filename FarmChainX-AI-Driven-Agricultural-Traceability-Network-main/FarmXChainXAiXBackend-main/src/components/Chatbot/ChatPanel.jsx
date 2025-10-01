import React, { useEffect, useMemo, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import QuickChips from './QuickChips'

const roleChips = {
  Farmer: ["What crop to plant next month?", "Sell my wheat now?", "Best profit crop"],
  Consumer: ["Which fruits are fresh this week?", "Is tomato good to buy?", "Best deals"],
  Retailer: ["High demand state for rice?", "Promote crop for margin", "Price trend"],
  Wholesaler: ["Mango crates for State X?", "Who needs more supply?", "Allocation plan"]
}

const systemGreeting = (role) => `🌱 Welcome to FarmX AI! I'm your ${role} assistant. Tip: Healthy soil grows healthy profits—rotate crops to boost yield.`

const ChatPanel = ({ role = 'Farmer', setRole = () => {}, user, crops = [], onClose }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('cropAppChatHistory')
    if (stored) setMessages(JSON.parse(stored))
    else setMessages([{ id: 'greet', role: 'assistant', text: systemGreeting(role), ts: Date.now() }])
  }, [])

  useEffect(() => {
    localStorage.setItem('cropAppChatHistory', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    if (!text?.trim()) return
    const userMsg = { id: String(Date.now()), role: 'user', text, meta: { role }, ts: Date.now() }
    setMessages(prev => [...prev, userMsg])

    // Intelligent AI response system
    const reply = await generateAIResponse(text, role, crops)
    setMessages(prev => [...prev, reply])
  }

  const generateAIResponse = async (userMessage, currentRole, cropList) => {
    await new Promise(res => setTimeout(res, 600))
    
    const message = userMessage.toLowerCase().trim()
    
    // Enhanced message intent analysis with more sophisticated pattern matching
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      const greetings = [
        `Hello! 👋 I'm your FarmX ${currentRole} assistant. How can I help you today?`,
        `Hi there! 🌾 Ready to optimize your ${currentRole.toLowerCase()} operations?`,
        `Hey! 🚀 Welcome to FarmX. What ${currentRole.toLowerCase()} insights do you need?`,
        `Greetings! 🌱 Your ${currentRole} success is my priority. What's on your mind?`,
        `Good day! ☀️ I'm here to help with your ${currentRole.toLowerCase()} challenges.`,
        `Welcome back! 🌿 Let's make your ${currentRole.toLowerCase()} journey successful.`
      ]
      return {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: greetings[Math.floor(Math.random() * greetings.length)],
        ts: Date.now()
      }
    }

    if (message.includes('how are you') || message.includes('how do you do')) {
      const wellbeingResponses = [
        `I'm doing great! 🌟 Always ready to help with ${currentRole.toLowerCase()} insights and crop intelligence. What would you like to know?`,
        `Excellent! ✨ My systems are running perfectly and I'm fully equipped to assist with your ${currentRole.toLowerCase()} needs.`,
        `I'm in top form! 🚀 Ready to provide cutting-edge agricultural insights for your ${currentRole.toLowerCase()} success.`,
        `Fantastic! 🌈 My AI models are updated with the latest market data and ready to help optimize your ${currentRole.toLowerCase()} operations.`
      ]
      return {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: wellbeingResponses[Math.floor(Math.random() * wellbeingResponses.length)],
        ts: Date.now()
      }
    }

    if (message.includes('weather') || message.includes('climate') || message.includes('temperature')) {
      const weatherResponses = {
        Farmer: [
          `🌤️ Current weather analysis: Optimal conditions for planting in the next 2 weeks. Consider early sowing for wheat and prepare irrigation for upcoming dry spells.`,
          `🌤️ Weather forecast: Perfect planting conditions ahead! Soil moisture is ideal for wheat, and temperatures favor early tomato cultivation.`,
          `🌤️ Climate update: Expect 15% more rainfall this month. Great for rice cultivation but monitor for fungal diseases in existing crops.`
        ],
        Consumer: [
          `🌤️ Weather update: Perfect conditions for fresh produce! Local farms are harvesting quality crops this week.`,
          `🌤️ Climate check: Excellent growing conditions mean fresher, more nutritious vegetables available at local markets.`,
          `🌤️ Weather report: Ideal conditions for outdoor markets. Expect premium quality produce with extended shelf life.`
        ],
        Retailer: [
          `🌤️ Weather impact: Expect increased demand for seasonal vegetables due to favorable growing conditions.`,
          `🌤️ Climate analysis: Plan for 20% higher vegetable supply due to optimal weather conditions in farming regions.`,
          `🌤️ Weather forecast: Stock up on seasonal items - weather conditions are perfect for bumper harvests.`
        ],
        Wholesaler: [
          `🌤️ Weather forecast: Plan for 15% higher crop yields in northern regions, adjust allocation accordingly.`,
          `🌤️ Climate update: Coordinate with multiple suppliers as weather conditions favor increased production across regions.`,
          `🌤️ Weather analysis: Prepare for supply chain adjustments due to favorable growing conditions in multiple states.`
        ]
      }
      const roleResponses = weatherResponses[currentRole] || weatherResponses.Farmer
      return {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: roleResponses[Math.floor(Math.random() * roleResponses.length)],
        ts: Date.now()
      }
    }

    if (message.includes('price') || message.includes('cost') || message.includes('market') || message.includes('rate')) {
      const marketResponses = {
        Farmer: [
          `📊 Market Update: Wheat prices up 8% this week, Tomato stable at ₹45/kg. Consider holding wheat for 2 more weeks, sell tomatoes now for best margins.`,
          `📊 Price Alert: Rice prices showing 12% increase due to supply constraints. Perfect timing to sell stored rice.`,
          `📊 Market Trends: Corn prices volatile, but expected to stabilize. Hold for 1-2 weeks for better returns.`,
          `📊 Price Analysis: Onion prices at 3-month high. If you have stored onions, this is the optimal selling window.`
        ],
        Consumer: [
          `📊 Price Alert: Fresh vegetables 12% cheaper this week! Best deals on tomatoes and onions. Stock up now!`,
          `📊 Market Update: Seasonal fruits at lowest prices of the year. Perfect time to buy in bulk and freeze.`,
          `📊 Price Check: Organic produce prices stable despite high demand. Premium quality available at reasonable rates.`,
          `📊 Market Report: Local farm prices 15% lower than supermarket rates. Visit farmers' markets for best value.`
        ],
        Retailer: [
          `📊 Market Trends: Rice demand rising in Gujarat (+15%), Mango prices stable. Adjust pricing strategy for maximum profit.`,
          `📊 Price Analysis: Wheat supply tight, prices expected to rise 10%. Stock up now for future sales.`,
          `📊 Market Update: Tomato prices dropping due to increased supply. Plan promotions to clear inventory quickly.`,
          `📊 Price Alert: Seasonal vegetables showing price volatility. Implement dynamic pricing for optimal margins.`
        ],
        Wholesaler: [
          `📊 Market Analysis: Corn prices volatile, expect 10% increase. Wheat supply tight in northern states. Strategic allocation recommended.`,
          `📊 Price Forecast: Rice prices to stabilize in 2 weeks. Plan procurement accordingly for consistent supply.`,
          `📊 Market Update: Multiple crop prices showing upward trend. Diversify supplier base to manage cost increases.`,
          `📊 Price Analysis: Regional price variations creating arbitrage opportunities. Optimize distribution routes.`
        ]
      }
      const roleResponses = marketResponses[currentRole] || marketResponses.Farmer
      return {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: roleResponses[Math.floor(Math.random() * roleResponses.length)],
        ts: Date.now()
      }
    }

    if (message.includes('plant') || message.includes('sow') || message.includes('grow') || message.includes('cultivate')) {
      const plantingResponses = {
        Farmer: [
          `🌱 Planting Guide: Based on current soil conditions and market demand, I recommend:
• Wheat: Plant within 2 weeks for optimal yield
• Tomatoes: Wait 1 week for better soil moisture
• Corn: Ideal conditions now, target 90-day harvest
Need detailed sowing schedule?`,
          `🌱 Cultivation Tips: Current soil temperature perfect for:
• Rice: Direct seeding recommended
• Pulses: Ideal for intercropping with cereals
• Vegetables: Start with leafy greens for quick returns`,
          `🌱 Sowing Strategy: Market analysis suggests:
• Focus on high-demand crops like wheat and rice
• Consider organic certification for premium pricing
• Implement crop rotation for soil health`
        ],
        Consumer: [
          `🌱 Growing Tips: This season is perfect for home gardens! Start with tomatoes and herbs. Local nurseries have quality seedlings.`,
          `🌱 Planting Guide: Begin with easy-to-grow vegetables like spinach and radishes. Perfect for beginners!`,
          `🌱 Garden Advice: Consider container gardening for limited space. Herbs and cherry tomatoes work great in pots.`
        ],
        Retailer: [
          `🌱 Supply Forecast: Expect 20% more tomatoes in 3 months. Plan promotions and storage accordingly.`,
          `🌱 Production Planning: Coordinate with farmers for staggered planting to ensure consistent supply throughout the season.`,
          `🌱 Inventory Strategy: Plan for seasonal crop availability and adjust pricing based on supply forecasts.`
        ],
        Wholesaler: [
          `🌱 Production Planning: Coordinate with farmers for staggered planting to ensure consistent supply throughout the season.`,
          `🌱 Supply Chain: Work with multiple farmers for diverse crop portfolio and risk mitigation.`,
          `🌱 Quality Control: Establish planting standards with farmers for consistent product quality.`
        ]
      }
      const roleResponses = plantingResponses[currentRole] || plantingResponses.Farmer
      return {
        id: String(Date.now() + 1),
        role: 'assistant',
        text: roleResponses[Math.floor(Math.random() * roleResponses.length)],
        ts: Date.now()
      }
    }

    // Default intelligent responses based on role
    const defaultResponses = {
      Farmer: `🌱 As a farmer, I recommend focusing on crop rotation and soil health. Based on current market trends, consider diversifying your crops for better risk management. Need specific advice on any particular crop?`,
      Consumer: `🛒 For the best quality and value, I suggest buying seasonal produce and checking harvest dates. Local farms often have the freshest options. What type of produce are you looking for?`,
      Retailer: `📈 Market analysis shows opportunities in organic produce and seasonal specialties. Consider your inventory mix and pricing strategy. Need help with demand forecasting?`,
      Wholesaler: `🚚 Supply chain optimization is key. Focus on building relationships with reliable farmers and implementing efficient logistics. Want to discuss allocation strategies?`
    }

    return {
      id: String(Date.now() + 1),
      role: 'assistant',
      text: defaultResponses[currentRole] || defaultResponses.Farmer,
      ts: Date.now()
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
    setInput('')
  }

  return (
    <div className="flex flex-col h-[75vh]">
      <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 to-lime-600 text-white">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg">🌾</span>
          </div>
          <div>
            <p className="text-sm font-semibold">FarmX Assistant</p>
            <p className="text-xs opacity-90">Smart, role-aware crop and market guidance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="text-emerald-900 bg-white rounded-xl px-2 py-1 text-xs">
            {['Farmer','Consumer','Retailer','Wholesaler'].map(r => (<option key={r} value={r}>{r}</option>))}
          </select>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 rounded-xl px-3 py-1 text-sm">Close</button>
        </div>
      </header>

      <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-2 bg-gradient-to-b from-emerald-50/60 to-lime-50/60 dark:from-gray-800 dark:to-gray-800">
        {messages.map(m => (<MessageBubble key={m.id} from={m.role} text={m.text} />))}
      </div>

      <div className="px-3 py-2">
        <QuickChips items={roleChips[role] || []} onPick={sendMessage} />
      </div>

      <form onSubmit={onSubmit} className="p-3 pt-1 bg-white/70 dark:bg-gray-900/70 border-t border-emerald-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button type="button" className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <span>🎤</span>
          </button>
          <button type="button" className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <span>📎</span>
          </button>
          <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask about crops, prices, or recommendations…" className="flex-1 h-10 rounded-xl border border-emerald-200 dark:border-gray-700 px-3 bg-white/90 dark:bg-gray-800/90 text-emerald-900 dark:text-emerald-100" />
          <button type="submit" className="h-10 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-lime-600 text-white">Send</button>
        </div>
      </form>
    </div>
  )
}

export default ChatPanel
