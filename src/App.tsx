import { Routes, Route } from 'react-router-dom';
import { MainPage, CategoryPage, ProductPage, CartPage, GoodsPage } from "./Pages";
import { Header } from "src/components";
import { Layout } from 'antd';
const { Footer } = Layout;

export const App = () => {
  return (
    <Layout>
      <Header></Header>
      <Layout className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:ids" element={<CategoryPage />} />
          <Route path="/product/:ids" element={<ProductPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/goods" element={<GoodsPage />}></Route>
        </Routes>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}
