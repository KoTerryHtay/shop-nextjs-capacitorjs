import supabase from "@/supabase";

export async function deleteBrand(id: number) {
  const { error } = await supabase
    .from("Brand")
    .delete()
    .eq("brandId", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Product not delete");
  }

  window.location.href = "/brand";
}
