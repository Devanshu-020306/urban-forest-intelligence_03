# Dataset Examples

## Quick Reference for Your Dataset

### Example 1: Simple Trees CSV

```csv
treeId,species,plantedDate,location,caretaker
T-001,Oak,2024-01-15,Central Park NY,John Smith
T-002,Maple,2024-01-20,Riverside Park,Jane Doe
T-003,Pine,2024-02-01,Battery Park,Mike Johnson
T-004,Birch,2024-02-05,Prospect Park,Sarah Williams
T-005,Willow,2024-02-10,Brooklyn Bridge Park,Tom Brown
```

### Example 2: Detailed Trees CSV

```csv
treeId,species,plantedDate,location,latitude,longitude,caretaker,health,lastWatered,survivalProb
T-001,Oak,2024-01-15,Central Park NY,40.7829,-73.9654,John Smith,Healthy,2024-02-18,96
T-002,Maple,2024-01-20,Riverside Park,40.7957,-73.9389,Jane Doe,Healthy,2024-02-17,94
T-003,Pine,2024-02-01,Battery Park,40.7033,-74.0170,Mike Johnson,Needs Care,2024-02-15,85
T-004,Birch,2024-02-05,Prospect Park,40.6602,-73.9690,Sarah Williams,Healthy,2024-02-18,92
T-005,Willow,2024-02-10,Brooklyn Bridge Park,40.7024,-73.9875,Tom Brown,Critical,2024-02-10,68
```

### Example 3: Care Logs CSV

```csv
treeId,species,activity,caretaker,date,time,notes
T-001,Oak,Watering,John Smith,2024-02-18,08:30,Morning watering routine
T-001,Oak,Fertilizer,John Smith,2024-02-15,10:00,Applied organic fertilizer
T-002,Maple,Watering,Jane Doe,2024-02-17,09:00,Regular watering
T-002,Maple,Pruning,Jane Doe,2024-02-10,14:30,Removed dead branches
T-003,Pine,Disease Treatment,Mike Johnson,2024-02-16,11:00,Treated for fungal infection
T-003,Pine,Watering,Mike Johnson,2024-02-15,08:00,Deep watering
T-004,Birch,Inspection,Sarah Williams,2024-02-18,15:00,Health check - all good
T-005,Willow,Watering,Tom Brown,2024-02-10,07:30,Emergency watering
```

### Example 4: JSON Format (Trees)

```json
[
  {
    "treeId": "T-001",
    "species": "Oak",
    "plantedDate": "2024-01-15",
    "location": "Central Park NY",
    "latitude": 40.7829,
    "longitude": -73.9654,
    "caretaker": "John Smith",
    "health": "Healthy",
    "lastWatered": "2024-02-18",
    "survivalProb": 96
  },
  {
    "treeId": "T-002",
    "species": "Maple",
    "plantedDate": "2024-01-20",
    "location": "Riverside Park",
    "latitude": 40.7957,
    "longitude": -73.9389,
    "caretaker": "Jane Doe",
    "health": "Healthy",
    "lastWatered": "2024-02-17",
    "survivalProb": 94
  }
]
```

### Example 5: JSON Format (Care Logs)

```json
[
  {
    "treeId": "T-001",
    "species": "Oak",
    "activity": "Watering",
    "caretaker": "John Smith",
    "date": "2024-02-18",
    "time": "08:30",
    "notes": "Morning watering routine",
    "status": "completed"
  },
  {
    "treeId": "T-002",
    "species": "Maple",
    "activity": "Fertilizer",
    "caretaker": "Jane Doe",
    "date": "2024-02-17",
    "time": "10:00",
    "notes": "Applied organic fertilizer",
    "status": "completed"
  }
]
```

## Common Dataset Scenarios

### Scenario 1: Municipal Tree Inventory
```csv
treeId,species,plantedDate,location,latitude,longitude,caretaker,health
TREE-2024-001,American Elm,2024-01-10,Main Street & 1st Ave,40.7580,-73.9855,Parks Dept,Healthy
TREE-2024-002,Red Maple,2024-01-12,City Hall Plaza,40.7128,-74.0060,Parks Dept,Healthy
TREE-2024-003,White Oak,2024-01-15,Library Garden,40.7489,-73.9680,Volunteers,Needs Care
```

### Scenario 2: School Campus Trees
```csv
treeId,species,plantedDate,location,caretaker,health,survivalProb
SCH-T-01,Cherry Blossom,2024-03-01,Front Entrance,Maintenance Team,Healthy,98
SCH-T-02,Magnolia,2024-03-01,Courtyard,Maintenance Team,Healthy,97
SCH-T-03,Dogwood,2024-03-05,Sports Field,Maintenance Team,Healthy,95
```

### Scenario 3: Community Garden
```csv
treeId,species,plantedDate,location,caretaker,health,notes
CG-001,Apple,2023-11-01,North Section,Community Group A,Healthy,Fruit bearing
CG-002,Pear,2023-11-01,North Section,Community Group A,Healthy,Fruit bearing
CG-003,Plum,2023-11-15,South Section,Community Group B,Needs Care,Requires pruning
```

## Field Mapping Examples

If your dataset has different column names, the system will automatically map them:

### Your Dataset
```csv
id,tree_type,date_planted,coordinates,responsible_person,status
001,Oak,2024-01-15,40.7829 -73.9654,John Smith,Good
```

### Automatically Mapped To
```csv
treeId,species,plantedDate,location,caretaker,health
001,Oak,2024-01-15,40.7829 -73.9654,John Smith,Healthy
```

## Tips for Your Dataset

1. **Tree IDs**: Use consistent format (T-001, TREE-001, etc.)
2. **Dates**: Always use YYYY-MM-DD format
3. **Health Status**: Use Healthy, Needs Care, or Critical
4. **Coordinates**: Separate latitude and longitude columns
5. **Activities**: Use standard types (Watering, Fertilizer, Pruning, etc.)

## Ready to Import?

1. Prepare your CSV or JSON file
2. Login as Admin
3. Go to "Import Data" tab
4. Download template if needed
5. Upload your file
6. Review results

---

**Need help formatting your dataset? Check IMPORT-GUIDE.md for detailed instructions!**
