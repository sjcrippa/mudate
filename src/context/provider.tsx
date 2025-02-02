"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import type { Item } from "@/types/types";

interface StateContextType {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function useItems() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useItems debe ser usado dentro de un StateProvider");
  }
  return context;
}

export default function StateProvider({
  children,
  initialItems,
}: {
  children: React.ReactNode;
  initialItems: Item[];
}) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("items");
    if (saved) {
      setItems(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items, isHydrated]);

  return (
    <StateContext.Provider value={{ items, setItems }}>
      {children}
    </StateContext.Provider>
  );
}
