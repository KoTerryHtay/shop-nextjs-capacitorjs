import supabase from "@/supabase";

export async function deleteCategory(id: number) {
  const { error } = await supabase
    .from("Category")
    .delete()
    .eq("categoryId", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Category not delete");
  }

  window.location.href = "/category";
}
