import React from 'react';

import { useWizard } from 'contexts/wizard';

import Loading from 'components/Loading';
import Error from 'components/Error';

const Carousel: React.FC = ({ children }) => {
  const context = useWizard();
  const { questions, error } = context;

  if (error) return <Error message={error} />;

  return Object.keys(questions).length > 1 ? (
    <>{children}</>
  ) : (
    <Loading color="#7664c8" />
  );
};

export default Carousel;
