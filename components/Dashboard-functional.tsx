'use client'

import { TreePine, Droplets, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTrees, useCareLogs } from '@/hooks/useFirestore'

export default function Dashboard() {
  const { trees, loading: treesLoading } = useTrees()
  const { logs, loading: logsLoading } = useCareLogs()

  // Calculate real statistics
  const totalTrees = trees.length
  const healthyTrees = trees.filter(t => t.health === 'Healthy').length
  const needsCareTrees = trees.filter(t => t.health === 'Needs Care').length
  const criticalTrees = trees.filter(t => t.health === 'Critical').length
  const avgSurvivalRate = trees.length > 0 
    ? (trees.reduce((sum, t) => sum + t.survivalProb, 0) / trees.length).toFixed(1)
    : '0'
  
  const uniqueCaretakers = new Set(trees.map(t => t.caretaker)).size
  const recentLogs = logs.slice(0, 3)

  // Admin insights
  const treesNeedingAttention = trees.filter(t => t.health === 'Critical' || t.health === 'Needs Care')
  const recentlyPlanted = trees.filter(t => {
    const plantDate = new Date(t.plantedDate)
    const daysSincePlanted = Math.floor((Date.now() - plantDate.getTime()) / (1000 * 60 * 60 * 24))
    return daysSincePlanted <= 30
  }).length

  const healthData = [
    { name: 'Healthy', value: healthyTrees, color: '#22c55e' },
    { name: 'Needs Care', value: needsCareTrees, color: '#f59e0b' },
    { name: 'Critical', value: criticalTrees, color: '#ef4444' },
  ]

  const speciesCount: Record<string, number> = {}
  trees.forEach(tree => {
    speciesCount[tree.species] = (speciesCount[tree.species] || 0) + 1
  })
  const speciesData = Object.entries(speciesCount)
    .map(([species, count]) => ({ species, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const stats = [
    { label: 'Total Trees', value: totalTrees.toString(), icon: TreePine, color: 'bg-green-500', change: `${trees.length} registered` },
    { label: 'Survival Rate', value: `${avgSurvivalRate}%`, icon: CheckCircle, color: 'bg-emerald-500', change: 'Average' },
    { label: 'Active Caretakers', value: uniqueCaretakers.toString(), icon: Users, color: 'bg-blue-500', change: 'Unique' },
    { label: 'Care Activities', value: logs.length.toString(), icon: Droplets, color: 'bg-cyan-500', change: 'Total logged' },
  ]

  if (treesLoading || logsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Admin Action Items */}
      {(treesNeedingAttention.length > 0 || recentlyPlanted > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {treesNeedingAttention.length > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-5">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">⚠️ Attention Required</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-bold text-orange-600">{treesNeedingAttention.length} trees</span> need immediate care or monitoring
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {criticalTrees > 0 && `${criticalTrees} Critical • `}
                    {needsCareTrees > 0 && `${needsCareTrees} Needs Care`}
                  </p>
                </div>
              </div>
            </div>
          )}
          {recentlyPlanted > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
              <div className="flex items-start space-x-3">
                <TreePine className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">🌱 Recently Planted</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-bold text-green-600">{recentlyPlanted} trees</span> planted in the last 30 days
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Monitor closely for optimal survival rates
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tree Health Distribution</h3>
          {totalTrees > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={healthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {healthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No data available - Register trees to see statistics
            </div>
          )}
        </div>

        {/* Species Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Species Distribution</h3>
          {speciesData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={speciesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="species" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No data available - Register trees to see distribution
            </div>
          )}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
        {recentLogs.length > 0 ? (
          <div className="space-y-3">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{log.treeId} - {log.species}</p>
                    <p className="text-sm text-gray-600">{log.activity} by {log.caretaker}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{log.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No activities logged yet - Start tracking care activities
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <TreePine className="h-10 w-10 text-green-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-2">Register New Tree</h4>
          <p className="text-sm text-gray-600 mb-4">Add a new tree to the registry and start tracking</p>
          <button className="text-sm text-green-600 font-medium hover:text-green-700">
            Go to Registry →
          </button>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <Droplets className="h-10 w-10 text-blue-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-2">Log Care Activity</h4>
          <p className="text-sm text-gray-600 mb-4">Record maintenance and care activities</p>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
            Go to Care Logs →
          </button>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
          <TrendingUp className="h-10 w-10 text-purple-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-2">View Analytics</h4>
          <p className="text-sm text-gray-600 mb-4">Analyze environmental impact and trends</p>
          <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
            Go to Analytics →
          </button>
        </div>
      </div>
    </div>
  )
}
