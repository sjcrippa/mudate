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
import { useItems } from "@/context/provider";
import { Button } from "@/components/ui/button";
import { addItem } from "@/app/actions/actions";
import type { Category, Item } from "@/types/types";

export default function AddItemForm({
  categories,
}: {
  categories: Category[];
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0].id);
  const { setItems } = useItems();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const newItem = await addItem(name, category);
      setItems((prevItems: Item[]) => [...prevItems, newItem]);
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nuevo item"
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
