'use client'

import { TrendingUp, Droplets, Wind, Leaf, AlertCircle } from 'lucide-react'
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTrees, useCareLogs } from '@/hooks/useFirestore'

export default function Analytics() {
  const { trees } = useTrees()
  const { logs } = useCareLogs()

  // Calculate environmental impact based on tree count and age
  const calculateImpact = () => {
    const avgCO2PerTree = 21.77 // kg per year
    const avgO2PerTree = 118 // kg per year
    
    const totalCO2 = (trees.length * avgCO2PerTree * 0.5).toFixed(0) // Assuming 6 months average
    const totalO2 = (trees.length * avgO2PerTree * 0.5).toFixed(0)
    
    return { totalCO2, totalO2 }
  }

  const { totalCO2, totalO2 } = calculateImpact()

  // Calculate maintenance compliance
  const wateringLogs = logs.filter(l => l.activity === 'Watering')
  const maintenanceRate = trees.length > 0 
    ? ((wateringLogs.length / (trees.length * 4)) * 100).toFixed(0) // Assuming weekly watering
    : 0

  // Disease detection stats
  const diseaseDetected = logs.filter(l => l.activity === 'Disease Treatment').length
  const inspections = logs.filter(l => l.activity === 'Inspection').length
  const detectionRate = inspections > 0 ? ((diseaseDetected / inspections) * 100).toFixed(0) : 0

  const impactMetrics = [
    { label: 'CO₂ Captured', value: `${totalCO2} kg`, icon: Wind, color: 'bg-blue-500', trend: 'YTD' },
    { label: 'O₂ Produced', value: `${totalO2} kg`, icon: Leaf, color: 'bg-green-500', trend: 'YTD' },
    { label: 'Maintenance Rate', value: `${maintenanceRate}%`, icon: Droplets, color: 'bg-cyan-500', trend: 'Compliance' },
    { label: 'Health Monitoring', value: `${inspections}`, icon: AlertCircle, color: 'bg-purple-500', trend: 'Inspections' },
  ]

  // Generate monthly data
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((month, index) => ({
      month,
      carbon: Math.round((index + 1) * (parseFloat(totalCO2) / 6)),
      oxygen: Math.round((index + 1) * (parseFloat(totalO2) / 6)),
    }))
  }

  const carbonData = generateMonthlyData()

  // Activity distribution
  const activityCount: Record<string, number> = {}
  logs.forEach(log => {
    activityCount[log.activity] = (activityCount[log.activity] || 0) + 1
  })
  const activityData = Object.entries(activityCount).map(([activity, count]) => ({
    activity,
    count,
  }))

  // Species health analysis
  const speciesHealth: Record<string, { healthy: number; needsCare: number; critical: number }> = {}
  trees.forEach(tree => {
    if (!speciesHealth[tree.species]) {
      speciesHealth[tree.species] = { healthy: 0, needsCare: 0, critical: 0 }
    }
    if (tree.health === 'Healthy') speciesHealth[tree.species].healthy++
    else if (tree.health === 'Needs Care') speciesHealth[tree.species].needsCare++
    else speciesHealth[tree.species].critical++
  })

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
                <span className="text-sm font-medium text-gray-600">{metric.trend}</span>
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
        {trees.length > 0 ? (
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
        ) : (
          <div className="h-[350px] flex items-center justify-center text-gray-400">
            No data available - Register trees to see environmental impact
          </div>
        )}
      </div>

      {/* Activity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Care Activity Distribution</h3>
          {activityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No activities logged yet
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tree Health by Species</h3>
          {Object.keys(speciesHealth).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(speciesHealth).map(([species, health]) => {
                const total = health.healthy + health.needsCare + health.critical
                return (
                  <div key={species}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900">{species}</span>
                      <span className="text-sm text-gray-600">{total} trees</span>
                    </div>
                    <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
                      {health.healthy > 0 && (
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(health.healthy / total) * 100}%` }}
                          title={`Healthy: ${health.healthy}`}
                        />
                      )}
                      {health.needsCare > 0 && (
                        <div 
                          className="bg-amber-500" 
                          style={{ width: `${(health.needsCare / total) * 100}%` }}
                          title={`Needs Care: ${health.needsCare}`}
                        />
                      )}
                      {health.critical > 0 && (
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(health.critical / total) * 100}%` }}
                          title={`Critical: ${health.critical}`}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No trees registered yet
            </div>
          )}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Forest Growth</h4>
            </div>
            <p className="text-sm text-gray-600">
              {trees.length} trees registered with an average survival probability of {
                trees.length > 0 
                  ? (trees.reduce((sum, t) => sum + t.survivalProb, 0) / trees.length).toFixed(1)
                  : 0
              }%
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Care Activities</h4>
            </div>
            <p className="text-sm text-gray-600">
              {logs.length} total activities logged with {wateringLogs.length} watering sessions completed
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Health Monitoring</h4>
            </div>
            <p className="text-sm text-gray-600">
              {inspections} inspections conducted with {diseaseDetected} treatments applied
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Carbon Impact</h4>
            </div>
            <p className="text-sm text-gray-600">
              Urban forest has captured {totalCO2} kg of CO₂ and produced {totalO2} kg of O₂
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
