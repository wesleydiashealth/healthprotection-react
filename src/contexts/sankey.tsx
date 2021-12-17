import React, { createContext, useContext, useState } from 'react';

interface SankeyContextData {
  activeAccordions: string[];
  activeNutraceutical: string;
  updateActiveAccordions(outcome: string): Promise<void>;
  updateActiveNutraceutical(nutraceutical: string): Promise<void>;
}

const SankeyContext = createContext<SankeyContextData>({} as SankeyContextData);

export const SankeyProvider: React.FC = ({ children }) => {
  const [activeAccordions, setActiveAccordions] = useState<string[]>([]);
  const [activeNutraceutical, setActiveNutraceutical] = useState<string>('');

  async function updateActiveAccordions(outcome: string) {
    const updatedActiveAccordions = [...activeAccordions];

    const outcomeIndex = activeAccordions.indexOf(outcome);

    if (outcomeIndex > -1) {
      updatedActiveAccordions.splice(outcomeIndex, 1);
    } else {
      updatedActiveAccordions.push(outcome);
    }
    setActiveAccordions([...updatedActiveAccordions]);
  }

  async function updateActiveNutraceutical(nutraceutical: string) {
    setActiveNutraceutical(nutraceutical);
  }

  return (
    <SankeyContext.Provider
      value={{
        activeAccordions,
        activeNutraceutical,
        updateActiveAccordions,
        updateActiveNutraceutical,
      }}
    >
      {children}
    </SankeyContext.Provider>
  );
};

export function useSankey(): SankeyContextData {
  const context = useContext(SankeyContext);

  return context;
}
