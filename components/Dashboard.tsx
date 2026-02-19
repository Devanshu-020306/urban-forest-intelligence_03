'use client'

import { TreePine, Droplets, AlertTriangle, CheckCircle, TrendingUp, Users } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const survivalData = [
  { month: 'Jan', survival: 95, planted: 120 },
  { month: 'Feb', survival: 93, planted: 150 },
  { month: 'Mar', survival: 96, planted: 200 },
  { month: 'Apr', survival: 94, planted: 180 },
  { month: 'May', survival: 97, planted: 220 },
  { month: 'Jun', survival: 96, planted: 190 },
]

const healthData = [
  { name: 'Healthy', value: 1245, color: '#22c55e' },
  { name: 'Needs Care', value: 156, color: '#f59e0b' },
  { name: 'Critical', value: 23, color: '#ef4444' },
]

const speciesData = [
  { species: 'Oak', count: 345 },
  { species: 'Maple', count: 289 },
  { species: 'Pine', count: 234 },
  { species: 'Birch', count: 198 },
  { species: 'Willow', count: 158 },
]

interface DashboardProps {
  userRole: 'admin' | 'visitor' | null
}

export default function Dashboard({ userRole }: DashboardProps) {
  const stats = [
    { label: 'Total Trees', value: '1,424', icon: TreePine, color: 'bg-green-500', change: '+12%' },
    { label: 'Survival Rate', value: '95.8%', icon: CheckCircle, color: 'bg-emerald-500', change: '+2.3%' },
    { label: 'Active Caretakers', value: '89', icon: Users, color: 'bg-blue-500', change: '+5' },
    { label: 'Alerts Today', value: '12', icon: AlertTriangle, color: 'bg-amber-500', change: '-3' },
  ]

  return (
    <div className="space-y-6">
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
                  <p className="text-sm text-green-600 font-medium mt-1">{stat.change} this month</p>
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
        {/* Survival Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Survival Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={survivalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="survival" stroke="#22c55e" strokeWidth={3} name="Survival %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Health Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tree Health Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={healthData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
        </div>
      </div>

      {/* Species Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Species Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={speciesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="species" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {[
            { tree: 'Oak #1234', issue: 'Missed watering schedule', severity: 'medium', time: '2 hours ago' },
            { tree: 'Maple #5678', issue: 'Disease detected - leaf spots', severity: 'high', time: '5 hours ago' },
            { tree: 'Pine #9012', issue: 'Low soil moisture', severity: 'medium', time: '1 day ago' },
          ].map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${alert.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'}`}>
                  <AlertTriangle className={`h-5 w-5 ${alert.severity === 'high' ? 'text-red-600' : 'text-amber-600'}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{alert.tree}</p>
                  <p className="text-sm text-gray-600">{alert.issue}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
