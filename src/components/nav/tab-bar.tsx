"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CategorySelect from "../category-select";
import type { Category } from "@/types/types";

function SheetContents({ categories }: { categories: Category[] }) {
  return (
    <SheetContent side="right">
      <SheetHeader className="mb-24">
        <SheetTitle className="mb-10">Selecciona tu categoría</SheetTitle>
        <CategorySelect categories={categories} />
      </SheetHeader>
    </SheetContent>
  );
}

export default function TabBar({ categories }: { categories: Category[] }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
      <Sheet>
        <SheetTrigger className="w-full uppercase font-bold active:bg-primary-foreground">
          Categorías
        </SheetTrigger>
        <SheetContents categories={categories} />
      </Sheet>
    </div>
  );
}
