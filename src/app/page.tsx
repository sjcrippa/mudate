import { redirect } from "next/navigation";

import TabBar from "@/components/nav/tab-bar";
import Logout from "@/components/auth/logout";
import AddItemForm from "@/components/add-item";
import { createClient } from "@/db/supabase/server";
import CategoryList from "@/components/category-list";
import { getCategories } from "@/app/actions/actions";
import { User } from "lucide-react";

export default async function Home() {
  const categories = await getCategories();
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="container mx-auto p-4">
      <section className="flex justify-between items-center mb-8 mt-4">
        <div className="flex items-center">
          <User className="w-6 h-6 font-bold" /> <p className="ml-2 italic">{user?.email}</p>
        </div>
        <Logout />
      </section>

      <h1 className="text-4xl font-bold mb-8 text-center">ME MUDO 🥳</h1>
      <AddItemForm categories={categories} />
      <CategoryList categories={categories} />
      <TabBar categories={categories} />
    </main>
  );
}
