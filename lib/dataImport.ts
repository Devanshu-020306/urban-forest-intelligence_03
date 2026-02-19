import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

export interface TreeDataImport {
  treeId: string;
  species: string;
  plantedDate: string;
  location: string;
  latitude?: number;
  longitude?: number;
  caretaker: string;
  health?: 'Healthy' | 'Needs Care' | 'Critical';
  lastWatered?: string;
  survivalProb?: number;
  imageUrl?: string;
}

export interface CareLogImport {
  treeId: string;
  species: string;
  activity: string;
  caretaker: string;
  date: string;
  time: string;
  notes: string;
  status?: string;
}

export async function importTrees(trees: TreeDataImport[]) {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const tree of trees) {
    try {
      // Validate required fields
      if (!tree.treeId || !tree.species || !tree.plantedDate || !tree.location || !tree.caretaker) {
        results.failed++;
        results.errors.push(`Missing required fields for tree: ${tree.treeId || 'Unknown'}`);
        continue;
      }

      // Set defaults
      const treeData = {
        treeId: tree.treeId,
        species: tree.species,
        plantedDate: tree.plantedDate,
        location: tree.location,
        latitude: tree.latitude || 0,
        longitude: tree.longitude || 0,
        caretaker: tree.caretaker,
        health: tree.health || 'Healthy',
        lastWatered: tree.lastWatered || new Date().toISOString().split('T')[0],
        survivalProb: tree.survivalProb || 95,
        imageUrl: tree.imageUrl || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, 'trees'), treeData);
      results.success++;
    } catch (error: any) {
      results.failed++;
      results.errors.push(`Error importing tree ${tree.treeId}: ${error.message}`);
    }
  }

  return results;
}

export async function importCareLogs(logs: CareLogImport[]) {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const log of logs) {
    try {
      // Validate required fields
      if (!log.treeId || !log.activity || !log.caretaker || !log.date) {
        results.failed++;
        results.errors.push(`Missing required fields for log: ${log.treeId || 'Unknown'}`);
        continue;
      }

      const logData = {
        treeId: log.treeId,
        species: log.species || 'Unknown',
        activity: log.activity,
        caretaker: log.caretaker,
        date: log.date,
        time: log.time || '00:00',
        notes: log.notes || '',
        status: log.status || 'completed',
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'careLogs'), logData);
      results.success++;
    } catch (error: any) {
      results.failed++;
      results.errors.push(`Error importing log for ${log.treeId}: ${error.message}`);
    }
  }

  return results;
}

// Parse CSV data
export function parseCSV(csvText: string): any[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row: any = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    data.push(row);
  }

  return data;
}

// Parse JSON data
export function parseJSON(jsonText: string): any[] {
  try {
    const data = JSON.parse(jsonText);
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return [];
  }
}

// Map CSV/JSON fields to our schema
export function mapToTreeSchema(data: any[]): TreeDataImport[] {
  return data.map(item => ({
    treeId: item.treeId || item.tree_id || item.id || '',
    species: item.species || item.tree_species || '',
    plantedDate: item.plantedDate || item.planted_date || item.date || '',
    location: item.location || item.coordinates || '',
    latitude: parseFloat(item.latitude || item.lat || '0'),
    longitude: parseFloat(item.longitude || item.lng || item.lon || '0'),
    caretaker: item.caretaker || item.owner || item.responsible || '',
    health: (item.health || item.status || 'Healthy') as any,
    lastWatered: item.lastWatered || item.last_watered || '',
    survivalProb: parseInt(item.survivalProb || item.survival || '95'),
    imageUrl: item.imageUrl || item.image || '',
  }));
}

export function mapToCareLogSchema(data: any[]): CareLogImport[] {
  return data.map(item => ({
    treeId: item.treeId || item.tree_id || '',
    species: item.species || '',
    activity: item.activity || item.type || '',
    caretaker: item.caretaker || item.by || '',
    date: item.date || '',
    time: item.time || '00:00',
    notes: item.notes || item.description || '',
    status: item.status || 'completed',
  }));
}
