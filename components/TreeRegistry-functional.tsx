'use client'

import { useState } from 'react'
import { MapPin, Calendar, User, Camera, Plus, Search, Filter, Loader2, Sparkles, TreePine } from 'lucide-react'
import { useTrees } from '@/hooks/useFirestore'
import { uploadTreeImage } from '@/lib/storage'
import PlantIdentifier from './PlantIdentifier'

export default function TreeRegistry() {
  const { trees, loading, addNewTree, updateExistingTree } = useTrees()
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAIIdentifier, setShowAIIdentifier] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    treeId: '',
    species: '',
    plantedDate: '',
    location: '',
    caretaker: '',
    health: 'Healthy' as 'Healthy' | 'Needs Care' | 'Critical',
    lastWatered: new Date().toISOString().split('T')[0],
    survivalProb: 95,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let imageUrl = ''
      
      // Upload image if provided
      if (imageFile) {
        const { url, error } = await uploadTreeImage(imageFile, formData.treeId)
        if (url) imageUrl = url
      }

      const result = await addNewTree({
        ...formData,
        imageUrl,
      } as any)

      if (result.success) {
        setShowAddForm(false)
        setFormData({
          treeId: '',
          species: '',
          plantedDate: '',
          location: '',
          caretaker: '',
          health: 'Healthy',
          lastWatered: new Date().toISOString().split('T')[0],
          survivalProb: 95,
        })
        setImageFile(null)
      }
    } catch (error) {
      console.error('Error adding tree:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const filteredTrees = trees.filter(tree => 
    tree.treeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.species?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tree.caretaker?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tree Registry</h2>
          <p className="text-gray-600 mt-1">Manage and track all planted trees ({trees.length} total)</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Register New Tree</span>
        </button>
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tree ID</label>
                <input 
                  type="text" 
                  required
                  value={formData.treeId}
                  onChange={(e) => setFormData({...formData, treeId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="e.g., T-1001" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
                <input 
                  type="text" 
                  required
                  value={formData.species}
                  onChange={(e) => setFormData({...formData, species: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="e.g., Oak" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Planted Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.plantedDate}
                  onChange={(e) => setFormData({...formData, plantedDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="40.7128° N, 74.0060° W" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caretaker</label>
                <input 
                  type="text" 
                  required
                  value={formData.caretaker}
                  onChange={(e) => setFormData({...formData, caretaker: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                  placeholder="Caretaker name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Health Status</label>
                <select 
                  value={formData.health}
                  onChange={(e) => setFormData({...formData, health: e.target.value as any})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="Healthy">Healthy</option>
                  <option value="Needs Care">Needs Care</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                type="button"
                onClick={() => setShowAddForm(false)} 
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 disabled:opacity-50"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{submitting ? 'Registering...' : 'Register Tree'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tree List */}
      {filteredTrees.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <TreePine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No trees found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search' : 'Start by registering your first tree'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              <Plus className="h-5 w-5" />
              <span>Register First Tree</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredTrees.map((tree) => (
            <div key={tree.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{tree.species}</h3>
                      <p className="text-gray-600">ID: {tree.treeId}</p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      tree.health === 'Healthy' ? 'bg-green-100 text-green-800' : 
                      tree.health === 'Needs Care' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
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
                  <button className="flex-1 lg:flex-none px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    Add Care Log
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
