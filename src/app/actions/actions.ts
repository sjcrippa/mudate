"use server";

import { revalidatePath } from "next/cache";

import type { Item } from "@/types/types";
import { categories } from "@/constants/categories";

// Usar un Map para mantener los items en memoria
const itemsStore = new Map<string, Item>();

export async function getItems() {
  return Array.from(itemsStore.values());
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
  itemsStore.set(newItem.id, newItem);
  revalidatePath("/");
  return newItem;
}

export async function updateItem(id: string, completed: boolean) {
  const item = itemsStore.get(id);
  if (item) {
    const updatedItem = { ...item, completed };
    itemsStore.set(id, updatedItem);
  }
  revalidatePath("/");
  return Array.from(itemsStore.values());
}

export async function deleteItem(id: string) {
  itemsStore.delete(id);
  revalidatePath("/");
  return Array.from(itemsStore.values());
}
