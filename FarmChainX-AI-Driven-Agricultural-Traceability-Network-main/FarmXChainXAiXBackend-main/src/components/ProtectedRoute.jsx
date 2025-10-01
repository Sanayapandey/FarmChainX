import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import AuthService from '../services/authService'

const ProtectedRoute = ({ children, user, onLogout }) => {
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (!AuthService.isAuthenticated()) {
          setIsValid(false)
          setIsVerifying(false)
          return
        }

        // Verify token with backend
        await AuthService.verifyToken()
        setIsValid(true)
      } catch (error) {
        console.error('Token verification failed:', error)
        setIsValid(false)
        // Auto logout on invalid token
        onLogout()
      } finally {
        setIsVerifying(false)
      }
    }

    verifyAuth()
  }, [onLogout])

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F4EA] via-[#F0FDF4] to-[#EAF8EA]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-700">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isValid) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute