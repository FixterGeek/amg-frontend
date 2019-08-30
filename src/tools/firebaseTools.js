import uniqid from 'uniqid';
import { storage } from '../firebase';

export function uploadFile(referencePath, file) {
  return new Promise((resolve, reject) => {
    storage.ref(referencePath).child(`${uniqid()}-${file.name}`).put(file)
      .then(async snap => resolve(await snap.ref.getDownloadURL()))
      .catch((error) => reject(error));
  })
}


export function deleteFile(url) {
  return storage.refFromURL(url).delete()
    .then(() => 'success')
    .catch(() => 'error');
}
