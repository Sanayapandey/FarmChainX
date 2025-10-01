import React, { useMemo, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const SupplyChainGraph = ({ batches = [], onNodeClick, selectedBatch }) => {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const graphData = useMemo(() => {
    // Create nodes for each stage in the supply chain with better spacing
    const stages = [
      { id: 'farm', name: 'Farm', x: 100, y: 80, color: '#10b981' },
      { id: 'warehouse', name: 'Warehouse', x: 100, y: 200, color: '#3b82f6' },
      { id: 'processing', name: 'Processing', x: 100, y: 320, color: '#8b5cf6' },
      { id: 'retailer', name: 'Retailer', x: 100, y: 440, color: '#f59e0b' },
      { id: 'consumer', name: 'Consumer', x: 100, y: 560, color: '#ef4444' }
    ]

    // Create edges connecting the stages
    const edges = [
      { from: 'farm', to: 'warehouse', label: 'Harvest & Ship' },
      { from: 'warehouse', to: 'processing', label: 'Sort & Package' },
      { from: 'processing', to: 'retailer', label: 'Distribute' },
      { from: 'retailer', to: 'consumer', label: 'Purchase' }
    ]

    return { stages, edges }
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_transit': return '#10b981'
      case 'processing': return '#3b82f6'
      case 'delivered': return '#059669'
      default: return '#6b7280'
    }
  }

  const getBatchPosition = (batch, index) => {
    const baseX = 300 + (index * 150)
    const baseY = 200 + (index * 80)
    return { x: baseX, y: baseY }
  }

  // Pan and zoom handlers
  const handleMouseDown = (e) => {
    if (e.target.tagName === 'svg' || e.target.tagName === 'rect') {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      setIsDragging(true)
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y })
    }
  }

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      e.preventDefault()
      const touch = e.touches[0]
      setPan({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(0.5, Math.min(3, zoom * delta))
    setZoom(newZoom)
  }

  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const zoomIn = () => setZoom(prev => Math.min(3, prev * 1.2))
  const zoomOut = () => setZoom(prev => Math.max(0.5, prev / 1.2))

  // Calculate dynamic viewBox based on content and zoom
  const getViewBox = () => {
    const padding = 50
    const minX = Math.min(...graphData.stages.map(s => s.x)) - padding
    const maxX = Math.max(...graphData.stages.map(s => s.x), ...batches.map((_, i) => getBatchPosition(_, i).x)) + padding
    const minY = Math.min(...graphData.stages.map(s => s.y)) - padding
    const maxY = Math.max(...graphData.stages.map(s => s.y), ...batches.map((_, i) => getBatchPosition(_, i).y)) + padding
    
    const width = maxX - minX
    const height = maxY - minY
    
    return `${minX} ${minY} ${width} ${height}`
  }

  // Helper function to get Y position for each stage
  const getStageY = (status) => {
    switch (status) {
      case 'in_transit': return 200
      case 'processing': return 320
      case 'delivered': return 440
      default: return 200
    }
  }

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl border border-emerald-200/50 dark:border-gray-700/50">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={zoomIn}
          className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg border border-emerald-200 dark:border-gray-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-lg">+</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={zoomOut}
          className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg border border-emerald-200 dark:border-gray-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="text-lg">−</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetView}
          className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg border border-emerald-200 dark:border-gray-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
          title="Reset View"
        >
          <span className="text-sm">⌂</span>
        </motion.button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-gray-800/90 rounded-lg px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-gray-700">
        {Math.round(zoom * 100)}%
      </div>

      {/* Graph Container with Scroll */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-auto relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="relative"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            minWidth: '100%',
            minHeight: '100%'
          }}
        >
          <svg 
            width="100%" 
            height="100%" 
            viewBox={getViewBox()} 
            className="w-full h-full min-h-[600px]"
            style={{ minWidth: '800px' }}
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Stage connections */}
            {graphData.edges.map((edge, index) => {
              const fromStage = graphData.stages.find(s => s.id === edge.from)
              const toStage = graphData.stages.find(s => s.id === edge.to)
              
              return (
                <g key={index}>
                  <line
                    x1={fromStage.x + 30}
                    y1={fromStage.y}
                    x2={toStage.x + 30}
                    y2={toStage.y}
                    stroke="#d1d5db"
                    strokeWidth="3"
                    strokeDasharray="8,8"
                    opacity="0.6"
                  />
                  <text
                    x={(fromStage.x + toStage.x) / 2 + 60}
                    y={(fromStage.y + toStage.y) / 2}
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="12"
                    fontWeight="500"
                    className="pointer-events-none"
                  >
                    {edge.label}
                  </text>
                </g>
              )
            })}

            {/* Stage nodes */}
            {graphData.stages.map((stage) => (
              <g key={stage.id}>
                <circle
                  cx={stage.x}
                  cy={stage.y}
                  r="30"
                  fill={stage.color}
                  stroke="#ffffff"
                  strokeWidth="4"
                  className="cursor-pointer hover:opacity-80 transition-opacity shadow-lg"
                />
                <text
                  x={stage.x}
                  y={stage.y + 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {stage.name}
                </text>
              </g>
            ))}

            {/* Batch nodes */}
            {batches.map((batch, index) => {
              const position = getBatchPosition(batch, index)
              const isSelected = selectedBatch?.id === batch.id
              
              return (
                <g key={batch.id} className="cursor-pointer">
                  {/* Batch node */}
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r="25"
                    fill={getStatusColor(batch.status)}
                    stroke={isSelected ? "#fbbf24" : "#ffffff"}
                    strokeWidth={isSelected ? "5" : "3"}
                    className="hover:opacity-80 transition-all duration-200 shadow-lg"
                    onClick={() => onNodeClick(batch)}
                  />
                  
                  {/* Batch ID */}
                  <text
                    x={position.x}
                    y={position.y + 6}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {batch.id}
                  </text>
                  
                  {/* Connection line to current stage */}
                  <line
                    x1={position.x - 25}
                    y1={position.y}
                    x2="130"
                    y2={getStageY(batch.status)}
                    stroke={getStatusColor(batch.status)}
                    strokeWidth="3"
                    opacity="0.7"
                    strokeDasharray="4,4"
                  />
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-gray-800/95 rounded-xl p-4 text-sm shadow-lg border border-emerald-200 dark:border-gray-700">
        <div className="font-semibold mb-3 text-emerald-900 dark:text-emerald-100">Status Legend</div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <span className="text-emerald-700 dark:text-emerald-300">In Transit</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-blue-700 dark:text-blue-300">Processing</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-green-700 dark:text-green-300">Delivered</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 rounded-xl p-3 text-xs text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-gray-700">
        <div className="font-medium mb-1">Navigation:</div>
        <div>• Scroll to zoom • Drag to pan • Click nodes to select</div>
      </div>
    </div>
  )
}

export default SupplyChainGraph
