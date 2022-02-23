import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Cart from 'components/Cart';

import { AppProvider } from 'contexts/app';

import getProducts from 'services/getProducts';
import GetSubdomain from 'services/GetSubdomain';

import ProductData from 'dtos/ProductData';

import Container from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CustomCart: React.FC = () => {
  const query = useQuery();

  const [queryProducts, setQueryProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const queryNutraceuticals = query.get('nutraceuticals')?.split(',') || [];

      const products = await getProducts(queryNutraceuticals, GetSubdomain());

      setQueryProducts(
        products.filter(
          (updatedProduct, index, self) =>
            self.findIndex(v => v.asin === updatedProduct.asin) === index,
        ),
      );
    }

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <AppProvider>
        <Cart queryProducts={queryProducts} />
      </AppProvider>
    </Container>
  );
};

export default CustomCart;
