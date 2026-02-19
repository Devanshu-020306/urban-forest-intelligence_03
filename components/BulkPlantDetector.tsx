'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Download, Image as ImageIcon } from 'lucide-react'
import { parseCSV, parseJSON } from '@/lib/dataImport'
import { detectPlantFromUrl, identifyPlant } from '@/lib/plantIdentification'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface DetectionResult {
  imageUrl: string
  plantName?: string
  species?: string
  health?: string
  confidence?: number
  disease?: string
  treatment?: string
  error?: string
}

export default function BulkPlantDetector() {
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState<DetectionResult[]>([])
  const [progress, setProgress] = useState({ current: 0, total: 0 })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setProcessing(true)
    setResults([])

    try {
      const text = await file.text()
      let data: any[] = []

      // Parse based on file type
      if (file.name.endsWith('.csv')) {
        data = parseCSV(text)
      } else if (file.name.endsWith('.json')) {
        data = parseJSON(text)
      } else {
        throw new Error('Unsupported file format. Please use CSV or JSON.')
      }

      // Extract image URLs/paths
      const imageData = data.map(row => ({
        imageUrl: row.imageUrl || row.image_url || row.image || row.path || row.url || '',
        treeId: row.treeId || row.tree_id || row.id || '',
        location: row.location || '',
        plantedDate: row.plantedDate || row.planted_date || '',
      })).filter(item => item.imageUrl)

      setProgress({ current: 0, total: imageData.length })

      // Process each image
      const detectionResults: DetectionResult[] = []
      
      for (let i = 0; i < imageData.length; i++) {
        const item = imageData[i]
        setProgress({ current: i + 1, total: imageData.length })

        try {
          // Detect plant from image URL
          const detection = await detectPlantFromUrl(item.imageUrl)
          
          detectionResults.push({
            imageUrl: item.imageUrl,
            plantName: detection.plantName,
            species: detection.species,
            health: detection.health,
            confidence: detection.confidence,
            disease: detection.disease,
            treatment: detection.treatment,
          })

          // Auto-save to Firebase if detection successful
          if (detection.plantName && item.treeId) {
            await addDoc(collection(db, 'trees'), {
              treeId: item.treeId,
              species: detection.species || detection.plantName,
              plantedDate: item.plantedDate || new Date().toISOString().split('T')[0],
              location: item.location || 'Unknown',
              caretaker: 'Bulk Import',
              health: detection.health || 'Healthy',
              survivalProb: detection.confidence || 85,
              imageUrl: item.imageUrl,
              detectedPlant: detection.plantName,
              detectedDisease: detection.disease,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          }
        } catch (error: any) {
          detectionResults.push({
            imageUrl: item.imageUrl,
            error: error.message || 'Detection failed',
          })
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      setResults(detectionResults)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setProcessing(false)
    }
  }

  const downloadResults = () => {
    const csvContent = [
      'imageUrl,plantName,species,health,confidence,disease,treatment,error',
      ...results.map(r => 
        `"${r.imageUrl}","${r.plantName || ''}","${r.species || ''}","${r.health || ''}","${r.confidence || ''}","${r.disease || ''}","${r.treatment || ''}","${r.error || ''}"`
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `plant_detection_results_${Date.now()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadTemplate = () => {
    const csvContent = 'imageUrl,treeId,location,plantedDate\n' +
      'https://example.com/leaf1.jpg,T-001,Central Park,2024-01-15\n' +
      'https://example.com/leaf2.jpg,T-002,Riverside Park,2024-01-20\n'

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bulk_plant_detection_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bulk Plant Detection</h2>
        <p className="text-gray-600 mt-1">Upload CSV with image URLs to detect plant details automatically</p>
      </div>

      {/* Download Template */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <Download className="h-6 w-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Download Template</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download CSV template with image URL format
            </p>
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Upload CSV File</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 font-medium mb-2">
            Upload CSV file with image URLs
          </p>
          <p className="text-sm text-gray-500 mb-4">
            System will automatically detect plant species, health, and diseases
          </p>
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileUpload}
            disabled={processing}
            className="hidden"
            id="bulk-file-upload"
          />
          <label
            htmlFor="bulk-file-upload"
            className={`inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer ${
              processing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {processing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing {progress.current}/{progress.total}...</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span>Select CSV File</span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Progress */}
      {processing && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Processing Images...</span>
            <span className="text-sm text-gray-600">{progress.current} / {progress.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${(progress.current / progress.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Detection Results</h3>
            <button
              onClick={downloadResults}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="h-4 w-4" />
              <span>Download Results</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img
                    src={result.imageUrl}
                    alt="Plant"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>

                {result.error ? (
                  <div className="flex items-start space-x-2 text-red-600">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Detection Failed</p>
                      <p className="text-xs">{result.error}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="font-bold text-gray-900">{result.plantName}</p>
                    </div>
                    
                    {result.species && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Species:</span> {result.species}
                      </p>
                    )}
                    
                    {result.health && (
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.health === 'Healthy' ? 'bg-green-100 text-green-800' :
                          result.health === 'Needs Care' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.health}
                        </span>
                        {result.confidence && (
                          <span className="text-xs text-gray-600">
                            {result.confidence}% confidence
                          </span>
                        )}
                      </div>
                    )}
                    
                    {result.disease && (
                      <p className="text-sm text-red-600">
                        <span className="font-semibold">Disease:</span> {result.disease}
                      </p>
                    )}
                    
                    {result.treatment && (
                      <p className="text-xs text-gray-600">
                        <span className="font-semibold">Treatment:</span> {result.treatment}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h4 className="font-bold text-gray-900 mb-3">Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {results.filter(r => !r.error).length}
                </p>
                <p className="text-sm text-gray-600">Successful</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {results.filter(r => r.error).length}
                </p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">
                  {results.filter(r => r.disease).length}
                </p>
                <p className="text-sm text-gray-600">Diseases Found</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {results.length}
                </p>
                <p className="text-sm text-gray-600">Total Processed</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Format Guide */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">CSV Format Guide</h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Required column:</p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• <span className="font-semibold">imageUrl</span> - Direct URL to plant/leaf image</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3">Optional columns:</p>
          <ul className="text-sm text-gray-700 space-y-1 ml-4">
            <li>• <span className="font-semibold">treeId</span> - Tree identifier (for auto-save)</li>
            <li>• <span className="font-semibold">location</span> - Location description</li>
            <li>• <span className="font-semibold">plantedDate</span> - Date planted (YYYY-MM-DD)</li>
          </ul>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-2">Example CSV:</p>
            <code className="text-xs text-gray-600 block">
              imageUrl,treeId,location,plantedDate<br/>
              https://example.com/leaf1.jpg,T-001,Central Park,2024-01-15<br/>
              https://example.com/leaf2.jpg,T-002,Riverside,2024-01-20
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
