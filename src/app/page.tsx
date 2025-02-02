import AddItemForm from "@/components/add-item";
import CategoryList from "@/components/category-list";
import { getCategories } from "@/app/actions/actions";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">ME MUDO</h1>

      <AddItemForm categories={categories} />
      <CategoryList categories={categories} />
    </main>
  );
}
