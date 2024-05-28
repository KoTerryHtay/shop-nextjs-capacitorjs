import supabase from "@/supabase";

export async function getAllProduct() {
  const {
    data: products,

    error,
  } = await supabase.from("Product").select("*").order("productId", {
    ascending: false,
  });

  if (error) {
    console.error(error);
    throw new Error("Product not found");
  }

  // console.log("products >>>", products);

  return products;
}
