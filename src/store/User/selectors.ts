import type { RootStore } from "src/store/store";
import type { State } from "./slice";

export const getIsAuthValue = (store: RootStore): State["isAuth"] =>
  store.user.isAuth;
export const getUserLoadStatus = (store: RootStore): State["loadStatus"] =>
  store.user.loadStatus;
