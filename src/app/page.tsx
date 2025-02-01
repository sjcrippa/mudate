import { getItems, getCategories } from "@/app/actions/actions";
import AddItemForm from "@/components/add-item";
import CategoryList from "@/components/category-list";

export default async function Home() {
  const items = await getItems();
  const categories = await getCategories();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Mi Mudanza</h1>
      <AddItemForm categories={categories} />
      <CategoryList items={items} categories={categories} />
    </div>
  );
}
