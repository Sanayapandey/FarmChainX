import React, { useEffect, useRef, useState } from 'react'

const WS_URL = (import.meta.env.VITE_BACKEND_WS_URL) || 'ws://localhost:8000/api/fruit-detect'

const CameraDetector = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const wsRef = useRef(null)
  const streamRef = useRef(null)
  const rafRef = useRef(null)
  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState('idle')
  const [lastPrediction, setLastPrediction] = useState(null)

  useEffect(() => {
    return () => {
      stop()
    }
  }, [])

  const start = async () => {
    if (connected) return
    setStatus('requesting-camera')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch (e) {
      setStatus('camera-error')
      console.error(e)
      return
    }

    setStatus('connecting')
    const ws = new WebSocket(WS_URL)
    wsRef.current = ws
    ws.onopen = () => {
      setConnected(true)
      setStatus('streaming')
      pumpFrames()
    }
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'prediction') {
          setLastPrediction(data)
          drawOverlay(data)
        }
      } catch (_) {}
    }
    ws.onclose = () => {
      setConnected(false)
      setStatus('closed')
    }
    ws.onerror = () => {
      setStatus('ws-error')
    }
  }

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) wsRef.current.close()
    wsRef.current = null
    setConnected(false)
    if (videoRef.current) videoRef.current.pause()
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    setStatus('idle')
  }

  const pumpFrames = () => {
    const sendFrame = () => {
      if (!videoRef.current || !canvasRef.current || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        rafRef.current = requestAnimationFrame(sendFrame)
        return
      }
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const width = video.videoWidth || 640
      const height = video.videoHeight || 480
      canvas.width = width
      canvas.height = height
      ctx.drawImage(video, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.6)
      try {
        wsRef.current.send(JSON.stringify({ type: 'frame', data: dataUrl }))
      } catch (_) {}
      rafRef.current = requestAnimationFrame(sendFrame)
    }
    rafRef.current = requestAnimationFrame(sendFrame)
  }

  const drawOverlay = (pred) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // draw translucent box
    ctx.fillStyle = 'rgba(0,0,0,0.35)'
    ctx.fillRect(12, 12, 320, 90)
    ctx.fillStyle = '#a7f3d0'
    ctx.font = '16px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto'
    const lines = [
      `Health: ${pred?.health?.label || '-'} (${Math.round((pred?.health?.confidence||0)*100)}%)`,
      `Ripeness: ${pred?.ripeness?.level || '-'} | Days: ${pred?.ripeness?.days ?? '-'}`,
    ]
    lines.forEach((line, i) => {
      ctx.fillText(line, 20, 40 + i * 24)
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {status !== 'streaming' ? (
          <button onClick={start} className="px-3 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Start Camera</button>
        ) : (
          <button onClick={stop} className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Stop</button>
        )}
        <span className="text-sm text-emerald-700 dark:text-emerald-200">{status}</span>
      </div>
      <div className="relative rounded-xl overflow-hidden border border-emerald-100 dark:border-gray-700 bg-black">
        <video ref={videoRef} className="w-full h-auto" playsInline muted />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
      {lastPrediction && (
        <div className="text-sm text-emerald-900 dark:text-emerald-100">
          <div>Health: <b>{lastPrediction.health?.label}</b> ({Math.round((lastPrediction.health?.confidence||0)*100)}%)</div>
          <div>Ripeness: <b>{lastPrediction.ripeness?.level}</b> | Days: {lastPrediction.ripeness?.days}</div>
        </div>
      )}
    </div>
  )
}

export default CameraDetector



