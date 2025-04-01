"use client";

import { useState } from "react";
import { toast } from "sonner";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, addItem: addItemToStore } = useItemsStore();

  const isDuplicate = (name: string, category: string) => {
    return items.some(
      (item) => 
        item.name.toLowerCase() === name.toLowerCase() && 
        item.category === category
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    
    if (!trimmedName) return;

    if (isDuplicate(trimmedName, category)) {
      toast.error("Ya existe un item con ese nombre en la misma categoría");
      return;
    }

    try {
      setIsSubmitting(true);
      const newItem = await addItem(trimmedName, category);
      addItemToStore(newItem);
      setName("");
      toast.success("Item agregado correctamente");
    } catch (error) {
      toast.error("Error al agregar el item");
      console.error("Error al agregar el item:", error);
    } finally {
      setIsSubmitting(false);
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
        disabled={isSubmitting}
      />
      <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
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
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Agregando..." : "Agregar"}
      </Button>
    </form>
  );
}
