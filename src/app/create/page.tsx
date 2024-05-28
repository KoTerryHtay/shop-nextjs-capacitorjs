"use client";

import FormButton from "@/components/form-button";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "@/actions/get-all-category";
import { getAllBrands } from "@/actions/get-all-brands";

export default function CreatePage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: actions.getAllProduct,
  });

  const { data: category } = useQuery({
    queryKey: ["allCategory"],
    queryFn: getAllCategory,
  });
  const { data: brands } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const existingBrand = brands?.find((brand) => brand.brandName === brandName);

  const existingCategory = category?.find(
    (category) => category.categoryName === categoryName
  );

  const existingProduct = products?.find(
    (product) => product.productName === productName
  );

  const isExit = !!existingProduct && !!existingBrand && !!existingCategory;

  const [formState, createAction] = useFormState(actions.CreateProduct, {
    errors: {},
  });

  const [formStateUpdate, updateAction] = useFormState(
    actions.updatePackage.bind(null, existingProduct?.productId!),
    {
      errors: {},
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="text-[#EEEEEE]">
      <div className="flex items-center justify-between">
        <div className="text-center">CreatePage</div>
      </div>
      <Divider className="bg-[#EEEEEE] my-1" />
      <form
        action={isExit ? updateAction : createAction}
        className="flex flex-col gap-2"
      >
        <div>
          <label htmlFor="productName">Product Name</label>
          <Input
            id="productName"
            name="productName"
            placeholder="Product Name"
            className="w-auto"
            list="browsers"
            onChange={(e) => setProductName(e.target.value)}
          />
          <datalist id="browsers">
            {products?.map((product) => (
              <option
                key={product.productId}
                value={product.productName}
              ></option>
            ))}
          </datalist>
        </div>
        <div>
          <div>Brand Name</div>
          <Autocomplete
            variant="flat"
            aria-label="brand"
            defaultItems={brands || []}
            placeholder="Brand Name"
            allowsCustomValue
            name="brandName"
            onInputChange={(value) => setBrandName(value)}
          >
            {(brand) => (
              <AutocompleteItem key={brand.brandId}>
                {brand.brandName}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div>
          <div>Category Name</div>
          <Autocomplete
            variant="flat"
            aria-label="category"
            defaultItems={category || []}
            placeholder="Category Name"
            allowsCustomValue
            onInputChange={(value) => setCategoryName(value)}
            name="categoryName"
          >
            {(category) => (
              <AutocompleteItem key={category.categoryId}>
                {category.categoryName}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="space-y-1">
          <label htmlFor="remainPackage" className="space-x-1">
            <span>Remain Package</span>
            {!!isExit && (
              <span className=" bg-[#222831] p-0.5 px-2 rounded border border-white text-xs">
                လက်ကျန် : {existingProduct.remainPackage}
                {existingProduct.remainMiniPackage !== 0 && (
                  <span className="px-1">
                    / {existingProduct.remainMiniPackage} ထုတ်
                  </span>
                )}
              </span>
            )}
          </label>
          <div className="flex gap-1">
            <Input
              id="remainPackage"
              name="remainPackage"
              placeholder="Remain Package"
            />
            <Input
              id="remainMiniPackage"
              name="remainMiniPackage"
              placeholder="အထုတ်"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <FormButton>{isExit ? "Update" : "Create"}</FormButton>
        </div>
      </form>
    </div>
  );
}
