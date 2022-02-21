import ProductData from 'dtos/ProductData';

import wordpressApi from 'services/wordpress';

export default function getProducts(
  nutraceuticals: string[],
  lang: string,
): Promise<ProductData[]> {
  return new Promise((resolve, reject) => {
    wordpressApi
      .post(`/wp-json/hp/v1/products/${lang}`, { nutraceuticals })
      .then(async response => {
        const { data: responseData } = response;

        resolve(responseData.content);
      })
      .catch(error => {
        reject(error);
      });
  });
}
