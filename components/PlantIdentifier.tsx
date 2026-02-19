"use client"

import { useState } from "react"
import { Camera, Upload, Loader2, CheckCircle } from "lucide-react"
import { identifyPlant, analyzePlantHealth } from "@/lib/plantIdentification"

interface PlantIdentifierProps {
  onIdentified: (data: {
    plantName: string
    species: string
    health: string
    confidence: number
    disease?: string
    treatment?: string
  }) => void
}

export default function PlantIdentifier({ onIdentified }: PlantIdentifierProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    setLoading(true)
    setError(null)

    try {
      // Identify plant
      const detection = await identifyPlant(file)

      // Analyze health
      const healthData = await analyzePlantHealth(file)

      onIdentified({
        plantName: detection.plantName,
        species: detection.species,
        health: healthData.health,
        confidence: detection.confidence,
        disease: detection.disease,
        treatment: detection.treatment,
      })
    } catch (err) {
      setError("Failed to identify plant")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Plant Identifier</h2>

      <label className="flex items-center gap-2 cursor-pointer bg-green-600 text-white px-4 py-2 rounded">
        <Upload size={18} />
        Upload Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0])
            }
          }}
        />
      </label>

      {loading && (
        <div className="flex items-center gap-2 mt-4">
          <Loader2 className="animate-spin" />
          <span>Analyzing...</span>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
