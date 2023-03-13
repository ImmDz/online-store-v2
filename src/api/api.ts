import { Category, Good, GoodInCart } from "types/general";

const get = <T>(url: string): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch(url)
        .then((data) => {
          if (data.ok) {
            return data.json();
          } else throw new Error("error");
        })
        .then(resolve);
    }, 1_500);
  });
};

export const getCategories = (): Promise<{ categories: Category[] }> =>
  get("/api/categories");

export const getGoods = (): Promise<{ items: Good[]; total: number }> =>
  get("/api/goods");

export const getPopularCategories = (): Promise<{
  category: Category;
  items: Good[];
}> => get("/api/popular_categories");

export const getCart = (): Promise<GoodInCart[]> => get("/api/cart");
