import supabase from "@/supabase";
import { z } from "zod";

const createProductSchema = z.object({
  productName: z.string(),
  remainPackage: z.number(),
  remainMiniPackage: z.number(),
  brandName: z.string(),
  categoryName: z.string(),
});

interface createProductFormState {
  errors: {
    productName?: string[];
    remainPackage?: string[];
    remainMiniPackage?: string[];
    brandName?: string[];
    categoryName?: string[];
  };
}

export async function CreateProduct(
  formState: createProductFormState,
  formData: FormData
): Promise<createProductFormState> {
  const result = createProductSchema.safeParse({
    productName: formData.get("productName"),
    remainPackage: parseInt(formData.get("remainPackage")?.toString()!),
    remainMiniPackage: parseInt(formData.get("remainMiniPackage")?.toString()!),
    brandName: formData.get("brandName"),
    categoryName: formData.get("categoryName"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // console.log("result >>>", result);

  const brand = await supabase
    .from("Brand")
    .upsert(
      {
        brandName: result.data.brandName,
      },
      { onConflict: "brandName" }
    )
    .select();

  const category = await supabase
    .from("Category")
    .upsert(
      {
        categoryName: result.data.categoryName,
      },
      { onConflict: "categoryName" }
    )
    .select();

  const { error } = await supabase
    .from("Product")
    .insert({
      productName: result.data.productName,
      productBrandId: brand.data![0].brandId,
      productCategoryId: category.data![0].categoryId,
      remainPackage: result.data.remainPackage,
      remainMiniPackage: result.data.remainMiniPackage,
    })
    .select();

  // console.log("new brand >>>", brand);
  // console.log("new category >>>", category);
  // console.log("new product >>>", product);

  if (error) {
    console.error(error);
    throw new Error("Product not Create");
  }

  window.location.href = "/";

  return { errors: {} };
}
