import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const MarketChart = ({ role, crops = [] }) => {
  const chartData = useMemo(() => {
    // Generate dummy market data based on role
    const baseData = [
      { month: 'Jan', value: 85, volume: 1200 },
      { month: 'Feb', value: 92, volume: 1350 },
      { month: 'Mar', value: 78, volume: 980 },
      { month: 'Apr', value: 95, volume: 1420 },
      { month: 'May', value: 88, volume: 1180 },
      { month: 'Jun', value: 102, volume: 1650 },
      { month: 'Jul', value: 115, volume: 1820 },
      { month: 'Aug', value: 108, volume: 1680 },
      { month: 'Sep', value: 125, volume: 1950 },
      { month: 'Oct', value: 118, volume: 1780 },
      { month: 'Nov', value: 135, volume: 2100 },
      { month: 'Dec', value: 142, volume: 2250 }
    ]

    // Adjust data based on role
    switch (role) {
      case 'Farmer':
        return baseData.map(item => ({ 
          ...item, 
          value: Math.round(item.value * 0.8),
          volume: Math.round(item.volume * 0.9)
        }))
      case 'Consumer':
        return baseData.map(item => ({ 
          ...item, 
          value: Math.round(item.value * 1.2),
          volume: Math.round(item.volume * 1.1)
        }))
      case 'Retailer':
        return baseData.map(item => ({ 
          ...item, 
          value: Math.round(item.value * 1.1),
          volume: Math.round(item.volume * 1.05)
        }))
      case 'Wholesaler':
        return baseData.map(item => ({ 
          ...item, 
          value: Math.round(item.value * 0.9),
          volume: Math.round(item.volume * 1.2)
        }))
      default:
        return baseData
    }
  }, [role])

  const getChartTitle = () => {
    switch (role) {
      case 'Farmer':
        return 'Crop Price Trends'
      case 'Consumer':
        return 'Product Price Trends'
      case 'Retailer':
        return 'Market Price Trends'
      case 'Wholesaler':
        return 'Bulk Price Trends'
      default:
        return 'Market Trends'
    }
  }

  const getChartSubtitle = () => {
    switch (role) {
      case 'Farmer':
        return 'Track your crop prices over time'
      case 'Consumer':
        return 'Monitor product price fluctuations'
      case 'Retailer':
        return 'Analyze market price movements'
      case 'Wholesaler':
        return 'Track bulk pricing and volume trends'
      default:
        return 'Market analysis and trends'
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-emerald-200 dark:border-gray-600">
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">{label}</p>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Price: <span className="font-semibold">${payload[0].value}</span>
          </p>
          {payload[1] && (
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              Volume: <span className="font-semibold">{payload[1].value.toLocaleString()} kg</span>
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
          {getChartTitle()}
        </h3>
        <p className="text-sm text-emerald-700/80 dark:text-emerald-300/80">
          {getChartSubtitle()}
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              strokeOpacity={0.3}
            />
            <XAxis 
              dataKey="month" 
              stroke="#10b981"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#10b981"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              name="Price ($)"
            />
            {role === 'Wholesaler' && (
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
                name="Volume (kg)"
                yAxisId={1}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart legend */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-emerald-700 dark:text-emerald-300">Price Trend</span>
          </div>
          {role === 'Wholesaler' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-blue-700 dark:text-blue-300">Volume</span>
            </div>
          )}
        </div>
        
        <div className="text-emerald-600 dark:text-emerald-400">
          {crops.length > 0 ? `${crops.length} crops tracked` : 'No crops available'}
        </div>
      </div>

      {/* Key insights */}
      <div className="mt-4 p-3 bg-emerald-50/60 dark:bg-gray-700/60 rounded-lg">
        <h4 className="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">Key Insights</h4>
        <div className="text-xs text-emerald-700/80 dark:text-emerald-300/80 space-y-1">
          {role === 'Farmer' && (
            <>
              <p>• Peak prices expected in September-December</p>
              <p>• Consider early planting for better yields</p>
            </>
          )}
          {role === 'Consumer' && (
            <>
              <p>• Prices typically lower in March-April</p>
              <p>• Stock up on seasonal items during peak harvest</p>
            </>
          )}
          {role === 'Retailer' && (
            <>
              <p>• Plan inventory for Q4 demand surge</p>
              <p>• Monitor competitor pricing strategies</p>
            </>
          )}
          {role === 'Wholesaler' && (
            <>
              <p>• Volume peaks align with price increases</p>
              <p>• Optimize storage for Q3-Q4 demand</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketChart
