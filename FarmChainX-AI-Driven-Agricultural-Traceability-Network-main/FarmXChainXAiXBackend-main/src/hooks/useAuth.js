import { useState, useEffect } from 'react'
import AuthService from '../services/authService'

const useAuth = () => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const userData = AuthService.getCurrentUser()
          if (userData) {
            // Verify token is still valid
            await AuthService.verifyToken()
            setUser(userData)
            setIsAuthenticated(true)
          }
        }
      } catch (error) {
        console.error('Auth verification failed:', error)
        AuthService.logout()
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password)
      setUser(response.user)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      const response = await AuthService.signup(userData)
      setUser(response.user)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('userData', JSON.stringify(updatedUser))
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser
  }
}

export default useAuth