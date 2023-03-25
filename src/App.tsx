import { Routes, Route, Link } from 'react-router-dom';
import { MainPage, CategoryPage, ProductPage, CartPage } from "./Pages";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Header } from "src/components";
import { Layout, Badge } from 'antd';
const { Footer } = Layout;

export const App = () => {
  return (
    <Layout>
      {/* <Header>
        <Link to="/">Online Store</Link>
        <Link to="/cart"><Badge count={5}><ShoppingCartOutlined size={55} /></Badge>Cart</Link>
      </Header> */}
      <Header></Header>
      <Layout className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:ids" element={<CategoryPage />} />
          <Route path="/product/:ids" element={<ProductPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
        </Routes>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}
