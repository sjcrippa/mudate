"use server";

import { revalidatePath } from "next/cache";

import type { Item, Category } from "@/types/types";

let items: Item[] = [];
const categories: Category[] = [
  { id: "1", name: "Cocina", color: "bg-red-200" },
  { id: "2", name: "Sala", color: "bg-blue-200" },
  { id: "3", name: "Dormitorio", color: "bg-green-200" },
  { id: "4", name: "Baño", color: "bg-yellow-200" },
];

export async function getItems() {
  return items;
}

export async function getCategories() {
  return categories;
}

export async function addItem(name: string, category: string) {
  const newItem: Item = {
    id: Date.now().toString(),
    name,
    category,
    completed: false,
  };
  items.push(newItem);
  revalidatePath("/");
}

export async function updateItem(id: string, completed: boolean) {
  items = items.map((item) => (item.id === id ? { ...item, completed } : item));
  revalidatePath("/");
}

export async function deleteItem(id: string) {
  items = items.filter((item) => item.id !== id);
  revalidatePath("/");
}
