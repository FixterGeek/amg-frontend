import axios from 'axios';


export default function fileToURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => resolve(reader.result);
  });
}

export async function getBlob(url) {
  return axios.get(url, {
    responseType: 'blob',
  }).then(async ({ data }) => {
    const base64 = await fileToURL(data).then(base64Url => base64Url);
    return ({
      blob: data,
      type: data.type.split('/')[0],
      extension: data.type.split('/')[1],
      base64,
    });
  });
}


export function getFromUrls(urlsArray) {
  return Promise.all(urlsArray.map(url => getBlob(url)));
}
