import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./firebase"; 

export const uploadToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${uuidv4()}-${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
