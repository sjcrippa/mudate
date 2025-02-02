import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

export default async function TabBar() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>Categorías</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
