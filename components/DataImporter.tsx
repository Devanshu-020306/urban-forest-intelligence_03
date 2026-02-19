'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Download } from 'lucide-react'
import { importTrees, importCareLogs, parseCSV, parseJSON, mapToTreeSchema, mapToCareLogSchema } from '@/lib/dataImport'

export default function DataImporter() {
  const [importing, setImporting] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [dataType, setDataType] = useState<'trees' | 'careLogs'>('trees')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    setResults(null)

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

      // Import data
      let importResults
      if (dataType === 'trees') {
        const mappedData = mapToTreeSchema(data)
        importResults = await importTrees(mappedData)
      } else {
        const mappedData = mapToCareLogSchema(data)
        importResults = await importCareLogs(mappedData)
      }

      setResults(importResults)
    } catch (error: any) {
      setResults({
        success: 0,
        failed: 0,
        errors: [error.message],
      })
    } finally {
      setImporting(false)
    }
  }

  const downloadTemplate = (type: 'trees' | 'careLogs') => {
    let csvContent = ''
    
    if (type === 'trees') {
      csvContent = 'treeId,species,plantedDate,location,latitude,longitude,caretaker,health,lastWatered,survivalProb\n'
      csvContent += 'T-1001,Oak,2024-01-15,Central Park,40.7829,-73.9654,John Doe,Healthy,2024-02-18,96\n'
      csvContent += 'T-1002,Maple,2024-01-20,Riverside Park,40.7957,-73.9389,Jane Smith,Needs Care,2024-02-15,82\n'
    } else {
      csvContent = 'treeId,species,activity,caretaker,date,time,notes,status\n'
      csvContent += 'T-1001,Oak,Watering,John Doe,2024-02-18,08:30,Regular watering,completed\n'
      csvContent += 'T-1002,Maple,Fertilizer,Jane Smith,2024-02-17,10:15,Applied organic fertilizer,completed\n'
    }

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}_template.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Import Data</h2>
        <p className="text-gray-600 mt-1">Upload CSV or JSON files to bulk import data</p>
      </div>

      {/* Data Type Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Select Data Type</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setDataType('trees')}
            className={`p-4 rounded-lg border-2 transition-all ${
              dataType === 'trees'
                ? 'border-green-600 bg-green-50'
                : 'border-gray-300 hover:border-green-300'
            }`}
          >
            <FileText className={`h-8 w-8 mx-auto mb-2 ${
              dataType === 'trees' ? 'text-green-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-gray-900">Trees</p>
            <p className="text-xs text-gray-600 mt-1">Import tree registry data</p>
          </button>
          <button
            onClick={() => setDataType('careLogs')}
            className={`p-4 rounded-lg border-2 transition-all ${
              dataType === 'careLogs'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
            }`}
          >
            <FileText className={`h-8 w-8 mx-auto mb-2 ${
              dataType === 'careLogs' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-gray-900">Care Logs</p>
            <p className="text-xs text-gray-600 mt-1">Import activity logs</p>
          </button>
        </div>
      </div>

      {/* Download Template */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <Download className="h-6 w-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">Download Template</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download a CSV template with the correct format and sample data
            </p>
            <button
              onClick={() => downloadTemplate(dataType)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download {dataType === 'trees' ? 'Trees' : 'Care Logs'} Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Upload File</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 font-medium mb-2">
            Drop your CSV or JSON file here, or click to browse
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supported formats: .csv, .json
          </p>
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileUpload}
            disabled={importing}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer ${
              importing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {importing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Importing...</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span>Select File</span>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className={`rounded-xl shadow-lg p-6 ${
          results.failed === 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
        }`}>
          <div className="flex items-start space-x-4">
            {results.failed === 0 ? (
              <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
            ) : (
              <AlertCircle className="h-6 w-6 text-amber-600 mt-1" />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Import Results</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-semibold text-green-600">Success:</span> {results.success} records imported
                </p>
                {results.failed > 0 && (
                  <p className="text-sm">
                    <span className="font-semibold text-red-600">Failed:</span> {results.failed} records
                  </p>
                )}
                {results.errors.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Errors:</p>
                    <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto">
                      {results.errors.map((error: string, index: number) => (
                        <p key={index} className="text-xs text-red-600 mb-1">• {error}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Format Guide */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Format Guide</h3>
        
        {dataType === 'trees' ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Required fields for trees:</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• <span className="font-semibold">treeId</span> - Unique identifier (e.g., T-1001)</li>
              <li>• <span className="font-semibold">species</span> - Tree species name</li>
              <li>• <span className="font-semibold">plantedDate</span> - Date planted (YYYY-MM-DD)</li>
              <li>• <span className="font-semibold">location</span> - Location description or coordinates</li>
              <li>• <span className="font-semibold">caretaker</span> - Person responsible</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">Optional fields:</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• latitude, longitude, health, lastWatered, survivalProb, imageUrl</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Required fields for care logs:</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• <span className="font-semibold">treeId</span> - Tree identifier</li>
              <li>• <span className="font-semibold">activity</span> - Activity type (Watering, Fertilizer, etc.)</li>
              <li>• <span className="font-semibold">caretaker</span> - Person who performed activity</li>
              <li>• <span className="font-semibold">date</span> - Activity date (YYYY-MM-DD)</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">Optional fields:</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• species, time, notes, status</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
