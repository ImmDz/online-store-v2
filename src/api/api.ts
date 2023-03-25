import {
  Category,
  Good,
  GoodInCart,
  GoodsSearch,
  PopularCategories,
} from "src/types/general";

const base_url = "http://localhost:3000/";

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

export const getCategories = (
  ids?: GoodsSearch["ids"]
): Promise<{ categories: Category[] }> => {
  const url = new URL("/api/categories", base_url);
  if (ids) {
    const urlParams = new URLSearchParams();
    urlParams.append("ids", ids);
    url.search = urlParams.toString();
  }
  return get(url.toString());
};

export const getGoods = (
  params?: Partial<GoodsSearch>
): Promise<{ items: Good[]; total: number }> => {
  const url = new URL("/api/goods", base_url);
  if (params) {
    url.search = new URLSearchParams(
      params as Record<string, string>
    ).toString();
  }
  return get(url.toString());
};

export const getPopularCategories = (): Promise<PopularCategories[]> =>
  get("/api/popular_categories");

export const getCart = (): Promise<GoodInCart[]> => get("/api/cart");

const post = async (url: string, body: GoodInCart): Promise<GoodInCart[]> => {
  return await fetch(new URL(url, base_url), {
    method: "PUT",
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const addToCart = (good: GoodInCart): Promise<GoodInCart[]> => {
  return post("/api/cart", good);
};
