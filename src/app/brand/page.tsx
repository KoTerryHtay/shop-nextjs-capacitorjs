"use client";

import Lists from "@/components/lists";
import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "@/actions/get-all-brands";
import { deleteBrand } from "@/actions/delete-brand";
import { useState } from "react";
import BrandDetail from "@/components/pages/brand-detail";
import { useAppBack } from "@/hooks/useAppBack";

export default function BrandPage() {
  const [brandId, setBrandId] = useState<number>(0);

  const { data, isLoading } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  useAppBack(brandId, setBrandId);

  // console.log("brandId >>>", brandId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {!data?.length && <div className="text-white">Empty</div>}
      {!brandId && (
        <div className="text-white font-semibold py-1">Brand Page</div>
      )}
      <div className="flex flex-col gap-2">
        <>
          {!brandId &&
            data?.map((brand) => (
              <Lists
                key={brand.brandId}
                id={brand.brandId}
                name={brand.brandName}
                total={brand.Product.length}
                deleteList={deleteBrand}
                setId={setBrandId}
              />
            ))}
          {!!brandId && (
            <BrandDetail brandId={brandId} onBrandId={setBrandId} />
          )}
        </>
      </div>
    </div>
  );
}
