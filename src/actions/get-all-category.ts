import supabase from "@/supabase";

export async function getAllCategory() {
  const { data: category, error } = await supabase.from("Category").select(`*,
    Product(*)
  `);

  if (error) {
    console.error(error);
    throw new Error("Category not found");
  }

  return category;
}
