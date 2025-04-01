"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { addItem } from "@/app/actions/actions";
import type { Category } from "@/types/types";
import { useItemsStore } from "@/store/items";

export default function AddItemForm({
  categories,
}: {
  categories: Category[];
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0].id);
  const addItemToStore = useItemsStore((state) => state.addItem);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const newItem = await addItem(name, category);
      addItemToStore(newItem);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="¿Qué necesito?"
        className="flex-grow"
      />
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un ambiente" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Agregar</Button>
    </form>
  );
}
