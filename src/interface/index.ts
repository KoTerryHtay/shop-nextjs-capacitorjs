// import type { Brand, Category, Product } from "@prisma/client";

export type BrandType = {
  brandId: number;
  brandName: string;
};

export type CategoryType = {
  categoryId: number;
  categoryName: string;
};

export type ProductType = {
  productId: number;
  productName: string;
  remainPackage: number;
  remainMiniPackage: number;
  productBrandId: number;
  productCategoryId: number;
};

export interface BrandCategoryInterface {
  status: string;
  data: {
    products: ProductType[];
    brand: BrandType[];
    category: CategoryType[];
  };
}

export interface ProductInterface {
  status: string;
  data: {
    product: ProductType;
  };
}

export interface getDescProductInterface {
  status: string;
  data: {
    products: ProductType[];
  };
}
