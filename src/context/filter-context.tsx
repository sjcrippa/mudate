"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  filter: string;
  setFilter: (filter: string) => void;
}

const DEFAULT_FILTER = "todos";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  const value = {
    filter,
    setFilter,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
