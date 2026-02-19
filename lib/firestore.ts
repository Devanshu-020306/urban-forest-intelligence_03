import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Tree operations
export const addTree = async (treeData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'trees'), {
      ...treeData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getTrees = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'trees'));
    const trees = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { trees, error: null };
  } catch (error: any) {
    return { trees: [], error: error.message };
  }
};

export const updateTree = async (treeId: string, updates: any) => {
  try {
    const treeRef = doc(db, 'trees', treeId);
    await updateDoc(treeRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteTree = async (treeId: string) => {
  try {
    await deleteDoc(doc(db, 'trees', treeId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Care log operations
export const addCareLog = async (logData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'careLogs'), {
      ...logData,
      createdAt: Timestamp.now()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getCareLogs = async (treeId?: string) => {
  try {
    let q = collection(db, 'careLogs');
    
    if (treeId) {
      q = query(collection(db, 'careLogs'), where('treeId', '==', treeId));
    }
    
    const querySnapshot = await getDocs(q);
    const logs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { logs, error: null };
  } catch (error: any) {
    return { logs: [], error: error.message };
  }
};
