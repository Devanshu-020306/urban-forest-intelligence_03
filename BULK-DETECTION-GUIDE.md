# Bulk Plant Detection Guide

## 🌿 Automatically Detect Plants from CSV

Upload a CSV file with image URLs and the system will automatically detect:
- Plant species
- Health status
- Diseases
- Treatment recommendations

## 🚀 Quick Start

1. **Login as Admin**
2. **Go to "Bulk Detection" tab**
3. **Download template** to see format
4. **Prepare your CSV** with image URLs
5. **Upload and wait** for automatic detection
6. **Download results** as CSV

## 📁 CSV Format

### Required Column
```csv
imageUrl
https://example.com/images/leaf1.jpg
https://example.com/images/leaf2.jpg
https://example.com/images/leaf3.jpg
```

### Full Format (with optional fields)
```csv
imageUrl,treeId,location,plantedDate
https://example.com/leaf1.jpg,T-001,Central Park,2024-01-15
https://example.com/leaf2.jpg,T-002,Riverside Park,2024-01-20
https://example.com/leaf3.jpg,T-003,Battery Park,2024-02-01
```

## 🎯 What Gets Detected

For each image, the system detects:

1. **Plant Name** - Common name (e.g., Oak Tree, Maple Tree)
2. **Species** - Scientific name (e.g., Quercus, Acer)
3. **Health Status** - Healthy, Needs Care, or Critical
4. **Confidence** - Detection accuracy (85-100%)
5. **Disease** - If any disease detected
6. **Treatment** - Recommended treatment for disease

## 📊 Example Results

### Input CSV:
```csv
imageUrl,treeId,location
https://example.com/oak-leaf.jpg,T-001,Central Park
https://example.com/maple-leaf.jpg,T-002,Riverside
```

### Output CSV:
```csv
imageUrl,plantName,species,health,confidence,disease,treatment
https://example.com/oak-leaf.jpg,Oak Tree,Quercus,Healthy,96,,
https://example.com/maple-leaf.jpg,Maple Tree,Acer,Needs Care,89,Tar Spot,Remove fallen leaves and apply fungicide
```

## 🔄 Auto-Save Feature

If you include `treeId` in your CSV, detected plants are automatically saved to the Tree Registry with:
- Detected species
- Health status
- Confidence as survival probability
- Image URL
- Disease information (if any)

## 💡 Tips for Best Results

### Image Quality
- Use clear, well-lit photos
- Focus on leaves or distinctive features
- Avoid blurry or dark images
- Close-up shots work best

### Image URLs
- Use direct image URLs (ending in .jpg, .png, etc.)
- Ensure URLs are publicly accessible
- HTTPS URLs recommended
- Avoid URLs requiring authentication

### CSV Preparation
- One image URL per row
- Use UTF-8 encoding
- No special characters in URLs
- Test with 2-3 images first

## 📈 Processing

- System processes images one by one
- Progress bar shows current status
- Takes ~1-2 seconds per image
- Results appear in real-time

## 🎨 Results Display

Each detected plant shows:
- Image thumbnail
- Plant name and species
- Health status badge
- Confidence percentage
- Disease (if detected)
- Treatment recommendation

## 📥 Download Results

After processing:
1. Click "Download Results" button
2. Get CSV with all detection data
3. Use for reports or further analysis
4. Import into other systems

## 🔍 Supported Plants

The system can detect:
- Oak Trees (Quercus)
- Maple Trees (Acer)
- Pine Trees (Pinus)
- Birch Trees (Betula)
- Willow Trees (Salix)
- Cherry Blossom (Prunus)
- Magnolia
- And many more...

## 🏥 Disease Detection

Common diseases detected:
- Oak Wilt
- Powdery Mildew
- Anthracnose
- Tar Spot
- Verticillium Wilt
- Pine Wilt
- Needle Cast
- Rust
- Bronze Birch Borer
- Leaf Spot
- Canker
- And more...

## ⚠️ Troubleshooting

### "Detection Failed" Error
- Check if image URL is accessible
- Verify image format (JPG, PNG)
- Ensure URL is direct link to image
- Try different image

### Low Confidence
- Image quality may be poor
- Plant features not clear
- Try better quality image
- Ensure good lighting

### Wrong Species Detected
- AI may need better image
- Try multiple angles
- Include distinctive features
- Manual verification recommended

## 🔐 Privacy & Security

- Images are processed via URL only
- No images stored on server
- Detection results saved to Firebase
- Your data remains private

## 📊 Use Cases

### Municipal Tree Survey
```csv
imageUrl,treeId,location
https://city.gov/trees/img1.jpg,CITY-001,Main Street
https://city.gov/trees/img2.jpg,CITY-002,Park Avenue
```

### School Campus Audit
```csv
imageUrl,treeId,location,plantedDate
https://school.edu/tree1.jpg,SCH-T-01,Front Gate,2024-01-15
https://school.edu/tree2.jpg,SCH-T-02,Courtyard,2024-01-20
```

### Community Garden
```csv
imageUrl,treeId,location
https://garden.org/photos/apple1.jpg,CG-001,North Section
https://garden.org/photos/pear1.jpg,CG-002,South Section
```

## 🎯 Next Steps

After bulk detection:
1. Review results in dashboard
2. Check Tree Registry for saved trees
3. Add care logs for detected diseases
4. Monitor health status over time
5. Generate reports from analytics

---

**Ready to detect plants in bulk? Go to Bulk Detection tab!** 🌿
