"use client";

import { createElement, useState } from "react";
import { motion } from "framer-motion";
import {
  CookingPotIcon as Kitchen,
  Sofa,
  Bed,
  Bath,
  Package,
  Waves,
  Lightbulb,
  Flower2,
  LucideIcon,
  Trash,
} from "lucide-react";

import type { Item, Category } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { updateItem, deleteItem } from "@/app/actions/actions";

type CategoryIcon = {
  [key: string]: LucideIcon;
};

const categoryIcons: CategoryIcon = {
  "0": Package,
  "1": Kitchen,
  "2": Sofa,
  "3": Bed,
  "4": Bath,
  "5": Waves,
  "6": Lightbulb,
  "7": Flower2,
};

export default function CategoryList({
  items,
  categories,
}: {
  items: Item[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState("todos");

  const filteredCategories =
    filter === "todos"
      ? categories
      : categories.filter((cat) => cat.id === filter);

  const handleToggle = async (id: string, completed: boolean) => {
    await updateItem(id, completed);
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  return (
    <div>
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
                <h3 className="font-semibold text-center">{cat.name}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className={`${category.color} overflow-hidden shadow-lg`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2 uppercase text-black">
                {createElement(
                  categoryIcons[category.id.toLowerCase()] || Package,
                  {
                    className: "w-6 h-6",
                  }
                )}
                <span>{category.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {items
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center text-black justify-between bg-white bg-opacity-50 backdrop-blur-sm rounded-md p-2"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          className="border-black"
                          checked={item.completed}
                          onCheckedChange={(checked) =>
                            handleToggle(item.id, checked as boolean)
                          }
                        />
                        <span className={item.completed ? "line-through" : ""}>
                          {item.name}
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </motion.li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
