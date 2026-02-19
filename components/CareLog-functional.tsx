'use client'

import { useState } from 'react'
import { Droplets, Scissors, Leaf, Camera, Calendar, CheckCircle, Clock, Loader2 } from 'lucide-react'
import { useCareLogs, useTrees } from '@/hooks/useFirestore'
import { uploadCareLogImage } from '@/lib/storage'

const activityIcons: Record<string, any> = {
  Watering: Droplets,
  Fertilizer: Leaf,
  Pruning: Scissors,
  'Disease Treatment': Leaf,
  Inspection: CheckCircle,
}

export default function CareLog() {
  const { logs, loading, addNewLog } = useCareLogs()
  const { trees, loading: treesLoading } = useTrees()
  const [showAddForm, setShowAddForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    treeId: '',
    activity: 'Watering',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    notes: '',
    caretaker: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.treeId) {
      alert('Please select a tree')
      return
    }
    
    if (!formData.caretaker) {
      alert('Please enter caretaker name')
      return
    }
    
    setSubmitting(true)

    try {
      const selectedTree = trees.find(t => t.treeId === formData.treeId)
      let imageUrl = ''
      
      if (imageFile) {
        const logId = `log-${Date.now()}`
        const { url } = await uploadCareLogImage(imageFile, logId)
        if (url) imageUrl = url
      }

      const result = await addNewLog({
        ...formData,
        species: selectedTree?.species || 'Unknown',
        status: 'completed',
        imageUrl,
      } as any)

      if (result.success) {
        setShowAddForm(false)
        setFormData({
          treeId: '',
          activity: 'Watering',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toTimeString().slice(0, 5),
          notes: '',
          caretaker: '',
        })
        setImageFile(null)
      }
    } catch (error) {
      console.error('Error adding care log:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Care Activity Logs</h2>
          <p className="text-gray-600 mt-1">Track maintenance and care activities ({logs.length} total)</p>
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
          
          {treesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-600 mr-3" />
              <span className="text-gray-600">Loading trees...</span>
            </div>
          ) : trees.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No trees registered yet. Please add trees first.</p>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tree ID <span className="text-red-500">*</span>
                  </label>
                  <select 
                    required
                    value={formData.treeId}
                    onChange={(e) => setFormData({...formData, treeId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a tree ({trees.length} available)</option>
                    {trees.map(tree => (
                      <option key={tree.id} value={tree.treeId}>
                        {tree.treeId} - {tree.species} ({tree.location})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {trees.length} tree(s) available in registry
                  </p>
                </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                <select 
                  value={formData.activity}
                  onChange={(e) => setFormData({...formData, activity: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option>Watering</option>
                  <option>Fertilizer</option>
                  <option>Pruning</option>
                  <option>Disease Treatment</option>
                  <option>Inspection</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caretaker <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.caretaker}
                  onChange={(e) => setFormData({...formData, caretaker: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input 
                  type="time" 
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add any observations or notes..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button 
                type="button"
                onClick={() => setShowAddForm(false)} 
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{submitting ? 'Saving...' : 'Save Activity'}</span>
              </button>
            </div>
          </form>
          )}
        </div>
      )}

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities logged yet</h3>
            <p className="text-gray-600 mb-6">Start tracking tree care activities</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Log First Activity</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {logs.map((log, index) => {
              const Icon = activityIcons[log.activity] || CheckCircle
              return (
                <div key={log.id} className="relative">
                  {index !== logs.length - 1 && (
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
        )}
      </div>

      {/* Care Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">AI Care Recommendations</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
              <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Watering Schedule</p>
                <p className="text-sm text-gray-600">Based on weather data, increase watering frequency for next 7 days</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
            <div className="flex items-start space-x-3">
              <Leaf className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Fertilizer Application</p>
                <p className="text-sm text-gray-600">Spring season - Apply nitrogen-rich fertilizer to promote growth</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
            <div className="flex items-start space-x-3">
              <Scissors className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Pruning Reminder</p>
                <p className="text-sm text-gray-600">Optimal time for pruning deciduous trees - Schedule within 2 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
