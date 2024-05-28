"use client";

import { getAllProduct } from "@/actions";
import UpdatePackage from "@/components/update-package";
import { useQuery } from "@tanstack/react-query";

interface PropsType {
  categoryId: number;
  onCategoryId: (id: number) => void;
}

export default function CategoryDetail({
  categoryId,
  onCategoryId,
}: PropsType) {
  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProduct,
  });

  if (isLoading) return <div>Loading...</div>;

  const products = data?.filter(
    (product) => product.productCategoryId === categoryId
  );

  return (
    <div>
      <button
        onClick={() => onCategoryId(0)}
        className="text-white active:underline hover:underline pb-1"
      >
        Back
      </button>
      {!products?.length && <div className="text-white">Empty</div>}
      <div className="flex flex-col gap-2">
        {!products && <div className="text-white">Loading...</div>}
        {products?.map((product) => (
          <UpdatePackage
            key={product.productId}
            productId={product.productId}
          />
        ))}
      </div>
    </div>
  );
}
