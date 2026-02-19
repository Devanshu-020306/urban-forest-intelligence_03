'use client'

import { useState, useEffect, lazy, Suspense, useMemo } from 'react'
import { TreePine, Users, Activity, TrendingUp, Menu, X, LogOut, Camera } from 'lucide-react'
import Login from '@/components/Login'

// Lazy load components for better performance
const Dashboard = lazy(() => import('@/components/Dashboard-functional'))
const TreeRegistry = lazy(() => import('@/components/TreeRegistry-functional'))
const CareLog = lazy(() => import('@/components/CareLog-functional'))
const Analytics = lazy(() => import('@/components/Analytics-functional'))
const DiseaseDetector = lazy(() => import('@/components/DiseaseDetector'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
)

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState<'admin' | 'visitor'>('visitor')

  useEffect(() => {
    // Set default tab based on role
    if (isLoggedIn && userRole === 'visitor') {
      setActiveTab('disease-detector')
    }
  }, [isLoggedIn, userRole])

  const handleLogin = (email: string) => {
    setIsLoggedIn(true)
    setUserEmail(email)
    
    // Determine role based on email
    if (email.includes('admin')) {
      setUserRole('admin')
      setActiveTab('dashboard')
    } else {
      setUserRole('visitor')
      setActiveTab('disease-detector')
    }
  }   

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
    setUserRole('visitor')
    setActiveTab('dashboard')
  }

  // Navigation items based on role - memoized for performance
  const navigation = useMemo(() => {
    if (userRole === 'admin') {
      return [
        { id: 'dashboard', name: 'Dashboard', icon: Activity },
        { id: 'registry', name: 'Tree Registry', icon: TreePine },
        { id: 'care', name: 'Care Logs', icon: Users },
        { id: 'analytics', name: 'Analytics', icon: TrendingUp },
        { id: 'disease-detector', name: 'Plant Detector', icon: Camera },
      ]
    } else {
      return [
        { id: 'disease-detector', name: 'Plant Detector', icon: Camera },
      ]
    }
  }, [userRole])

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className={`shadow-md sticky top-0 z-50 ${
        userRole === 'admin' 
          ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
          : 'bg-gradient-to-r from-blue-600 to-cyan-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                userRole === 'admin' 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <TreePine className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-white">Urban Forest Intelligence</h1>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    userRole === 'admin' 
                      ? 'bg-yellow-400 text-green-900' 
                      : 'bg-blue-200 text-blue-900'
                  }`}>
                    {userRole === 'admin' ? '👨‍💼 ADMIN' : '👁️ VISITOR'}
                  </span>
                </div>
                <p className="text-sm text-white/90">
                  {userRole === 'admin' 
                    ? 'Full Management & Analytics Dashboard' 
                    : 'Plant Health Detection Portal'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Quick Actions - Admin Only */}
              {userRole === 'admin' && (
                <div className="hidden lg:flex items-center space-x-2">
                  <button
                    onClick={() => setActiveTab('registry')}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <TreePine className="h-4 w-4" />
                    <span className="text-sm font-medium">Quick Register</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Add Care Log</span>
                  </button>
                </div>
              )}

              {/* User Info */}
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-white">{userEmail}</p>
                <p className="text-xs text-white/80">
                  {userRole === 'admin' ? 'Administrator' : 'Visitor'} • Logged In
                </p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/20 text-white"
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
                      ? 'bg-white text-green-600 shadow-lg font-semibold'
                      : 'text-white hover:bg-white/20'
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
                        ? 'bg-white text-green-600 font-semibold'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                )
              })}
              <div className="pt-2 border-t border-white/20">
                <div className="px-4 py-2 text-sm text-white">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    userRole === 'admin' 
                      ? 'bg-yellow-400 text-green-900' 
                      : 'bg-blue-200 text-blue-900'
                  }`}>
                    {userRole === 'admin' ? '👨‍💼 ADMIN' : '👁️ VISITOR'}
                  </span>
                  <p className="mt-2">{userEmail}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Admin Welcome Banner */}
      {userRole === 'admin' && activeTab === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-xl p-6 text-white border-2 border-green-400">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-3xl">👨‍💼</span>
                  <h2 className="text-2xl font-bold">Welcome, Administrator!</h2>
                </div>
                <p className="text-green-50 mb-4">You have full access to manage trees, track activities, and analyze environmental impact.</p>
                
                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('registry')}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all flex items-center space-x-2 text-sm font-medium"
                  >
                    <TreePine className="h-4 w-4" />
                    <span>Add New Tree</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all flex items-center space-x-2 text-sm font-medium"
                  >
                    <Users className="h-4 w-4" />
                    <span>Log Care Activity</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all flex items-center space-x-2 text-sm font-medium"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 min-w-[180px]">
                  <p className="text-sm font-semibold text-green-100">Access Level</p>
                  <p className="text-4xl font-bold mt-2">FULL</p>
                  <p className="text-xs text-green-100 mt-2">All Features Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        userRole === 'admin' && activeTab === 'dashboard' ? 'py-6' : 'py-8'
      }`}>
        <Suspense fallback={<LoadingSpinner />}>
          {activeTab === 'dashboard' && userRole === 'admin' && <Dashboard />}
          {activeTab === 'registry' && userRole === 'admin' && <TreeRegistry />}
          {activeTab === 'care' && userRole === 'admin' && <CareLog />}
          {activeTab === 'analytics' && userRole === 'admin' && <Analytics />}
          {activeTab === 'disease-detector' && <DiseaseDetector />}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-600">
                © 2024 Urban Forest Intelligence System
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {userRole === 'admin' ? 'Administrator Dashboard' : 'Visitor Portal'} • Powered by AI & Firebase
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                userRole === 'admin' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {userRole === 'admin' ? '👨‍💼 Admin Mode' : '👁️ Visitor Mode'}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
