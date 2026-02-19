# Quick Setup Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Application
Open http://localhost:3000 (or http://localhost:3001 if 3000 is in use)

## 🎯 First Time Usage

1. **Login**: Click "Admin" or "Visitor" demo button on login screen
2. **Sample Data**: System automatically initializes with 3 sample trees and 2 care logs
3. **Explore Features**:
   - Dashboard: View statistics and charts
   - Tree Registry: Add new trees, search, and manage
   - Care Logs: Log activities like watering, pruning
   - Analytics: See environmental impact

## ✨ Key Features to Try

### Register a New Tree
1. Go to "Tree Registry" tab
2. Click "Register New Tree"
3. Fill in details:
   - Tree ID (e.g., T-1004)
   - Species (e.g., Birch)
   - Planted Date
   - Location coordinates
   - Caretaker name
   - Health status
4. Optionally upload a photo
5. Click "Register Tree"

### Log Care Activity
1. Go to "Care Logs" tab
2. Click "Log Activity"
3. Select tree from dropdown
4. Choose activity type (Watering, Fertilizer, etc.)
5. Add notes and optional photo
6. Click "Save Activity"

### View Analytics
1. Go to "Analytics" tab
2. See real-time calculations:
   - CO₂ captured (21.77 kg/tree/year)
   - O₂ produced (118 kg/tree/year)
   - Activity distribution
   - Species health breakdown

## 🔥 Firebase Features

All data is stored in Firebase:
- **Authentication**: Secure login/logout
- **Firestore**: Real-time database for trees and logs
- **Storage**: Image uploads for trees and activities
- **Analytics**: Usage tracking

## 📱 Demo Accounts

- **Admin**: admin@urbanforest.com
- **Visitor**: visitor@urbanforest.com

Both work instantly without password!

## 🛠️ Troubleshooting

### Port Already in Use
If port 3000 is busy, Next.js will automatically use 3001

### Firebase Errors
The app is pre-configured with Firebase. No setup needed!

### No Data Showing
Sample data initializes on first login. Try logging out and back in.

### Images Not Uploading
Check Firebase Storage rules are set to allow uploads

## 📊 Understanding the Data

### Tree Health Status
- **Healthy**: 90%+ survival probability
- **Needs Care**: 70-89% survival probability  
- **Critical**: <70% survival probability

### Environmental Impact
- Each tree captures ~21.77 kg CO₂/year
- Each tree produces ~118 kg O₂/year
- Calculations are prorated based on tree age

### Survival Probability
Calculated based on:
- Health status
- Care frequency
- Time since last watering
- Species characteristics

## 🎨 Customization

### Add New Activity Types
Edit `components/CareLog-functional.tsx`:
```typescript
<option>Your New Activity</option>
```

### Modify Health Thresholds
Edit `components/TreeRegistry-functional.tsx`:
```typescript
survivalProb: 95, // Change default value
```

### Update Environmental Calculations
Edit `components/Analytics-functional.tsx`:
```typescript
const avgCO2PerTree = 21.77 // Modify kg per year
const avgO2PerTree = 118    // Modify kg per year
```

## 🚀 Next Steps

1. **Add Real Trees**: Register actual trees in your area
2. **Track Care**: Log daily/weekly maintenance activities
3. **Monitor Health**: Update tree health status regularly
4. **Analyze Impact**: Review analytics to see environmental contribution
5. **Share Data**: Export reports for stakeholders

## 💡 Pro Tips

- Use consistent Tree ID format (e.g., T-1001, T-1002)
- Log activities immediately after completion
- Upload photos to track visual progress
- Check dashboard daily for alerts
- Review analytics monthly for trends

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify Firebase connection
3. Clear browser cache and reload
4. Check README.md for detailed documentation

---

**Happy Tree Tracking! 🌳**
