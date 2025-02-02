import AddItemForm from "@/components/add-item";
import CategoryList from "@/components/category-list";
import { getCategories } from "@/app/actions/actions";
import TabBar from "@/components/nav/tab-bar";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">ME MUDO</h1>
      <TabBar categories={categories} />
      <AddItemForm categories={categories} />
      <CategoryList categories={categories} />
    </main>
  );
}
