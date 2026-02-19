import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"

// =============================
// TREES
// =============================

// GET TREES
export async function getTrees() {
  try {
    const snapshot = await getDocs(collection(db, "trees"))
    const trees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return { trees, error: null }
  } catch (error: any) {
    return { trees: [], error: error.message }
  }
}

// ADD TREE
export async function addTree(data: any) {
  try {
    const docRef = await addDoc(collection(db, "trees"), {
      ...data,
      createdAt: serverTimestamp(),
    })
    return { id: docRef.id, error: null }
  } catch (error: any) {
    return { id: null, error: error.message }
  }
}

// UPDATE TREE
export async function updateTree(id: string, data: any) {
  try {
    const docRef = doc(db, "trees", id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// DELETE TREE
export async function deleteTree(id: string) {
  const docRef = doc(db, "trees", id)
  await deleteDoc(docRef)
}

// =============================
// CARE LOGS
// =============================

// GET CARE LOGS (optional filter)
export async function getCareLogs(treeId?: string) {
  try {
    const baseCollection = collection(db, "careLogs")
    const q = treeId
      ? query(baseCollection, where("treeId", "==", treeId))
      : baseCollection

    const snapshot = await getDocs(q)
    const logs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return { logs, error: null }
  } catch (error: any) {
    return { logs: [], error: error.message }
  }
}

// ADD CARE LOG
export async function addCareLog(data: any) {
  try {
    const docRef = await addDoc(collection(db, "careLogs"), {
      ...data,
      createdAt: serverTimestamp(),
    })
    return { id: docRef.id, error: null }
  } catch (error: any) {
    return { id: null, error: error.message }
  }
}
