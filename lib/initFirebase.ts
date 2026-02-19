// Initialize Firebase with sample data
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function initializeSampleData() {
  try {
    // Check if data already exists
    const treesSnapshot = await getDocs(collection(db, 'trees'));
    if (treesSnapshot.size > 0) {
      console.log('Sample data already exists');
      return;
    }

    // Add sample trees
    const sampleTrees = [
      {
        treeId: 'T-1001',
        species: 'Oak',
        plantedDate: '2024-01-15',
        location: '40.7128° N, 74.0060° W',
        caretaker: 'John Doe',
        health: 'Healthy',
        lastWatered: '2024-02-18',
        survivalProb: 96,
      },
      {
        treeId: 'T-1002',
        species: 'Maple',
        plantedDate: '2024-01-20',
        location: '40.7580° N, 73.9855° W',
        caretaker: 'Jane Smith',
        health: 'Needs Care',
        lastWatered: '2024-02-15',
        survivalProb: 82,
      },
      {
        treeId: 'T-1003',
        species: 'Pine',
        plantedDate: '2024-02-01',
        location: '40.7489° N, 73.9680° W',
        caretaker: 'Mike Johnson',
        health: 'Healthy',
        lastWatered: '2024-02-18',
        survivalProb: 94,
      },
    ];

    for (const tree of sampleTrees) {
      await addDoc(collection(db, 'trees'), {
        ...tree,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Add sample care logs
    const sampleLogs = [
      {
        treeId: 'T-1001',
        species: 'Oak',
        activity: 'Watering',
        caretaker: 'John Doe',
        date: '2024-02-18',
        time: '08:30',
        notes: 'Regular watering schedule maintained',
        status: 'completed',
      },
      {
        treeId: 'T-1002',
        species: 'Maple',
        activity: 'Fertilizer',
        caretaker: 'Jane Smith',
        date: '2024-02-17',
        time: '10:15',
        notes: 'Applied organic fertilizer',
        status: 'completed',
      },
    ];

    for (const log of sampleLogs) {
      await addDoc(collection(db, 'careLogs'), {
        ...log,
        createdAt: new Date(),
      });
    }

    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}
