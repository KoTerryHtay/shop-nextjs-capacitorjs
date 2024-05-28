import supabase from "@/supabase";

export async function deleteProduct(id: number) {
  const { error } = await supabase
    .from("Product")
    .delete()
    .eq("productId", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Product not delete");
  }

  window.location.href = "/";
}
