# Data Import Guide

## 📊 Import Your Dataset

The Urban Forest Intelligence System supports bulk data import from CSV and JSON files.

## 🚀 Quick Start

1. **Login** to the system (Admin or Visitor)
2. **Click "Import Data"** tab in the navigation
3. **Select data type**: Trees or Care Logs
4. **Download template** to see the required format
5. **Upload your file** (CSV or JSON)

## 📁 Supported Formats

### CSV Format
- Comma-separated values
- First row must be headers
- UTF-8 encoding recommended

### JSON Format
- Array of objects
- Each object represents one record
- Supports nested structures

## 🌳 Trees Dataset Format

### Required Fields
```csv
treeId,species,plantedDate,location,caretaker
T-1001,Oak,2024-01-15,Central Park,John Doe
T-1002,Maple,2024-01-20,Riverside Park,Jane Smith
```

### Optional Fields
- `latitude` - Decimal degrees (e.g., 40.7829)
- `longitude` - Decimal degrees (e.g., -73.9654)
- `health` - Healthy | Needs Care | Critical
- `lastWatered` - Date in YYYY-MM-DD format
- `survivalProb` - Number 0-100
- `imageUrl` - URL to tree image

### Full Example (CSV)
```csv
treeId,species,plantedDate,location,latitude,longitude,caretaker,health,lastWatered,survivalProb
T-1001,Oak,2024-01-15,Central Park,40.7829,-73.9654,John Doe,Healthy,2024-02-18,96
T-1002,Maple,2024-01-20,Riverside Park,40.7957,-73.9389,Jane Smith,Needs Care,2024-02-15,82
T-1003,Pine,2024-02-01,Battery Park,40.7033,-74.0170,Mike Johnson,Healthy,2024-02-18,94
```

### JSON Example
```json
[
  {
    "treeId": "T-1001",
    "species": "Oak",
    "plantedDate": "2024-01-15",
    "location": "Central Park",
    "latitude": 40.7829,
    "longitude": -73.9654,
    "caretaker": "John Doe",
    "health": "Healthy",
    "lastWatered": "2024-02-18",
    "survivalProb": 96
  },
  {
    "treeId": "T-1002",
    "species": "Maple",
    "plantedDate": "2024-01-20",
    "location": "Riverside Park",
    "latitude": 40.7957,
    "longitude": -73.9389,
    "caretaker": "Jane Smith",
    "health": "Needs Care",
    "lastWatered": "2024-02-15",
    "survivalProb": 82
  }
]
```

## 📝 Care Logs Dataset Format

### Required Fields
```csv
treeId,activity,caretaker,date
T-1001,Watering,John Doe,2024-02-18
T-1002,Fertilizer,Jane Smith,2024-02-17
```

### Optional Fields
- `species` - Tree species name
- `time` - Time in HH:MM format (e.g., 08:30)
- `notes` - Activity description
- `status` - completed | pending | cancelled

### Full Example (CSV)
```csv
treeId,species,activity,caretaker,date,time,notes,status
T-1001,Oak,Watering,John Doe,2024-02-18,08:30,Regular watering schedule,completed
T-1002,Maple,Fertilizer,Jane Smith,2024-02-17,10:15,Applied organic fertilizer,completed
T-1003,Pine,Pruning,Mike Johnson,2024-02-16,14:45,Removed dead branches,completed
```

### JSON Example
```json
[
  {
    "treeId": "T-1001",
    "species": "Oak",
    "activity": "Watering",
    "caretaker": "John Doe",
    "date": "2024-02-18",
    "time": "08:30",
    "notes": "Regular watering schedule",
    "status": "completed"
  },
  {
    "treeId": "T-1002",
    "species": "Maple",
    "activity": "Fertilizer",
    "caretaker": "Jane Smith",
    "date": "2024-02-17",
    "time": "10:15",
    "notes": "Applied organic fertilizer",
    "status": "completed"
  }
]
```

## 🔄 Field Mapping

The importer automatically maps common field name variations:

### Tree Fields
- `treeId` ← tree_id, id
- `species` ← tree_species
- `plantedDate` ← planted_date, date
- `location` ← coordinates
- `latitude` ← lat
- `longitude` ← lng, lon
- `caretaker` ← owner, responsible
- `health` ← status
- `lastWatered` ← last_watered
- `survivalProb` ← survival
- `imageUrl` ← image

### Care Log Fields
- `treeId` ← tree_id
- `activity` ← type
- `caretaker` ← by
- `notes` ← description

## ✅ Validation Rules

### Trees
- `treeId` must be unique
- `plantedDate` must be valid date (YYYY-MM-DD)
- `health` must be: Healthy, Needs Care, or Critical
- `survivalProb` must be 0-100
- `latitude` must be -90 to 90
- `longitude` must be -180 to 180

### Care Logs
- `treeId` should match existing tree
- `date` must be valid date (YYYY-MM-DD)
- `time` must be HH:MM format
- `activity` recommended: Watering, Fertilizer, Pruning, Disease Treatment, Inspection

## 📊 Large Datasets

For large datasets (1000+ records):
1. Split into smaller files (500 records each)
2. Import in batches
3. Monitor import results
4. Check for errors after each batch

## 🔍 After Import

1. **Check Dashboard** - Verify statistics updated
2. **View Tree Registry** - Search for imported trees
3. **Review Care Logs** - Check activity timeline
4. **Analytics** - See updated environmental impact

## ⚠️ Common Issues

### Import Failed
- Check file format (CSV or JSON)
- Verify required fields present
- Check date formats (YYYY-MM-DD)
- Ensure UTF-8 encoding

### Partial Import
- Review error messages
- Fix problematic records
- Re-import failed records only

### Duplicate Tree IDs
- Each treeId must be unique
- Use sequential numbering (T-1001, T-1002, etc.)

## 💡 Tips

1. **Download template first** - Ensures correct format
2. **Test with small file** - Import 5-10 records first
3. **Keep backup** - Save original dataset
4. **Use consistent IDs** - Follow naming convention
5. **Add metadata** - Include notes and descriptions

## 📞 Need Help?

If you encounter issues:
1. Download and check the template
2. Verify your data format matches
3. Try importing a single record first
4. Check browser console for errors

---

**Ready to import? Go to Import Data tab!** 📊
