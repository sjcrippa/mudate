"use client";

import { useState } from "react";
import type { Item, Category } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { updateItem, deleteItem } from "../actions";

export default function CategoryList({
  items,
  categories,
}: {
  items: Item[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState("all");

  const filteredCategories =
    filter === "all"
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
      <div className="mb-4 flex justify-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          Todos
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={filter === cat.id ? "default" : "outline"}
            onClick={() => setFilter(cat.id)}
            className={`${cat.color} text-gray-800`}
          >
            {cat.name}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <Card key={category.id} className={`${category.color}`}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {items
                  .filter((item) => item.category === category.id)
                  .map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
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
                        Eliminar
                      </Button>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
