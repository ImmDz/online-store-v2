import type { RootStore } from "src/store/store";
import type { State } from "./slice";

export const getPopularGoods = (store: RootStore): State["goods"] =>
  store.popularCategories.goods;

export const getPopularCategory = (store: RootStore): State["category"] =>
  store.popularCategories.category;

export const getPopularLoadStatus = (store: RootStore): State["loadStatus"] =>
  store.popularCategories.loadStatus;
