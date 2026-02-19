'use client'

import { useState } from 'react'
import { TreePine, Lock, Mail, Eye, EyeOff } from 'lucide-react'

interface LoginProps {
  onLogin: (email: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Simple validation
    if (credentials.email && credentials.password) {
      onLogin(credentials.email)
    } else {
      setError('Please enter email and password')
    }
  }

  const handleDemoLogin = (email: string) => {
    onLogin(email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg mb-4">
            <TreePine className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Urban Forest Intelligence</h1>
          <p className="text-gray-600">AI-Powered Tree Lifecycle Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          {/* Quick Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Login</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemoLogin('admin@urbanforest.com')}
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                <Lock className="h-4 w-4" />
                <span>Admin</span>
              </button>
              <button
                onClick={() => handleDemoLogin('visitor@urbanforest.com')}
                className="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>Visitor</span>
              </button>
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 font-medium mb-2">Demo Mode:</p>
            <p className="text-xs text-gray-500">
              Click Admin or Visitor buttons above for instant access
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Demo mode - No authentication required
        </p>
      </div>
    </div>
  )
}
