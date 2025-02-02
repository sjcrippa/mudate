"use server";

import { revalidatePath } from "next/cache";

import type { Item } from "@/types/types";
import { categories } from "@/constants/categories";

let items: Item[] = [];

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
  return newItem;
}

export async function updateItem(id: string, completed: boolean) {
  items = items.map((item) => (item.id === id ? { ...item, completed } : item));
  revalidatePath("/");
  return items;
}

export async function deleteItem(id: string) {
  items = items.filter((item) => item.id !== id);
  revalidatePath("/");
  return items;
}
