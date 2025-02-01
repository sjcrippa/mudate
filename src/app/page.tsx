import StateProvider from "@/context/provider";
import AddItemForm from "@/components/add-item";
import CategoryList from "@/components/category-list";
import { getItems, getCategories } from "@/app/actions/actions";

export default async function Home() {
  const initialItems = await getItems();
  const categories = await getCategories();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">ME MUDO</h1>
      <StateProvider initialItems={initialItems}>
        <AddItemForm categories={categories} />
        <CategoryList categories={categories} />
      </StateProvider>
    </div>
  );
}
