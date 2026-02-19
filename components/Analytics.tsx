'use client'

import { TrendingUp, Droplets, Wind, Leaf, AlertCircle } from 'lucide-react'
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const carbonData = [
  { month: 'Jan', carbon: 245, oxygen: 180 },
  { month: 'Feb', carbon: 268, oxygen: 196 },
  { month: 'Mar', carbon: 312, oxygen: 228 },
  { month: 'Apr', carbon: 356, oxygen: 260 },
  { month: 'May', carbon: 398, oxygen: 291 },
  { month: 'Jun', carbon: 445, oxygen: 325 },
]

const maintenanceData = [
  { week: 'Week 1', completed: 95, missed: 5 },
  { week: 'Week 2', completed: 92, missed: 8 },
  { week: 'Week 3', completed: 97, missed: 3 },
  { week: 'Week 4', completed: 94, missed: 6 },
]

const diseaseData = [
  { month: 'Jan', detected: 12, treated: 11 },
  { month: 'Feb', detected: 8, treated: 8 },
  { month: 'Mar', detected: 15, treated: 14 },
  { month: 'Apr', detected: 10, treated: 10 },
  { month: 'May', detected: 6, treated: 6 },
  { month: 'Jun', detected: 9, treated: 8 },
]

interface AnalyticsProps {
  userRole: 'admin' | 'visitor' | null
}

export default function Analytics({ userRole }: AnalyticsProps) {
  const impactMetrics = [
    { label: 'CO₂ Captured', value: '2,145 kg', icon: Wind, color: 'bg-blue-500', trend: '+18%' },
    { label: 'O₂ Produced', value: '1,567 kg', icon: Leaf, color: 'bg-green-500', trend: '+15%' },
    { label: 'Water Efficiency', value: '87%', icon: Droplets, color: 'bg-cyan-500', trend: '+5%' },
    { label: 'Disease Detection', value: '94%', icon: AlertCircle, color: 'bg-purple-500', trend: '+8%' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Impact</h2>
        <p className="text-gray-600 mt-1">Environmental impact and performance metrics</p>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{metric.trend}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* Environmental Impact */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Environmental Impact Over Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={carbonData}>
            <defs>
              <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOxygen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="carbon" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCarbon)" name="CO₂ Captured (kg)" />
            <Area type="monotone" dataKey="oxygen" stroke="#22c55e" fillOpacity={1} fill="url(#colorOxygen)" name="O₂ Produced (kg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Maintenance Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Maintenance Compliance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[8, 8, 0, 0]} />
              <Bar dataKey="missed" fill="#ef4444" name="Missed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Disease Detection & Treatment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={diseaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="detected" stroke="#f59e0b" strokeWidth={3} name="Detected" />
              <Line type="monotone" dataKey="treated" stroke="#22c55e" strokeWidth={3} name="Treated" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Survival Rate Improvement</h4>
            </div>
            <p className="text-sm text-gray-600">
              Tree survival rate has increased by 12% since implementing AI-driven care recommendations
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Water Conservation</h4>
            </div>
            <p className="text-sm text-gray-600">
              Smart watering schedules have reduced water usage by 23% while maintaining tree health
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Early Detection</h4>
            </div>
            <p className="text-sm text-gray-600">
              ML-based disease detection identifies issues 7 days earlier than manual inspection
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Carbon Impact</h4>
            </div>
            <p className="text-sm text-gray-600">
              Urban forest has captured 2,145 kg of CO₂ and produced 1,567 kg of O₂ this year
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
