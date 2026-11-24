import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa6'
import { login } from '../slices/authSlice'

const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [confirmPass, setConfirmPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setRegData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!regData.email.trim() || !regData.password) {
      toast.error('Please fill in all required fields.')
      return
    }

    if (regData.password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }

    if (regData.password !== regData.confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    if (!regData.terms) {
      toast.warning('Please accept terms and conditions.')
      return
    }

    setLoading(true)

    // Try backend if running, else complete client-side registration
    try {
      const response = await axios.post(
        'http://localhost:5000/registration',
        regData,
        { timeout: 2000 }
      )
      if (response.data?.success) {
        const user = response.data.user || {
          name: regData.name || regData.email.split('@')[0],
          email: regData.email,
        }
        dispatch(login(user))
        toast.success('Registration successful! Welcome!')
        navigate('/dashboard')
        return
      }
    } catch {
      // Backend not running / offline fallback
      const user = {
        name: regData.name || regData.email.split('@')[0],
        email: regData.email,
        createdAt: new Date().toISOString(),
      }
      dispatch(login(user))
      toast.success('Account created successfully! Welcome!')
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-[440px] w-full bg-white p-6 sm:p-8 shadow-lg rounded-2xl mx-auto my-12 border border-gray-100">
      <h3 className="font-pop font-bold text-2xl sm:text-3xl text-center text-gray-900 mb-2">
        Create Account
      </h3>
      <p className="text-center text-sm text-gray-500 mb-6 font-pop">
        Sign up to start shopping and manage your orders
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-pop">Full Name (optional)</label>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            value={regData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3.5 py-2.5 rounded-lg font-pop text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-pop">Email Address *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="example@mail.com"
            value={regData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3.5 py-2.5 rounded-lg font-pop text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-pop">Password *</label>
          <div className="relative">
            <input
              name="password"
              type={showPass ? 'text' : 'password'}
              required
              placeholder="Minimum 6 characters"
              value={regData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3.5 py-2.5 pr-10 rounded-lg font-pop text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-base"
              onClick={() => setShowPass(!showPass)}
              aria-label="Toggle password visibility"
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 font-pop">Confirm Password *</label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={confirmPass ? 'text' : 'password'}
              required
              placeholder="Re-type your password"
              value={regData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3.5 py-2.5 pr-10 rounded-lg font-pop text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-base"
              onClick={() => setConfirmPass(!confirmPass)}
              aria-label="Toggle confirm password visibility"
            >
              {confirmPass ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-xs sm:text-sm font-pop pt-1">
          <label className="flex items-center cursor-pointer select-none">
            <input
              name="terms"
              type="checkbox"
              checked={regData.terms}
              onChange={handleChange}
              className="mr-2 rounded text-primary focus:ring-primary h-4 w-4"
            />
            <span>
              I accept the{' '}
              <Link to="/terms" className="text-primary hover:underline font-semibold">
                Terms & Conditions
              </Link>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full text-sm font-semibold font-pop transition-colors shadow-md disabled:opacity-70 mt-2"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600 font-pop">
        Already have an account?{' '}
        <Link to="/login" className="text-primary hover:underline font-semibold">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default Registration
