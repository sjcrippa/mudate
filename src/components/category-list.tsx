"use client";

import { Package, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createElement, useEffect, useState } from "react";

import { useItemsStore } from "@/store/items";
import categoryIcons from "@/constants/icons";
import type { Category } from "@/types/types";
import { Button } from "@/components/ui/button";
import { getCategoryColor } from "@/utils/colors";
import { Checkbox } from "@/components/ui/checkbox";
import { useFilter } from "@/context/filter-context";
import type { Database } from "@/types/database.types";
import { updateItem, deleteItem, getItems } from "@/app/actions/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Item = Database["public"]["Tables"]["items"]["Row"];

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

function StaticItem({
  item,
  onToggle,
  onDelete,
}: { item: Item } & Pick<ItemListProps, "onToggle" | "onDelete">) {
  return (
    <li className="flex items-center text-white justify-between bg-black/20 backdrop-blur-sm rounded-md p-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          className="border-white"
          checked={item.completed}
          onCheckedChange={(checked) => onToggle(item.id, checked as boolean)}
        />
        <span className={item.completed ? "line-through" : "font-bold"}>
          {item.name}
        </span>
      </div>
      <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
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
      {items.map((item) =>
        isMounted ? (
          <AnimatePresence key={item.id} mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StaticItem item={item} onToggle={onToggle} onDelete={onDelete} />
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
      )}
    </ul>
  );
}

function CategoryCard({
  category,
  items,
  onToggle,
  onDelete,
}: CategoryCardProps) {
  const filteredItems = items.filter((item) => item.category === category.id);

  return (
    <Card
      key={category.id}
      style={{ backgroundColor: getCategoryColor(category.id) }}
      className="overflow-hidden shadow-lg"
    >
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
  const {
    items,
    setItems,
    updateItem: updateStoreItem,
    removeItem,
  } = useItemsStore();

  useEffect(() => {
    const loadItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    loadItems();
  }, [setItems]);

  const filteredCategories =
    filter === "todos"
      ? categories
      : categories.filter((cat) => cat.id === filter);

  const handleToggle = async (id: string, completed: boolean) => {
    const updatedItems = await updateItem(id, completed);
    setItems(updatedItems);
    updateStoreItem(id, completed);
  };

  const handleDelete = async (id: string) => {
    try {
      const updatedItems = await deleteItem(id);
      setItems(updatedItems);
      removeItem(id);
    } catch (error) {
      console.error("Error al eliminar el item:", error);
    }
  };

  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto items-start">
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
