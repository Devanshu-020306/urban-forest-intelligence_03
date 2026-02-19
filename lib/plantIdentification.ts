// Plant identification and disease detection using image analysis

export interface PlantDetection {
  plantName: string
  species: string
  health: 'Healthy' | 'Needs Care' | 'Critical'
  confidence: number
  disease?: string
  treatment?: string
  characteristics?: string[]
}

// Detect plant from image URL
export async function detectPlantFromUrl(imageUrl: string): Promise<PlantDetection> {
  try {
    // In production, this would call a real AI API like:
    // - Plant.id API
    // - Google Cloud Vision API
    // - Custom trained model
    
    // For demo, we'll simulate detection based on image analysis
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error('Failed to fetch image')

    // Simulate AI detection (in production, send to AI service)
    return simulatePlantDetection(imageUrl)
  } catch (error) {
    throw new Error('Failed to detect plant from image')
  }
}

// Detect plant from uploaded file
export async function identifyPlant(file: File): Promise<PlantDetection> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string
        // In production, send imageData to AI service
        const detection = simulatePlantDetection(imageData)
        resolve(detection)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read image'))
    reader.readAsDataURL(file)
  })
}

// Simulate plant detection (replace with real AI in production)
function simulatePlantDetection(imageSource: string): PlantDetection {
  // Comprehensive plant species database
  const plants = [
    // Trees
    {
      name: 'Oak Tree',
      species: 'Quercus',
      characteristics: ['Lobed leaves', 'Acorns', 'Thick bark'],
      commonDiseases: ['Oak Wilt', 'Powdery Mildew', 'Anthracnose']
    },
    {
      name: 'Maple Tree',
      species: 'Acer',
      characteristics: ['Palmate leaves', 'Winged seeds', 'Smooth bark'],
      commonDiseases: ['Tar Spot', 'Verticillium Wilt', 'Anthracnose']
    },
    {
      name: 'Pine Tree',
      species: 'Pinus',
      characteristics: ['Needle leaves', 'Pine cones', 'Evergreen'],
      commonDiseases: ['Pine Wilt', 'Needle Cast', 'Rust']
    },
    {
      name: 'Birch Tree',
      species: 'Betula',
      characteristics: ['White bark', 'Serrated leaves', 'Catkins'],
      commonDiseases: ['Bronze Birch Borer', 'Leaf Spot', 'Canker']
    },
    {
      name: 'Willow Tree',
      species: 'Salix',
      characteristics: ['Long narrow leaves', 'Drooping branches', 'Near water'],
      commonDiseases: ['Willow Scab', 'Crown Gall', 'Rust']
    },
    {
      name: 'Cherry Blossom',
      species: 'Prunus serrulata',
      characteristics: ['Pink flowers', 'Serrated leaves', 'Smooth bark'],
      commonDiseases: ['Cherry Leaf Spot', 'Brown Rot', 'Powdery Mildew']
    },
    {
      name: 'Magnolia',
      species: 'Magnolia',
      characteristics: ['Large flowers', 'Glossy leaves', 'Cone-like fruit'],
      commonDiseases: ['Leaf Spot', 'Canker', 'Scale Insects']
    },
    {
      name: 'Neem Tree',
      species: 'Azadirachta indica',
      characteristics: ['Compound leaves', 'White flowers', 'Medicinal properties'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Scale Insects']
    },
    {
      name: 'Banyan Tree',
      species: 'Ficus benghalensis',
      characteristics: ['Aerial roots', 'Large canopy', 'Sacred tree'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Scale']
    },
    {
      name: 'Peepal Tree',
      species: 'Ficus religiosa',
      characteristics: ['Heart-shaped leaves', 'Sacred tree', 'Long petiole'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Fungal infections']
    },
    {
      name: 'Mango Tree',
      species: 'Mangifera indica',
      characteristics: ['Evergreen', 'Fruit bearing', 'Fragrant flowers'],
      commonDiseases: ['Anthracnose', 'Powdery Mildew', 'Mango Malformation']
    },
    {
      name: 'Coconut Palm',
      species: 'Cocos nucifera',
      characteristics: ['Tall trunk', 'Feather leaves', 'Coconuts'],
      commonDiseases: ['Bud Rot', 'Leaf Blight', 'Root Wilt']
    },
    {
      name: 'Bamboo',
      species: 'Bambusoideae',
      characteristics: ['Hollow stems', 'Fast growing', 'Grass family'],
      commonDiseases: ['Rust', 'Leaf Spot', 'Stem Rot']
    },
    {
      name: 'Eucalyptus',
      species: 'Eucalyptus',
      characteristics: ['Aromatic leaves', 'Peeling bark', 'Fast growing'],
      commonDiseases: ['Leaf Spot', 'Canker', 'Root Rot']
    },
    {
      name: 'Teak Tree',
      species: 'Tectona grandis',
      characteristics: ['Large leaves', 'Valuable timber', 'Deciduous'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Stem Borer']
    },
    {
      name: 'Ashoka Tree',
      species: 'Saraca asoca',
      characteristics: ['Orange-red flowers', 'Evergreen', 'Sacred tree'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Scale']
    },
    {
      name: 'Gulmohar',
      species: 'Delonix regia',
      characteristics: ['Red-orange flowers', 'Fern-like leaves', 'Spreading canopy'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Scale']
    },
    {
      name: 'Jamun Tree',
      species: 'Syzygium cumini',
      characteristics: ['Purple fruit', 'Evergreen', 'Medicinal'],
      commonDiseases: ['Anthracnose', 'Leaf Spot', 'Fruit Rot']
    },
    {
      name: 'Guava Tree',
      species: 'Psidium guajava',
      characteristics: ['White flowers', 'Fruit bearing', 'Aromatic'],
      commonDiseases: ['Anthracnose', 'Wilt', 'Fruit Fly']
    },
    {
      name: 'Papaya Tree',
      species: 'Carica papaya',
      characteristics: ['Hollow trunk', 'Large leaves', 'Fast growing'],
      commonDiseases: ['Papaya Ring Spot', 'Anthracnose', 'Powdery Mildew']
    },
    {
      name: 'Banana Plant',
      species: 'Musa',
      characteristics: ['Large leaves', 'Herbaceous', 'Fruit bearing'],
      commonDiseases: ['Panama Disease', 'Sigatoka', 'Bunchy Top']
    },
    {
      name: 'Tulsi (Holy Basil)',
      species: 'Ocimum sanctum',
      characteristics: ['Aromatic', 'Medicinal', 'Sacred plant'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Downy Mildew']
    },
    {
      name: 'Curry Leaf Plant',
      species: 'Murraya koenigii',
      characteristics: ['Aromatic leaves', 'Small white flowers', 'Culinary use'],
      commonDiseases: ['Leaf Spot', 'Scale', 'Aphids']
    },
    {
      name: 'Aloe Vera',
      species: 'Aloe barbadensis',
      characteristics: ['Succulent', 'Medicinal', 'Thick leaves'],
      commonDiseases: ['Root Rot', 'Leaf Spot', 'Scale']
    },
    {
      name: 'Rose Plant',
      species: 'Rosa',
      characteristics: ['Thorny stems', 'Fragrant flowers', 'Ornamental'],
      commonDiseases: ['Black Spot', 'Powdery Mildew', 'Rust']
    },
    {
      name: 'Hibiscus',
      species: 'Hibiscus rosa-sinensis',
      characteristics: ['Large flowers', 'Ornamental', 'Medicinal'],
      commonDiseases: ['Leaf Spot', 'Aphids', 'Whitefly']
    },
    {
      name: 'Jasmine',
      species: 'Jasminum',
      characteristics: ['Fragrant flowers', 'Climbing vine', 'White flowers'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Scale']
    },
    {
      name: 'Bougainvillea',
      species: 'Bougainvillea',
      characteristics: ['Colorful bracts', 'Thorny', 'Drought tolerant'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Aphids']
    },
    {
      name: 'Money Plant',
      species: 'Epipremnum aureum',
      characteristics: ['Heart-shaped leaves', 'Indoor plant', 'Air purifying'],
      commonDiseases: ['Root Rot', 'Leaf Spot', 'Mealybugs']
    },
    {
      name: 'Snake Plant',
      species: 'Sansevieria trifasciata',
      characteristics: ['Sword-like leaves', 'Air purifying', 'Low maintenance'],
      commonDiseases: ['Root Rot', 'Leaf Spot', 'Scale']
    },
    {
      name: 'Spider Plant',
      species: 'Chlorophytum comosum',
      characteristics: ['Striped leaves', 'Air purifying', 'Easy to grow'],
      commonDiseases: ['Root Rot', 'Leaf Tip Burn', 'Scale']
    },
    {
      name: 'Peace Lily',
      species: 'Spathiphyllum',
      characteristics: ['White flowers', 'Air purifying', 'Shade tolerant'],
      commonDiseases: ['Root Rot', 'Leaf Spot', 'Mealybugs']
    },
    {
      name: 'Rubber Plant',
      species: 'Ficus elastica',
      characteristics: ['Large glossy leaves', 'Indoor plant', 'Air purifying'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Scale']
    },
    {
      name: 'Areca Palm',
      species: 'Dypsis lutescens',
      characteristics: ['Feathery fronds', 'Air purifying', 'Indoor plant'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Scale']
    },
    {
      name: 'Cactus',
      species: 'Cactaceae',
      characteristics: ['Succulent', 'Spines', 'Drought tolerant'],
      commonDiseases: ['Root Rot', 'Scale', 'Mealybugs']
    },
    {
      name: 'Fern',
      species: 'Pteridophyta',
      characteristics: ['Feathery fronds', 'Shade loving', 'Moisture loving'],
      commonDiseases: ['Leaf Spot', 'Root Rot', 'Scale']
    },
    {
      name: 'Croton',
      species: 'Codiaeum variegatum',
      characteristics: ['Colorful leaves', 'Ornamental', 'Tropical'],
      commonDiseases: ['Leaf Spot', 'Mealybugs', 'Scale']
    },
    {
      name: 'Marigold',
      species: 'Tagetes',
      characteristics: ['Orange-yellow flowers', 'Pest repellent', 'Annual'],
      commonDiseases: ['Powdery Mildew', 'Leaf Spot', 'Aphids']
    },
    {
      name: 'Sunflower',
      species: 'Helianthus annuus',
      characteristics: ['Large yellow flowers', 'Tall stems', 'Edible seeds'],
      commonDiseases: ['Rust', 'Downy Mildew', 'Leaf Spot']
    },
    {
      name: 'Tomato Plant',
      species: 'Solanum lycopersicum',
      characteristics: ['Fruit bearing', 'Vine', 'Edible'],
      commonDiseases: ['Blight', 'Leaf Curl', 'Fruit Rot']
    },
    {
      name: 'Chili Plant',
      species: 'Capsicum annuum',
      characteristics: ['Spicy fruit', 'Compact', 'Edible'],
      commonDiseases: ['Leaf Curl', 'Anthracnose', 'Bacterial Wilt']
    },
  ]

  // Randomly select a plant (in production, AI would analyze the image)
  const randomPlant = plants[Math.floor(Math.random() * plants.length)]
  
  // Simulate health detection
  const healthStates: Array<'Healthy' | 'Needs Care' | 'Critical'> = ['Healthy', 'Healthy', 'Healthy', 'Needs Care', 'Critical']
  const health = healthStates[Math.floor(Math.random() * healthStates.length)]
  
  // Simulate disease detection
  let disease: string | undefined
  let treatment: string | undefined
  
  if (health !== 'Healthy') {
    disease = randomPlant.commonDiseases[Math.floor(Math.random() * randomPlant.commonDiseases.length)]
    treatment = getTreatment(disease)
  }

  return {
    plantName: randomPlant.name,
    species: randomPlant.species,
    health,
    confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
    disease,
    treatment,
    characteristics: randomPlant.characteristics,
  }
}

// Get treatment recommendations for diseases
function getTreatment(disease: string): string {
  const treatments: Record<string, string> = {
    // Tree diseases
    'Oak Wilt': 'Remove infected trees, prevent root grafts, apply fungicide',
    'Powdery Mildew': 'Apply sulfur or neem oil spray, improve air circulation',
    'Anthracnose': 'Prune infected branches, apply copper fungicide',
    'Tar Spot': 'Rake and destroy fallen leaves, apply fungicide in spring',
    'Verticillium Wilt': 'Remove infected branches, improve soil drainage',
    'Pine Wilt': 'Remove and destroy infected trees immediately',
    'Needle Cast': 'Apply fungicide, improve air circulation',
    'Rust': 'Remove infected leaves, apply fungicide',
    'Bronze Birch Borer': 'Keep tree healthy, apply insecticide to trunk',
    'Leaf Spot': 'Remove infected leaves, apply fungicide',
    'Canker': 'Prune infected branches, apply wound dressing',
    'Willow Scab': 'Prune infected branches, apply fungicide',
    'Crown Gall': 'Remove infected tissue, avoid wounding',
    'Cherry Leaf Spot': 'Remove fallen leaves, apply fungicide',
    'Brown Rot': 'Remove infected fruit, apply fungicide',
    'Scale Insects': 'Apply horticultural oil, introduce beneficial insects',
    'Scale': 'Apply neem oil or horticultural oil spray',
    
    // Fruit tree diseases
    'Mango Malformation': 'Prune affected parts, apply fungicide',
    'Fruit Rot': 'Remove infected fruits, improve air circulation',
    'Fruit Fly': 'Use fruit fly traps, apply organic pesticides',
    'Wilt': 'Improve drainage, apply fungicide to soil',
    
    // Palm diseases
    'Bud Rot': 'Remove infected tissue, apply copper fungicide',
    'Leaf Blight': 'Remove infected leaves, apply fungicide',
    'Root Wilt': 'Improve drainage, no cure - prevent spread',
    
    // Bamboo diseases
    'Stem Rot': 'Remove infected stems, improve drainage',
    
    // Tropical plant diseases
    'Papaya Ring Spot': 'Remove infected plants, control aphids',
    'Panama Disease': 'Remove infected plants, use resistant varieties',
    'Sigatoka': 'Remove infected leaves, apply fungicide',
    'Bunchy Top': 'Remove infected plants, control aphids',
    
    // Indoor plant diseases
    'Root Rot': 'Reduce watering, improve drainage, repot if needed',
    'Mealybugs': 'Remove with cotton swab dipped in alcohol',
    'Aphids': 'Spray with soapy water or neem oil',
    'Whitefly': 'Use yellow sticky traps, spray neem oil',
    'Leaf Tip Burn': 'Use filtered water, reduce fertilizer',
    
    // Flower diseases
    'Black Spot': 'Remove infected leaves, apply fungicide',
    'Downy Mildew': 'Improve air circulation, apply fungicide',
    
    // Vegetable diseases
    'Blight': 'Remove infected parts, apply copper fungicide',
    'Leaf Curl': 'Remove infected leaves, control whiteflies',
    'Bacterial Wilt': 'Remove infected plants, improve drainage',
    
    // General pests
    'Stem Borer': 'Remove and destroy infected stems, apply pesticide',
  }

  return treatments[disease] || 'Consult with a certified arborist for proper treatment'
}

// Analyze plant health from image
export async function analyzePlantHealth(imageFile: File): Promise<{
  health: string
  disease: string | null
  confidence: number
  recommendations: string[]
}> {
  const detection = await identifyPlant(imageFile)
  
  return {
    health: detection.health,
    disease: detection.disease || null,
    confidence: detection.confidence,
    recommendations: detection.treatment ? [detection.treatment] : ['Regular watering and monitoring'],
  }
}
