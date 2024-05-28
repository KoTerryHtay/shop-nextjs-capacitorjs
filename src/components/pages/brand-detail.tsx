"use client";

import { getAllProduct } from "@/actions";
import UpdatePackage from "@/components/update-package";
import { ProductType } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface PropsType {
  brandId: number;
  onBrandId: (id: number) => void;
}

export default function BrandDetail({ brandId, onBrandId }: PropsType) {
  // const [product1, setProduct1] = useState<ProductType[]>();

  // useEffect(() => {
  //   getAllProduct().then((data) => {
  //     setProduct1(data!);
  //     console.log("getAllProduct >>>", data);
  //   });
  // }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProduct,
  });

  if (isLoading) return <div>Loading...</div>;

  const products = data?.filter(
    (product) => product.productBrandId === brandId
  );

  return (
    <div>
      <button
        onClick={() => onBrandId(0)}
        className="text-white active:underline hover:underline pb-1"
      >
        Back
      </button>
      {!products?.length && <div className="text-white">Empty</div>}
      <div className="flex flex-col gap-2">
        {products?.map((product) => (
          <UpdatePackage
            // product1={product}
            productId={product.productId}
            key={product.productId}
          />
        ))}
      </div>
    </div>
  );
}
