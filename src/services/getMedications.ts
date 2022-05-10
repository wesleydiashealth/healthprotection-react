import hpbApi from 'services/hpb';

interface ResponseData extends Response {
  slug: string;
  title: string;
}

export default function getMedications(
  medication: string,
): Promise<ResponseData[]> {
  return new Promise((resolve, reject) => {
    hpbApi
      .get(`/api/interaction?q=${medication}`)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
