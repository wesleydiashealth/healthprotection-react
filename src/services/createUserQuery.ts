import ExcludesData from 'dtos/ExcludesData';
import OutcomeData from 'dtos/OutcomeData';
import SuboutcomeData from 'dtos/SuboutcomeData';
import CountData from 'dtos/CountData';

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
    count: CountData;
  };
}

export default function createUserQuery(
  data: RequestData[],
  lang: string,
): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    wordpressApi
      .post(`/wp-json/hp/v1/sankey/${lang}`, data)
      .then(async response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
