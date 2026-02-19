import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const uploadTreeImage = async (file: File, treeId: string) => {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `trees/${treeId}/${timestamp}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

export const uploadCareLogImage = async (file: File, logId: string) => {
  try {
    const timestamp = Date.now();
    const storageRef = ref(storage, `care-logs/${logId}/${timestamp}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL, error: null };
  } catch (error: any) {
    return { url: null, error: error.message };
  }
};

export const deleteImage = async (imageUrl: string) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};
