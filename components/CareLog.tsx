'use client'

import { useState } from 'react'
import { Droplets, Scissors, Leaf, Camera, Calendar, CheckCircle, Clock } from 'lucide-react'

const careLogs = [
  {
    id: 1,
    treeId: 'T-1001',
    species: 'Oak',
    activity: 'Watering',
    caretaker: 'John Doe',
    date: '2024-02-18',
    time: '08:30 AM',
    notes: 'Regular watering schedule maintained',
    status: 'completed',
  },
  {
    id: 2,
    treeId: 'T-1002',
    species: 'Maple',
    activity: 'Fertilizer',
    caretaker: 'Jane Smith',
    date: '2024-02-17',
    time: '10:15 AM',
    notes: 'Applied organic fertilizer',
    status: 'completed',
  },
  {
    id: 3,
    treeId: 'T-1003',
    species: 'Pine',
    activity: 'Pruning',
    caretaker: 'Mike Johnson',
    date: '2024-02-16',
    time: '02:45 PM',
    notes: 'Removed dead branches',
    status: 'completed',
  },
]

const activityIcons = {
  Watering: Droplets,
  Fertilizer: Leaf,
  Pruning: Scissors,
}

export default function CareLog() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Care Activity Logs</h2>
          <p className="text-gray-600 mt-1">Track maintenance and care activities</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Log Activity</span>
        </button>
      </div>

      {/* Add Activity Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Log Care Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tree ID</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="T-1001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                <option>Watering</option>
                <option>Fertilizer</option>
                <option>Pruning</option>
                <option>Disease Treatment</option>
                <option>Inspection</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input type="time" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Add any observations or notes..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                <Camera className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload photo</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button onClick={() => setShowAddForm(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Save Activity
            </button>
          </div>
        </div>
      )}

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
        <div className="space-y-6">
          {careLogs.map((log, index) => {
            const Icon = activityIcons[log.activity as keyof typeof activityIcons] || CheckCircle
            return (
              <div key={log.id} className="relative">
                {index !== careLogs.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                )}
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">{log.activity}</h4>
                        <p className="text-sm text-gray-600">
                          {log.species} - {log.treeId}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2 sm:mt-0">
                        <Calendar className="h-4 w-4" />
                        <span>{log.date}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{log.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{log.notes}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">By {log.caretaker}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Care Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">AI Care Recommendations</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
              <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Watering Alert</p>
                <p className="text-sm text-gray-600">Trees T-1005, T-1008, T-1012 need watering within 24 hours</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
            <div className="flex items-start space-x-3">
              <Leaf className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Fertilizer Schedule</p>
                <p className="text-sm text-gray-600">15 trees are due for fertilizer application this week</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-start space-x-3">
              <Scissors className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Pruning Needed</p>
                <p className="text-sm text-gray-600">Oak trees in Zone A require seasonal pruning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
