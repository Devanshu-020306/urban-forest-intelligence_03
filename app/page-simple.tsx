'use client'

import { useState } from 'react'
import { TreePine, Users, Activity, TrendingUp, Menu, X, LogOut } from 'lucide-react'
import Dashboard from '@/components/Dashboard'
import TreeRegistry from '@/components/TreeRegistry'
import CareLog from '@/components/CareLog'
import Analytics from '@/components/Analytics'
import Login from '@/components/Login'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleLogin = (email: string) => {
    setIsLoggedIn(true)
    setUserEmail(email)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
  }

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Activity },
    { id: 'registry', name: 'Tree Registry', icon: TreePine },
    { id: 'care', name: 'Care Logs', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
  ]

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Urban Forest Intelligence</h1>
                <p className="text-sm text-gray-600">AI-Powered Tree Lifecycle Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{userEmail}</p>
                <p className="text-xs text-gray-600">Logged In</p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 pb-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'registry' && <TreeRegistry />}
        {activeTab === 'care' && <CareLog />}
        {activeTab === 'analytics' && <Analytics />}
      </main>
    </div>
  )
}
