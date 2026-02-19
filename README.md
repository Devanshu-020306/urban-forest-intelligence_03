# 🌳 Urban Forest Intelligence System

AI-Powered Tree Lifecycle Management Platform with Mobile App Support

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/urban-forest-intelligence)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/urban-forest-intelligence)

## 🚀 Live Demo

**Web App:** [https://urban-forest-intelligence.vercel.app](https://urban-forest-intelligence.vercel.app)

**Install as Mobile App:**
- Android: Chrome → Install
- iOS: Safari → Add to Home Screen

## 📱 Demo Accounts

- **Admin:** admin@urbanforest.com / admin123
- **Visitor:** visitor@urbanforest.com / visitor123

## ✨ Features

### Admin Features
- 📊 Real-time Dashboard with Statistics
- 🌳 Tree Registry Management (CRUD)
- 📝 Care Activity Logging
- 📈 Analytics & Environmental Impact
- 📸 Plant Health Detection
- 🔄 Offline Support (PWA)

### Visitor Features
- 📸 Camera-based Plant Detection
- 🤖 AI Health Analysis
- 💡 Care Recommendations
- 📱 Mobile Optimized

## 🎯 Tech Stack

### Next.js Version (Production)
- Next.js 14 + TypeScript
- Firebase (Auth, Firestore, Storage)
- Tailwind CSS
- Recharts for visualizations

### Standalone Version (HTML/CSS/JS)
- Pure HTML5 + CSS3 + JavaScript
- LocalStorage for data
- Chart.js for visualizations
- PWA with Service Worker

## 🚀 Quick Start

### Option 1: Standalone Version (Easiest!)

```bash
cd standalone
python -m http.server 8000
# Open: http://localhost:8000
```

### Option 2: Next.js Version

```bash
npm install
npm run dev
# Open: http://localhost:3000
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd standalone
vercel --prod
```

Or use the deploy button above!

### Deploy to Netlify

```bash
# Drag & drop standalone folder to:
https://app.netlify.com/drop
```

### Deploy to GitHub Pages

```bash
# Enable GitHub Pages in repo settings
# Select gh-pages branch
```

## 📱 Mobile App (PWA)

Your app is already a Progressive Web App!

**Features:**
- ✅ Install on home screen
- ✅ Works offline
- ✅ Camera access
- ✅ Push notifications ready
- ✅ Full-screen mode

**Install:**
1. Open app URL on mobile
2. Tap "Install" or "Add to Home Screen"
3. App installs like native app!

## 🎨 Project Structure

```
urban-forest-intelligence/
├── standalone/              # HTML/CSS/JS version
│   ├── index.html          # Main app
│   ├── styles.css          # Styling
│   ├── app.js              # Logic
│   ├── database.js         # LocalStorage DB
│   ├── manifest.json       # PWA config
│   └── service-worker.js   # Offline support
├── app/                    # Next.js app
├── components/             # React components
├── lib/                    # Utilities
└── public/                 # Static assets
```

## 📚 Documentation

- [Setup Guide](SETUP.md)
- [Deployment Guide](GITHUB-VERCEL-SETUP.md)
- [Mobile App Guide](MOBILE-APP-GUIDE.md)
- [Camera Feature](CAMERA-FEATURE-GUIDE.md)
- [Netlify Deploy](NETLIFY-DEPLOY-GUIDE.md)
- [Vercel Deploy](VERCEL-DEPLOY-GUIDE.md)

## 🔧 Configuration

### Firebase Setup (Next.js version)

1. Create Firebase project
2. Copy config to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### Standalone Version

No configuration needed! Just open and run.

## 🌟 Key Features

### 1. Tree Management
- Register trees with geo-location
- Track health status
- Monitor survival probability
- Upload images

### 2. Care Logging
- Log maintenance activities
- Track watering, fertilizer, pruning
- Associate with specific trees
- View activity history

### 3. Plant Detection
- Camera-based detection
- AI health analysis
- Disease identification
- Care recommendations

### 4. Analytics
- Environmental impact metrics
- CO₂ absorption tracking
- O₂ release estimates
- Tree health distribution

### 5. Mobile Support
- PWA installable
- Offline functionality
- Camera access
- Touch-optimized UI

## 🎯 Use Cases

- Urban forestry management
- Tree plantation monitoring
- Public tree tracking
- Environmental impact assessment
- Citizen science projects
- Educational purposes

## 📊 Database

### Next.js Version
- Firebase Firestore (cloud)
- Real-time sync
- Scalable

### Standalone Version
- LocalStorage (browser)
- Instant access
- Works offline

## 🔒 Security

- HTTPS enforced
- XSS protection
- CSRF protection
- Secure headers
- Input validation

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

## 📱 Mobile App Conversion

### PWA (Already Done!)
- Install from browser
- Works offline
- Camera access

### Capacitor (Native App)
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
```

### React Native (Full Rewrite)
See [Mobile App Guide](MOBILE-APP-GUIDE.md)

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 🙏 Acknowledgments

- Firebase for backend services
- Vercel for hosting
- Chart.js for visualizations
- Font Awesome for icons

## 📞 Support

- Documentation: See `/docs` folder
- Issues: GitHub Issues
- Email: support@urbanforest.com

## 🎉 Quick Deploy

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/urban-forest-intelligence.git

# Deploy standalone version
cd urban-forest-intelligence/standalone
vercel --prod

# Or deploy Next.js version
cd urban-forest-intelligence
vercel --prod
```

---

**Made with 🌳 for Urban Forest Management**

**Star ⭐ this repo if you find it useful!**

AI-powered Urban Tree Lifecycle Management Platform that tracks, monitors, and optimizes tree survival rates through intelligent intervention with full Firebase integration.

## 🌟 Features

### For Visitors (Public Access)
- **🔬 AI Disease Detection**: Upload plant photos for instant disease diagnosis
- **📊 Detailed Analysis**: Get confidence scores, severity ratings, and symptoms
- **💊 Treatment Plans**: Step-by-step treatment recommendations
- **🛡️ Prevention Tips**: Learn how to prevent future plant diseases
- **📱 Mobile Friendly**: Works on any device with camera support
- **🎯 Instant Results**: No registration required, just upload and analyze

### For Administrators (Full Access)
- **Tree Registration**: Digital registration with geo-tagging and photo upload
- **Care Log Management**: Track watering, fertilizer, pruning activities with timestamps
- **Photo Timeline**: Visual documentation of tree growth stored in Firebase Storage
- **Real-time Dashboard**: Live statistics and health monitoring
- **Survival Tracking**: Real-time survival probability metrics
- **Analytics & Impact**: Environmental impact calculations and trends

### AI/ML Capabilities
- **Health Classification**: Image-based tree health assessment
- **Predictive Analytics**: Survival probability prediction
- **Smart Alerts**: Rule-based care notifications
- **Disease Detection**: Early identification of plant stress
- **Care Recommendations**: Species-based care templates

### Analytics & Impact
- **Carbon Sequestration**: CO₂ capture measurement (21.77 kg/tree/year)
- **Oxygen Production**: O₂ output tracking (118 kg/tree/year)
- **Water Efficiency**: Smart watering optimization
- **Maintenance Compliance**: Caretaker accountability metrics
- **Species Analysis**: Health distribution by species

### Firebase Integration
- **Authentication**: Email/password authentication
- **Firestore Database**: Real-time data synchronization
- **Cloud Storage**: Image upload and management
- **Analytics**: Usage tracking and insights

## 🚀 Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage, Analytics)
- **Charts**: Recharts
- **Maps**: Leaflet + React Leaflet
- **Icons**: Lucide React

## 🎯 User Roles

### 👥 Visitor Mode
**Perfect for**: General public, plant enthusiasts, gardeners

**Features**:
- AI-powered disease detection
- Upload plant photos
- Get instant diagnosis
- Treatment recommendations
- Prevention tips
- No registration required

**How to use**:
1. Click "Visitor" button on login
2. Upload a photo of your plant
3. Click "Detect Disease"
4. View comprehensive results
5. Save or print report

### 👨‍💼 Admin Mode
**Perfect for**: Forest managers, municipal staff, caretakers

**Features**:
- Full tree registry management
- Care activity logging
- Dashboard with live statistics
- Environmental impact analytics
- Disease detection tool
- Data export capabilities

**How to use**:
1. Click "Admin" button on login
2. Access all management features
3. Register and track trees
4. Log maintenance activities
5. View analytics and reports

## 📸 AI Disease Detection

### Supported Diseases
1. **Leaf Spot** - Circular brown spots with yellow halos
2. **Powdery Mildew** - White powdery coating on leaves
3. **Root Rot** - Wilting and yellowing from root damage
4. **Bacterial Blight** - Water-soaked spots and lesions
5. **Nutrient Deficiency** - Yellowing and stunted growth
6. **Healthy** - No disease detected

### How It Works
1. **Upload**: Take or select a clear photo of affected plant
2. **Analyze**: AI processes image for disease patterns (2-3 seconds)
3. **Results**: Get diagnosis with confidence score and severity
4. **Treatment**: Receive step-by-step treatment instructions
5. **Prevention**: Learn how to prevent future occurrences

### Tips for Best Results
- Use good lighting (natural daylight preferred)
- Focus on affected areas (6-12 inches away)
- Capture clear, sharp images
- Show symptoms clearly
- Avoid blurry or dark photos

See [VISITOR-GUIDE.md](VISITOR-GUIDE.md) for detailed instructions.

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (free tier works)

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Firebase Setup:**
   - The project is pre-configured with Firebase
   - Sample data will be automatically initialized on first login
   - No additional configuration needed for demo

3. **Run development server:**
```bash
npm run dev
```

4. **Open application:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - **For Visitors**: Click "Visitor" button → Upload plant photos for disease detection
   - **For Admins**: Click "Admin" button → Access full tree management system

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider
│   ├── page.tsx                # Main application with routing
│   └── globals.css             # Global styles
├── components/
│   ├── Dashboard-functional.tsx    # Real-time dashboard with live data
│   ├── TreeRegistry-functional.tsx # Tree CRUD operations
│   ├── CareLog-functional.tsx      # Activity logging
│   ├── Analytics-functional.tsx    # Impact metrics
│   └── Login.tsx                   # Authentication UI
├── lib/
│   ├── firebase.ts             # Firebase initialization
│   ├── auth.ts                 # Authentication functions
│   ├── firestore.ts            # Database operations
│   ├── storage.ts              # File upload/download
│   └── initFirebase.ts         # Sample data initialization
├── hooks/
│   └── useFirestore.ts         # Custom hooks for data fetching
├── contexts/
│   └── AuthContext.tsx         # Authentication context
└── package.json
```

## 🎯 Key Features Explained

### Tree Registry
- Add new trees with ID, species, location, caretaker
- Upload photos directly to Firebase Storage
- Real-time search and filtering
- Health status tracking (Healthy/Needs Care/Critical)
- Survival probability calculation

### Care Logs
- Log activities: Watering, Fertilizer, Pruning, Disease Treatment, Inspection
- Attach photos to activities
- Timeline view of all activities
- AI-powered care recommendations
- Caretaker accountability

### Dashboard
- Live statistics (total trees, survival rate, active caretakers)
- Health distribution pie chart
- Species distribution bar chart
- Recent activity feed
- Quick action cards

### Analytics
- Environmental impact calculation
- CO₂ capture and O₂ production metrics
- Activity distribution analysis
- Species health breakdown
- Maintenance compliance tracking

## 🔥 Firebase Features

### Firestore Collections

**trees**
```typescript
{
  treeId: string
  species: string
  plantedDate: string
  location: string
  caretaker: string
  health: 'Healthy' | 'Needs Care' | 'Critical'
  lastWatered: string
  survivalProb: number
  imageUrl?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

**careLogs**
```typescript
{
  treeId: string
  species: string
  activity: string
  caretaker: string
  date: string
  time: string
  notes: string
  status: string
  imageUrl?: string
  createdAt: Timestamp
}
```

### Storage Structure
```
/trees/{treeId}/{timestamp}_{filename}
/care-logs/{logId}/{timestamp}_{filename}
```

## 📊 Success Metrics

### Ecological Metrics
- Tree survival rate improvement %
- Disease detection lead time
- Water-use efficiency
- Plant stress detection accuracy
- Carbon sequestration estimates

### Operational Metrics
- Maintenance compliance rate
- Care log completion %
- Response time to alerts
- Caretaker engagement

## 🔐 Authentication

The system uses Firebase Authentication with email/password:
- Demo accounts work instantly (no signup required)
- Users can create new accounts via Sign Up
- Session persistence across page reloads
- Secure logout functionality

## 🌱 Sample Data

On first login, the system automatically initializes with:
- 3 sample trees (Oak, Maple, Pine)
- 2 sample care logs
- Realistic health and survival data

## 🚀 Future Enhancements

- [ ] Mobile app for field workers
- [ ] Advanced ML models for disease prediction
- [ ] Integration with IoT sensors (soil moisture, temperature)
- [ ] Multi-language support
- [ ] Automated reporting system
- [ ] Community engagement features
- [ ] Weather API integration
- [ ] Geolocation mapping with Leaflet
- [ ] Push notifications for care reminders
- [ ] Export data to CSV/PDF

## 🤝 Contributing

This is a prototype system. To extend:
1. Add new Firebase collections in `lib/firestore.ts`
2. Create custom hooks in `hooks/`
3. Build new components in `components/`
4. Update routing in `app/page.tsx`

## 📝 License

MIT License

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Next.js for the framework
- Recharts for data visualization
- Tailwind CSS for styling

---

**Built with ❤️ for urban forest conservation**
