"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useFilter } from "@/context/filter-context";
import type { Category } from "@/types/types";
import categoryIcons from "@/constants/icons";

interface CategorySelectProps {
  categories: Category[];
}

export default function CategorySelect({ categories }: CategorySelectProps) {
  const { filter, setFilter } = useFilter();

  return (
    <div className="grid grid-cols-2 gap-4 ">
      {[{ id: "todos", name: "Todos" }, ...categories].map((cat) => {
        const IconComponent = categoryIcons[cat.id] || Package;
        return (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(cat.id)}
            className={`cursor-pointer rounded-xl p-4 ${
              filter === cat.id
                ? "bg-primary text-primary-foreground shadow-lg transform -translate-y-1"
                : "bg-secondary hover:bg-secondary/90"
            }`}
          >
            <div className="flex gap-4 items-center">
              <IconComponent className="w-6 h-6" />
              <span>{cat.name}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
