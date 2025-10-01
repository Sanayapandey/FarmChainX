import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthService from '../services/authService'

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Farmer'
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const roles = ['Farmer', 'Retailer', 'Wholesaler', 'Consumer']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    // Clear server error when user starts typing
    if (serverError) {
      setServerError('')
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits'
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
        const response = await AuthService.signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
        
        // Call the onRegister prop to update app state
        onRegister(response.user)
        
      } catch (error) {
        console.error('Registration error:', error)
        setServerError(error.message || 'Registration failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Create Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600"
          >
            Join the Crop Management community
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

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                autoComplete="tel"
                required
                className={`input-field ${errors.mobile ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.mobile}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`input-field ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <motion.label
                    key={role}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-300 transition-colors duration-200"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">{role}</span>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`btn-primary w-full py-3 text-base font-semibold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </motion.button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default Register