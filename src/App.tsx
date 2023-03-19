import { Routes, Route, Link } from 'react-router-dom';
import { MainPage, CategoryPage } from "./Pages";
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
        </Routes>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
}
