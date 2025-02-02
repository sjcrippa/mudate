"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createElement, useEffect, useState } from "react";
import { Package, Trash } from "lucide-react";
import { useItems } from "@/context/provider";
import { useFilter } from "@/context/filter-context";
import type { Category, Item } from "@/types/types";
import categoryIcons from "@/constants/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { updateItem, deleteItem } from "@/app/actions/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ItemListProps {
  items: Item[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

interface CategoryCardProps {
  category: Category;
  items: Item[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

function StaticItem({ item, onToggle, onDelete }: { item: Item } & Pick<ItemListProps, 'onToggle' | 'onDelete'>) {
  return (
    <li className="flex items-center text-black justify-between bg-white bg-opacity-50 backdrop-blur-sm rounded-md p-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          className="border-black"
          checked={item.completed}
          onCheckedChange={(checked) => onToggle(item.id, checked as boolean)}
        />
        <span className={item.completed ? "line-through" : ""}>
          {item.name}
        </span>
      </div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(item.id)}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </li>
  );
}

function ItemList({ items, onToggle, onDelete }: ItemListProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        isMounted ? (
          <AnimatePresence key={item.id} mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StaticItem
                item={item}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <StaticItem
            key={item.id}
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        )
      ))}
    </ul>
  );
}

function CategoryCard({ category, items, onToggle, onDelete }: CategoryCardProps) {
  const filteredItems = items.filter((item) => item.category === category.id);

  return (
    <Card key={category.id} className={`${category.color} overflow-hidden shadow-lg`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 uppercase text-black">
          {createElement(categoryIcons[category.id] || Package, {
            className: "w-6 h-6",
          })}
          <span>{category.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ItemList 
          items={filteredItems}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
}

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const { filter } = useFilter();
  const { items, setItems } = useItems();

  const filteredCategories =
    filter === "todos"
      ? categories
      : categories.filter((cat) => cat.id === filter);

  const handleToggle = async (id: string, completed: boolean) => {
    const updatedItems = await updateItem(id, completed);
    setItems(updatedItems);
  };

  const handleDelete = async (id: string) => {
    const updatedItems = await deleteItem(id);
    setItems(updatedItems);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            items={items}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
