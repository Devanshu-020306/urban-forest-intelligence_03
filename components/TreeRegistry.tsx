'use client'

import { useState } from 'react'
import { MapPin, Calendar, User, Camera, Plus, Search, Filter } from 'lucide-react'

const mockTrees = [
  {
    id: 'T-1001',
    species: 'Oak',
    plantedDate: '2024-01-15',
    location: '40.7128° N, 74.0060° W',
    caretaker: 'John Doe',
    health: 'Healthy',
    lastWatered: '2024-02-18',
    survivalProb: 96,
  },
  {
    id: 'T-1002',
    species: 'Maple',
    plantedDate: '2024-01-20',
    location: '40.7580° N, 73.9855° W',
    caretaker: 'Jane Smith',
    health: 'Needs Care',
    lastWatered: '2024-02-15',
    survivalProb: 82,
  },
  {
    id: 'T-1003',
    species: 'Pine',
    plantedDate: '2024-02-01',
    location: '40.7489° N, 73.9680° W',
    caretaker: 'Mike Johnson',
    health: 'Healthy',
    lastWatered: '2024-02-18',
    survivalProb: 94,
  },
]

interface TreeRegistryProps {
  userRole: 'admin' | 'visitor' | null
}

export default function TreeRegistry({ userRole }: TreeRegistryProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const isAdmin = userRole === 'admin'

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tree Registry</h2>
          <p className="text-gray-600 mt-1">Manage and track all planted trees</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Register New Tree</span>
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, species, or caretaker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Add Tree Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Register New Tree</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="e.g., Oak" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Planted Date</label>
              <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location (Lat, Long)</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="40.7128, -74.0060" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caretaker</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Caretaker name" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload or drag and drop</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button onClick={() => setShowAddForm(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Register Tree
            </button>
          </div>
        </div>
      )}

      {/* Tree List */}
      <div className="grid grid-cols-1 gap-6">
        {mockTrees.map((tree) => (
          <div key={tree.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{tree.species}</h3>
                    <p className="text-gray-600">ID: {tree.id}</p>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    tree.health === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {tree.health}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>Planted: {tree.plantedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="h-5 w-5" />
                    <span>{tree.caretaker}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>{tree.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className="font-medium">Last Watered:</span>
                    <span>{tree.lastWatered}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Survival Probability</span>
                      <span className="font-bold text-green-600">{tree.survivalProb}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${tree.survivalProb}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:ml-6 mt-4 lg:mt-0 flex lg:flex-col gap-2">
                <button className="flex-1 lg:flex-none px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  View Details
                </button>
                {isAdmin && (
                  <button className="flex-1 lg:flex-none px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    Add Care Log
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
