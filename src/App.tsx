import { Routes, Route, Link } from 'react-router-dom';
import { MainPage, CategoryPage, ProductPage } from "./Pages";
import { Layout } from 'antd';
const { Header, Footer } = Layout;

export const App = () => {
  return (
    <Layout>
      <Header><Link to="/">header</Link></Header>
      <Layout className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/category/:ids" element={<CategoryPage />} />
          <Route path="/product/:ids" element={<ProductPage />}></Route>
        </Routes>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}
