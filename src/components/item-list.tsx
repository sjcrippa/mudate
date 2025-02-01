"use client";

import { useState } from "react";
import { updateItem, deleteItem } from "@/app/actions/actions";
import type { Item, Category } from "@/types/types";

export default function ItemList({
  items,
  categories,
}: {
  items: Item[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState("all");

  const filteredItems = items.filter(
    (item) => filter === "all" || item.category === filter
  );

  const handleToggle = async (id: string, completed: boolean) => {
    await updateItem(id, completed);
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
  };

  return (
    <div>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">Todos los ambientes</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={(e) => handleToggle(item.id, e.target.checked)}
              className="mr-2"
            />
            <span className={item.completed ? "line-through" : ""}>
              {item.name} -{" "}
              {categories.find((cat) => cat.id === item.category)?.name}
            </span>
            <button
              onClick={() => handleDelete(item.id)}
              className="ml-2 bg-red-500 text-white p-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
