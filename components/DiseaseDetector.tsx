'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, Loader2, CheckCircle, AlertTriangle, XCircle, Leaf, Activity, Droplets } from 'lucide-react'
import { identifyPlant } from '@/lib/plantIdentification'

export default function DiseaseDetector() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [detecting, setDetecting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (file: File) => {
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Detect plant
    setDetecting(true)
    setResult(null)

    try {
      const detection = await identifyPlant(file)
      setResult(detection)
    } catch (error) {
      setResult({ error: 'Failed to detect plant. Please try again.' })
    } finally {
      setDetecting(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  const resetDetection = () => {
    setSelectedImage(null)
    setResult(null)
    setDetecting(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg mb-4">
          <Camera className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Plant Health Detector</h2>
        <p className="text-gray-600 mt-2">Take a photo or upload an image to detect plant species and health</p>
      </div>

      {/* Upload Options */}
      {!selectedImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camera Capture */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer"
               onClick={() => cameraInputRef.current?.click()}>
            <div className="text-center">
              <div className="bg-green-600 p-6 rounded-full inline-block mb-4">
                <Camera className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Take Photo</h3>
              <p className="text-gray-600 mb-4">Use your device camera to capture plant image</p>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Open Camera
              </button>
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCameraCapture}
              className="hidden"
            />
          </div>

          {/* File Upload */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer"
               onClick={() => fileInputRef.current?.click()}>
            <div className="text-center">
              <div className="bg-blue-600 p-6 rounded-full inline-block mb-4">
                <Upload className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Image</h3>
              <p className="text-gray-600 mb-4">Choose an image from your device gallery</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Choose File
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>
      )}

      {/* Image Preview & Detection */}
      {selectedImage && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Captured Image</h3>
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Plant"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={resetDetection}
                className="w-full mt-4 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Take Another Photo
              </button>
            </div>

            {/* Detection Results */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Detection Results</h3>
              
              {detecting && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-16 w-16 text-green-600 animate-spin mb-4" />
                  <p className="text-gray-600 font-medium">Analyzing plant...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              )}

              {result && !detecting && (
                <div className="space-y-4">
                  {result.error ? (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
                      <XCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                      <p className="text-red-800 font-semibold">{result.error}</p>
                    </div>
                  ) : (
                    <>
                      {/* Plant Name */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <Leaf className="h-8 w-8 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-600 font-medium">Detected Plant</p>
                            <h4 className="text-2xl font-bold text-gray-900">{result.plantName}</h4>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          <span className="font-semibold">Species:</span> {result.species}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-semibold">Confidence:</span> {result.confidence}%
                        </p>
                      </div>

                      {/* Health Status */}
                      <div className={`border-2 rounded-lg p-6 ${
                        result.health === 'Healthy' 
                          ? 'bg-green-50 border-green-200' 
                          : result.health === 'Needs Care'
                          ? 'bg-amber-50 border-amber-200'
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center space-x-3 mb-3">
                          {result.health === 'Healthy' ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          ) : result.health === 'Needs Care' ? (
                            <AlertTriangle className="h-8 w-8 text-amber-600" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                          )}
                          <div>
                            <p className="text-sm text-gray-600 font-medium">Health Status</p>
                            <h4 className={`text-2xl font-bold ${
                              result.health === 'Healthy' 
                                ? 'text-green-800' 
                                : result.health === 'Needs Care'
                                ? 'text-amber-800'
                                : 'text-red-800'
                            }`}>
                              {result.health}
                            </h4>
                          </div>
                        </div>
                        
                        {result.health === 'Healthy' && (
                          <p className="text-green-700">
                            ✓ Plant appears to be in good health. Continue regular care and monitoring.
                          </p>
                        )}
                      </div>

                      {/* Disease Detection */}
                      {result.disease && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                            <div>
                              <p className="text-sm text-gray-600 font-medium">Disease Detected</p>
                              <h4 className="text-xl font-bold text-red-800">{result.disease}</h4>
                            </div>
                          </div>
                          
                          {result.treatment && (
                            <div className="mt-4 bg-white rounded-lg p-4">
                              <p className="text-sm font-semibold text-gray-900 mb-2">
                                💊 Recommended Treatment:
                              </p>
                              <p className="text-gray-700">{result.treatment}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Characteristics */}
                      {result.characteristics && result.characteristics.length > 0 && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                          <h4 className="font-bold text-gray-900 mb-3">Plant Characteristics</h4>
                          <ul className="space-y-2">
                            {result.characteristics.map((char: string, index: number) => (
                              <li key={index} className="flex items-center space-x-2 text-gray-700">
                                <span className="text-blue-600">•</span>
                                <span>{char}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Care Recommendations */}
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <Droplets className="h-6 w-6 text-purple-600" />
                          <h4 className="font-bold text-gray-900">Care Recommendations</h4>
                        </div>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Water regularly based on soil moisture</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Ensure adequate sunlight exposure</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Monitor for pests and diseases regularly</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Apply organic fertilizer monthly</span>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedImage && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-3">
                <Camera className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Capture Image</h4>
              <p className="text-sm text-gray-600">Take a clear photo of the plant leaf or flower</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-3">
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. AI Analysis</h4>
              <p className="text-sm text-gray-600">System automatically detects species and health</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full inline-block mb-3">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Get Results</h4>
              <p className="text-sm text-gray-600">View diagnosis and treatment recommendations</p>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      {!selectedImage && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📸 Tips for Best Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-1">✓</span>
                <span>Use good lighting (natural daylight is best)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-1">✓</span>
                <span>Focus on leaves or distinctive features</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-1">✓</span>
                <span>Keep the camera steady for clear images</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-1">✓</span>
                <span>Capture close-up shots for better detection</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-1">✓</span>
                <span>Avoid blurry or dark images</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-600 mt-1">✓</span>
                <span>Include multiple leaves if possible</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
