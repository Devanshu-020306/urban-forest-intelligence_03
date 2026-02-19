// AI-powered disease detection
// This simulates ML model analysis - in production, integrate with TensorFlow.js or cloud ML API

interface DetectionResult {
  disease: string
  confidence: number
  severity: 'Low' | 'Medium' | 'High'
  symptoms: string[]
  treatment: string[]
  preventiveMeasures: string[]
}

// Common plant diseases database
const diseaseDatabase = {
  'Leaf Spot': {
    symptoms: [
      'Circular or irregular brown spots on leaves',
      'Yellow halo around spots',
      'Spots may merge and cause leaf drop',
      'Affects older leaves first'
    ],
    treatment: [
      'Remove and destroy infected leaves',
      'Apply copper-based fungicide',
      'Improve air circulation around plant',
      'Water at base, avoid wetting foliage',
      'Apply fungicide every 7-10 days'
    ],
    preventiveMeasures: [
      'Space plants properly for air circulation',
      'Water in morning to allow leaves to dry',
      'Remove fallen leaves promptly',
      'Use disease-resistant varieties',
      'Avoid overhead watering'
    ],
    severity: 'Medium' as const
  },
  'Powdery Mildew': {
    symptoms: [
      'White powdery coating on leaves',
      'Distorted or stunted new growth',
      'Yellowing and dropping of leaves',
      'Affects both sides of leaves'
    ],
    treatment: [
      'Spray with neem oil or sulfur-based fungicide',
      'Remove severely infected parts',
      'Increase air circulation',
      'Apply baking soda solution (1 tbsp per gallon)',
      'Treat weekly until symptoms disappear'
    ],
    preventiveMeasures: [
      'Plant in full sun locations',
      'Ensure good air circulation',
      'Avoid excess nitrogen fertilizer',
      'Water at soil level',
      'Choose resistant varieties'
    ],
    severity: 'Medium' as const
  },
  'Root Rot': {
    symptoms: [
      'Wilting despite adequate water',
      'Yellowing leaves starting from bottom',
      'Soft, mushy, dark roots',
      'Foul odor from soil',
      'Stunted growth'
    ],
    treatment: [
      'Remove plant from soil immediately',
      'Cut away all affected roots',
      'Repot in fresh, well-draining soil',
      'Reduce watering frequency',
      'Apply fungicide to remaining healthy roots'
    ],
    preventiveMeasures: [
      'Use well-draining soil mix',
      'Ensure pots have drainage holes',
      'Water only when top soil is dry',
      'Avoid overwatering',
      'Sterilize pots before reuse'
    ],
    severity: 'High' as const
  },
  'Bacterial Blight': {
    symptoms: [
      'Water-soaked spots on leaves',
      'Brown or black lesions',
      'Yellowing around affected areas',
      'Rapid spread in wet conditions',
      'Wilting of shoots'
    ],
    treatment: [
      'Remove and destroy infected plant parts',
      'Apply copper-based bactericide',
      'Disinfect pruning tools between cuts',
      'Reduce humidity around plants',
      'Avoid working with wet plants'
    ],
    preventiveMeasures: [
      'Use disease-free planting material',
      'Avoid overhead irrigation',
      'Maintain proper plant spacing',
      'Remove plant debris regularly',
      'Disinfect tools after each use'
    ],
    severity: 'High' as const
  },
  'Nutrient Deficiency': {
    symptoms: [
      'Yellowing of leaves (chlorosis)',
      'Stunted growth',
      'Purple or red discoloration',
      'Leaf curling or distortion',
      'Poor flowering or fruiting'
    ],
    treatment: [
      'Apply balanced fertilizer (10-10-10)',
      'Add compost to improve soil',
      'Test soil pH and adjust if needed',
      'Apply specific nutrient supplements',
      'Foliar feed for quick results'
    ],
    preventiveMeasures: [
      'Regular soil testing',
      'Use quality potting mix',
      'Follow fertilization schedule',
      'Maintain proper soil pH',
      'Add organic matter annually'
    ],
    severity: 'Low' as const
  },
  'Healthy': {
    symptoms: [],
    treatment: [
      'Continue current care routine',
      'Monitor regularly for any changes',
      'Maintain consistent watering schedule'
    ],
    preventiveMeasures: [
      'Keep up regular watering schedule',
      'Fertilize according to plant needs',
      'Prune dead or damaged parts',
      'Monitor for pests regularly',
      'Ensure adequate sunlight'
    ],
    severity: 'Low' as const
  }
}

// Simulate image analysis
export async function analyzePlantHealth(imageFile: File): Promise<DetectionResult> {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000))

  // In production, this would:
  // 1. Send image to ML model (TensorFlow.js, Plant.id API, or custom model)
  // 2. Get predictions with confidence scores
  // 3. Return structured results

  // For demo, randomly select a disease or healthy status
  const diseases = Object.keys(diseaseDatabase)
  const randomDisease = diseases[Math.floor(Math.random() * diseases.length)]
  const diseaseInfo = diseaseDatabase[randomDisease as keyof typeof diseaseDatabase]
  
  // Simulate confidence score (in production, this comes from ML model)
  const confidence = randomDisease === 'Healthy' 
    ? Math.floor(Math.random() * 10) + 90  // 90-100% for healthy
    : Math.floor(Math.random() * 20) + 75  // 75-95% for diseases

  return {
    disease: randomDisease,
    confidence,
    severity: diseaseInfo.severity,
    symptoms: diseaseInfo.symptoms,
    treatment: diseaseInfo.treatment,
    preventiveMeasures: diseaseInfo.preventiveMeasures
  }
}

// For production integration with Plant.id API:
/*
export async function analyzePlantHealthWithAPI(imageFile: File): Promise<DetectionResult> {
  const formData = new FormData()
  formData.append('images', imageFile)
  
  const response = await fetch('https://api.plant.id/v2/health_assessment', {
    method: 'POST',
    headers: {
      'Api-Key': process.env.NEXT_PUBLIC_PLANT_ID_API_KEY!,
    },
    body: formData
  })
  
  const data = await response.json()
  
  // Transform API response to our format
  return {
    disease: data.health_assessment.diseases[0]?.name || 'Unknown',
    confidence: Math.round(data.health_assessment.diseases[0]?.probability * 100),
    severity: determineSeverity(data.health_assessment.diseases[0]?.probability),
    symptoms: data.health_assessment.diseases[0]?.disease_details?.symptoms || [],
    treatment: data.health_assessment.diseases[0]?.disease_details?.treatment || [],
    preventiveMeasures: data.health_assessment.diseases[0]?.disease_details?.prevention || []
  }
}
*/
