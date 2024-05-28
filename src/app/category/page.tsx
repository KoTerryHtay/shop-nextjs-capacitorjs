"use client";

import { deleteCategory } from "@/actions/delete-category";
import { getAllCategory } from "@/actions/get-all-category";
import Lists from "@/components/lists";
import CategoryDetail from "@/components/pages/category-detail";
import { useAppBack } from "@/hooks/useAppBack";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function CategoryPage() {
  const [categoryId, setCategoryId] = useState<number>(0);

  const allCategory = getAllCategory();

  const { data, isLoading } = useQuery({
    queryKey: ["allCategory"],
    queryFn: getAllCategory,
  });

  useAppBack(categoryId, setCategoryId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {!data?.length && <div className="text-white">Empty</div>}

      {!categoryId && (
        <div className="text-white font-semibold py-1">Category Page</div>
      )}

      <div className="flex flex-col gap-2">
        <>
          {!categoryId &&
            data?.map((category) => (
              <Lists
                key={category.categoryId}
                id={category.categoryId}
                name={category.categoryName}
                total={category.Product.length}
                deleteList={deleteCategory}
                setId={setCategoryId}
              />
            ))}
          {!!categoryId && (
            <CategoryDetail
              categoryId={categoryId}
              onCategoryId={setCategoryId}
            />
          )}
        </>
      </div>
    </div>
  );
}
