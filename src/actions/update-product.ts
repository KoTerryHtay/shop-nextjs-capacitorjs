import supabase from "@/supabase";
import { z } from "zod";

const updatePackageSchema = z.object({
  package: z.number(),
  miniPackage: z.number(),
});

export interface updatePackageFormState {
  errors: {
    package?: string[];
    miniPackage?: string[];
  };
}

export async function updatePackage(
  id: number,
  formState: updatePackageFormState,
  formData: FormData
): Promise<updatePackageFormState> {
  const result = updatePackageSchema.safeParse({
    package: parseInt(formData.get("remainPackage")?.toString()!),
    miniPackage: parseInt(formData.get("remainMiniPackage")?.toString()!),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase
    .from("Product")
    .update({
      remainPackage: result.data.package,
      remainMiniPackage: result.data.miniPackage,
    })
    .eq("productId", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Product not update");
  }

  // console.log("update >>>", id, result.data.package);
  // await Browser.open({ url: "/brand" });
  window.location.href = "/";

  return {
    errors: {},
  };
}
