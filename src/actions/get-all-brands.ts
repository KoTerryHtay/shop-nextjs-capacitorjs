import supabase from "@/supabase";

export async function getAllBrands() {
  const { data: brands, error } = await supabase.from("Brand").select(
    `*,
    Product(*)
  `
  );

  if (error) {
    console.error(error);
    throw new Error("Brand not found");
  }

  // console.log("brands >>>", brands);

  return brands;
}
