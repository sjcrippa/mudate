import AddItemForm from "@/components/add-item";
import CategoryList from "@/components/category-list";
import { getCategories } from "@/app/actions/actions";
import TabBar from "@/components/nav/tab-bar";
import { createClient } from "@/db/supabase/server";
import { redirect } from "next/navigation";
import Logout from "@/components/auth/logout";

export default async function Home() {
  const categories = await getCategories();
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="container mx-auto p-4">

      <section className="flex justify-between items-center mb-8 mt-4">
        <p>Has iniciado sesion con: {user?.email}</p>
        <Logout />
      </section>

      <h1 className="text-4xl font-bold mb-8 text-center">ME MUDO 🥳</h1>
      <AddItemForm categories={categories} />
      <CategoryList categories={categories} />
      <TabBar categories={categories} />
    </main>
  );
}
