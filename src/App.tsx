import { useEffect, useCallback } from "react";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { goodActions, popularActions, categoryActions } from "./store";
import { MainPage } from "./Pages";
import { Layout } from 'antd';
const { Header, Footer } = Layout;

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    categoryRequest();
    popularRequest();
    goodsRequest();
  }, [])
  const categoryRequest = useCallback(() => dispatch(categoryActions.serverRequest()), []);
  const popularRequest = useCallback(() => dispatch(popularActions.serverRequest()), []);
  const goodsRequest = useCallback(() => dispatch(goodActions.serverRequest()), []);

  return (
    <Layout>
      <Header>header</Header>
      <Layout className="container">
        <MainPage />
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}
