import { storage } from '../firebase';

export function uploadFile (referencePath ,file) {
  return new Promise((resolve, reject) => {
    storage.ref(referencePath).child(file.name).put(file)
      .then(async snap => resolve(await snap.ref.getDownloadURL()))
      .catch((error) => reject(error));
  })
}