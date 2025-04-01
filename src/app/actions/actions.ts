"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/db/supabase/server";
import { categories } from "@/constants/categories";
import type { Database } from '@/types/database.types';

type Item = Database['public']['Tables']['items']['Row'];

export async function getItems() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data: items, error } = await supabase
    .from('items')
    .select('*')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching items:', error);
    return [];
  }

  return items;
}

export async function getCategories() {
  return categories;
}

export async function addItem(name: string, category: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Usuario no autenticado');

  const { data: newItem, error } = await supabase
    .from('items')
    .insert({
      name,
      category,
      completed: false,
      user_id: user.id
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding item:', error);
    throw error;
  }

  revalidatePath("/");
  return newItem as Item;
}

export async function updateItem(id: string, completed: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Usuario no autenticado');

  const { error } = await supabase
    .from('items')
    .update({ completed })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error updating item:', error);
    throw error;
  }

  const items = await getItems();
  revalidatePath("/");
  return items;
}

export async function deleteItem(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Usuario no autenticado');

  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting item:', error);
    throw error;
  }

  const items = await getItems();
  revalidatePath("/");
  return items;
}
