import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import AuthService from '../services/authService'

const CursorRing = ({ active }) => {
  const size = active ? 60 : 30
  const color = active ? '#256a34' : '#4caf5080' // dark green when active, transparent green otherwise

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        position: 'absolute',
        pointerEvents: 'none',
        translateX: '-50%',
        translateY: '-50%',
        transition: 'width 0.15s ease, height 0.15s ease, border-color 0.3s ease',
        boxSizing: 'border-box',
        zIndex: 9999,
      }}
    />
  )
}

const Login = ({ onLogin }) => {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 })
  const [activeHover, setActiveHover] = useState(false)
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      cursorX.set(e.clientX - rect.left)
      cursorY.set(e.clientY - rect.top)
    }
  }

  const [formData, setFormData] = useState({ email: '', password: '', role: 'Farmer' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
    // Clear server error when user starts typing
    if (serverError) {
      setServerError('')
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      setServerError('')
      
      try {
        const response = await AuthService.login(formData.email, formData.password)
        
        // Update the user data with role from form if needed
        const userData = {
          ...response.user,
          role: formData.role // Use the role selected in the form
        }
        
        // Call the onLogin prop to update app state
        onLogin(userData)
        
      } catch (error) {
        console.error('Login error:', error)
        setServerError(error.message || 'Login failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e4f3e7 0%, #a8d5a3 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          left: springX,
          top: springY,
          zIndex: 9999,
        }}
      >
        <CursorRing active={activeHover} />
      </motion.div>

      <form
        onMouseEnter={() => setActiveHover(true)}
        onMouseLeave={() => setActiveHover(false)}
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          borderRadius: 24,
          padding: 40,
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1B5E20',
              marginBottom: 12,
            }}
          >
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ color: '#2E7D32', fontSize: '1rem' }}
          >
            Sign in to your Crop Management account
          </motion.p>
        </div>

        {/* Server Error Message */}
        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
          >
            <p className="text-red-700 text-sm">{serverError}</p>
          </motion.div>
        )}

        <div>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              marginBottom: 6,
              fontWeight: '600',
              color: '#2E7D32',
              fontSize: '0.9rem',
            }}
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: errors.email ? '2px solid #D32F2F' : '2px solid #A5D6A7',
              outline: 'none',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) =>
              e.target.style.borderColor = '#388E3C'
            }
            onBlur={(e) =>
              e.target.style.borderColor = errors.email ? '#D32F2F' : '#A5D6A7'
            }
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ marginTop: 6, color: '#D32F2F', fontSize: '0.85rem' }}
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            style={{
              display: 'block',
              marginBottom: 6,
              fontWeight: '600',
              color: '#2E7D32',
              fontSize: '0.9rem',
            }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: errors.password ? '2px solid #D32F2F' : '2px solid #A5D6A7',
              outline: 'none',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) =>
              e.target.style.borderColor = '#388E3C'
            }
            onBlur={(e) =>
              e.target.style.borderColor = errors.password ? '#D32F2F' : '#A5D6A7'
            }
          />
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ marginTop: 6, color: '#D32F2F', fontSize: '0.85rem' }}
            >
              {errors.password}
            </motion.p>
          )}
        </div>

        <div>
          <label
            htmlFor="role"
            style={{
              display: 'block',
              marginBottom: 6,
              fontWeight: '600',
              color: '#2E7D32',
              fontSize: '0.9rem',
            }}
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '2px solid #A5D6A7',
              outline: 'none',
              fontSize: '1rem',
              transition: 'border-color 0.3s ease',
              backgroundColor: 'white',
            }}
            onFocus={(e) =>
              e.target.style.borderColor = '#388E3C'
            }
            onBlur={(e) =>
              e.target.style.borderColor = '#A5D6A7'
            }
          >
            <option value="Farmer">Farmer</option>
            <option value="Consumer">Consumer</option>
            <option value="Retailer">Retailer</option>
          </select>
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: '#1f7a24',
            boxShadow: '0 8px 24px rgba(31, 122, 36, 0.4)',
          }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px 0',
            fontSize: '1.1rem',
            fontWeight: '700',
            borderRadius: 12,
            background:
              'linear-gradient(90deg, #4caf50 0%, #388e3c 100%)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(56, 142, 60, 0.5)',
            userSelect: 'none',
            transition: 'background-color 0.3s ease',
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </motion.button>

        <p style={{ fontSize: '0.9rem', color: '#2E7D32', textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={{ color: '#4caf50', fontWeight: '600' }}>
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login