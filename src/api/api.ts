import {
  Category,
  Good,
  GoodInCart,
  GoodsSearch,
  PopularCategories,
} from "src/types/general";

interface User {
  login: string;
  password: string;
}

class Api {
  base_url = "http://localhost:3000/";
  get = <T>(url: string): Promise<T> => {
    const token = localStorage.getItem("token");
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(url, {
          ...(token && { headers: { Authorization: `Bearer ${token}` } }),
        })
          .then((data) => {
            if (data.ok) {
              return data.json();
            } else throw new Error("error");
          })
          .then(resolve);
      }, 1_500);
    });
  };

  post = (url: string, body: User) => {
    return fetch(new URL(url, this.base_url), {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("error");
      } else return res.json();
    });
  };

  put = async <T>(url: string, body: GoodInCart): Promise<T> => {
    let token = localStorage.getItem("token");
    return await fetch(new URL(url, this.base_url), {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      console.log(localStorage.getItem("token"));
      return res.json();
    });
  };

  getCategories = (
    ids?: GoodsSearch["ids"]
  ): Promise<{ categories: Category[] }> => {
    const url = new URL("/api/categories", this.base_url);
    if (ids) {
      const urlParams = new URLSearchParams();
      urlParams.append("ids", ids);
      url.search = urlParams.toString();
    }
    return this.get(url.toString());
  };

  getGoods = (
    params?: Partial<GoodsSearch>
  ): Promise<{ items: Good[]; total: number }> => {
    const url = new URL("/api/goods", this.base_url);
    if (params) {
      url.search = new URLSearchParams(
        params as Record<string, string>
      ).toString();
    }
    return this.get(url.toString());
  };

  getPopularCategories = (): Promise<PopularCategories[]> =>
    this.get("/api/popular_categories");

  getCart = (): Promise<GoodInCart[]> => this.get("/api/cart");

  addToCart = (good: GoodInCart): Promise<GoodInCart[]> => {
    return this.put("/api/cart", good);
  };

  login = (user: User): Promise<{ login: string; token: string }> => {
    return this.post("/api/login", user).then((res) => {
      localStorage.setItem("token", res.token);
      return res;
    });
  };
}

export const api = new Api();
