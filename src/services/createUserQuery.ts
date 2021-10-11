import ExcludesData from 'dtos/ExcludesData';
import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';

import wordpressApi from 'services/wordpress';

interface RequestData {
  question: string;
  answer: string;
}

interface ResponseData extends Response {
  content: {
    uuid: string;
    outcomes: OutcomeData[];
    suboutcomes: SuboutcomeData[];
    excludes: ExcludesData;
  };
}

export default function createUserQuery(
  data: RequestData[],
): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    wordpressApi
      .post('/wp-json/hp/v1/sankey', data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
