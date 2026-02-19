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
  Query,
} from "firebase/firestore"
import { db } from "./firebase"

// ----------------------------
// Add Care Log
// ----------------------------
export async function addCareLog(data: {
  treeId: string
  caretakerName: string
  notes: string
}) {
  try {
    const docRef = await addDoc(collection(db, "careLogs"), {
      ...data,
      createdAt: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding care log:", error)
    throw error
  }
}

// ----------------------------
// Get Care Logs (With Optional treeId Filter)
// ----------------------------
export async function getCareLogs(treeId?: string) {
  try {
    const baseCollection = collection(db, "careLogs")

    const q: Query = treeId
      ? query(baseCollection, where("treeId", "==", treeId))
      : query(baseCollection)

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error fetching care logs:", error)
    throw error
  }
}

// ----------------------------
// Update Care Log
// ----------------------------
export async function updateCareLog(
  id: string,
  data: {
    caretakerName?: string
    notes?: string
  }
) {
  try {
    const docRef = doc(db, "careLogs", id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error("Error updating care log:", error)
    throw error
  }
}

// ----------------------------
// Delete Care Log
// ----------------------------
export async function deleteCareLog(id: string) {
  try {
    const docRef = doc(db, "careLogs", id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting care log:", error)
    throw error
  }
}
