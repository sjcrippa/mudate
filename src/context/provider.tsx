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

  // Cargar items del localStorage al inicio
  useEffect(() => {
    try {
      const saved = localStorage.getItem("items");
      if (saved) {
        const parsedItems = JSON.parse(saved);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setItems(parsedItems);
        } else {
          setItems(initialItems);
        }
      }
    } catch (error) {
      console.error("Error al cargar items:", error);
      setItems(initialItems);
    }
    setIsHydrated(true);
  }, [initialItems]);

  // Guardar items en localStorage cuando cambien
  useEffect(() => {
    if (isHydrated && items.length > 0) {
      try {
        localStorage.setItem("items", JSON.stringify(items));
      } catch (error) {
        console.error("Error al guardar items:", error);
      }
    }
  }, [items, isHydrated]);

  return (
    <StateContext.Provider value={{ items, setItems }}>
      {children}
    </StateContext.Provider>
  );
}
