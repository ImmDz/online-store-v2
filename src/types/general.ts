export interface Category {
  id: string;
  type: string;
  label: string;
}

export interface Good {
  categoryTypeId: string;
  description: string;
  id: string;
  img: string;
  label: string;
  price: string;
}

export interface GoodInCart {
  good: Good;
  count: number;
  id: string;
}

export interface GoodsSearch {
  ids: string;
  categoryTypeIds: string;
  minPrice: number;
  maxPrice: number;
  text: string;
  limit: number;
  offset: number;
  sortBy: keyof Good;
  sortDirection: "asc" | "desc";
}

export interface PopularCategories {
  category: Category;
  items: Good[];
}

export interface User {
  login: string;
  password: string;
}
