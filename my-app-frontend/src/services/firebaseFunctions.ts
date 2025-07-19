import {  ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./firebase"; 

export const convertAndUploadToFirebase = async (file: File): Promise<string> => {
  const webpBlob = await convertImageToWebP(file, 400, 400);
  const webpFile = new File([webpBlob], `${file.name.split('.')[0]}.webp`, {
    type: "image/webp",
  });

  const storageRef = ref(storage, `images/${uuidv4()}.webp`);
  await uploadBytes(storageRef, webpFile);
  return await getDownloadURL(storageRef);
};


const convertImageToWebP = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context non disponible");

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject("Échec de la conversion WebP");
        },
        "image/webp",
        0.8 
      );
    };

    img.onerror = reject;

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
