"use client";

export const revalidate = 0;

import * as actions from "@/actions";
import UpdatePackage from "@/components/update-package";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { isLoading, data: products } = useQuery({
    queryKey: ["allProducts"],
    queryFn: actions.getAllProduct,
  });

  // console.log(products);

  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  const searchProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <div className="text-white font-semibold py-1">Home</div>
      <div className="flex flex-col gap-2">
        {!products?.length && <div className="text-white">Empty</div>}
        {!search?.length &&
          products?.map((product) => (
            <UpdatePackage
              key={product.productId}
              productId={product.productId}
            />
          ))}
        {!!search?.length &&
          searchProducts?.map((product) => (
            <UpdatePackage
              key={product.productId}
              productId={product.productId}
            />
          ))}
      </div>
    </div>
  );
}
