'use client'

import { useState } from 'react'
import { Camera, Upload, Loader2, CheckCircle, X, Sparkles } from 'lucide-react'
import { identifyPlantFromImage, PlantIdentification, calculateInitialHealth } from '@/lib/plantIdentification'

interface PlantIdentifierProps {
  onIdentified: (data: {
    species: string
    characteristics: PlantIdentification['characteristics']
    careInstructions: PlantIdentification['careInstructions']
    environmentalImpact: PlantIdentification['environmentalImpact']
    health: 'Healthy' | 'Needs Care' | 'Critical'
    survivalProb: number
  }) => void
  onClose: () => void
}

export default function PlantIdentifier({ onIdentified, onClose }: PlantIdentifierProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [identifying, setIdentifying] = useState(false)
  const [result, setResult] = useState<PlantIdentification | null>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIdentify = async () => {
    if (!imageFile) return

    setIdentifying(true)
    try {
      const identification = await identifyPlantFromImage(imageFile)
      if (identification) {
        setResult(identification)
      }
    } catch (error) {
      console.error('Error identifying plant:', error)
    } finally {
      setIdentifying(false)
    }
  }

  const handleUseResult = () => {
    if (result) {
      const { health, survivalProb } = calculateInitialHealth(result.characteristics)
      onIdentified({
        species: result.species,
        characteristics: result.characteristics,
        careInstructions: result.careInstructions,
        environmentalImpact: result.environmentalImpact,
        health,
        survivalProb
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">AI Plant Identifier</h2>
                <p className="text-green-100">Upload a photo to automatically identify the plant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Section */}
          {!imagePreview && (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-green-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="plant-image-upload"
              />
              <label htmlFor="plant-image-upload" className="cursor-pointer">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">Upload Plant Photo</p>
                <p className="text-gray-600 mb-4">Click to select or drag and drop</p>
                <div className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                  <Upload className="h-5 w-5" />
                  <span>Choose Photo</span>
                </div>
              </label>
            </div>
          )}

          {/* Image Preview & Identify */}
          {imagePreview && !result && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Plant preview"
                  className="w-full h-96 object-cover rounded-xl"
                />
                <button
                  onClick={() => {
                    setImagePreview('')
                    setImageFile(null)
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <button
                onClick={handleIdentify}
                disabled={identifying}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {identifying ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Identifying Plant...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6" />
                    <span>Identify Plant with AI</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{result.species}</h3>
                    <p className="text-gray-600">{result.scientificName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-600">
                    {(result.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Characteristics */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Plant Characteristics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900">{result.characteristics.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                    <p className="font-semibold text-gray-900">{result.characteristics.growthRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Water Needs</p>
                    <p className="font-semibold text-gray-900">{result.characteristics.waterNeeds}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sunlight</p>
                    <p className="font-semibold text-gray-900">{result.characteristics.sunlight}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Soil Type</p>
                    <p className="font-semibold text-gray-900">{result.characteristics.soilType}</p>
                  </div>
                </div>
              </div>

              {/* Care Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Care Instructions</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Watering</p>
                    <p className="text-sm text-gray-700">{result.careInstructions.watering}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Fertilizing</p>
                    <p className="text-sm text-gray-700">{result.careInstructions.fertilizing}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Pruning</p>
                    <p className="text-sm text-gray-700">{result.careInstructions.pruning}</p>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Environmental Impact</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-600">
                      {result.environmentalImpact.co2Absorption} kg
                    </p>
                    <p className="text-sm text-gray-600">CO₂ Absorbed/Year</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {result.environmentalImpact.oxygenProduction} kg
                    </p>
                    <p className="text-sm text-gray-600">O₂ Produced/Year</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setResult(null)
                    setImagePreview('')
                    setImageFile(null)
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold"
                >
                  Try Another Photo
                </button>
                <button
                  onClick={handleUseResult}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg"
                >
                  Use This Identification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
