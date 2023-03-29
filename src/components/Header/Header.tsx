import { FC } from "react";
import { Link } from "react-router-dom";
import { Header as HeaderAntd } from "antd/es/layout/layout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { getCartGoods } from "src/store";
import { useSelector } from "react-redux";

export const Header: FC = () => {
    const cartGoods = useSelector(getCartGoods);
    return (
        <HeaderAntd style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1><Link style={{ color: "#f7f4c6" }} to="/">Banana Store</Link></h1>
            <Link to="/goods">Все товары</Link>
            <Link to="/cart"><Badge count={cartGoods.map(good => good.count).reduce((acc, curr) => {
                return acc + curr;
            }, 0)}>
                <ShoppingCartOutlined style={{ fontSize: "30px", color: "#f7f4c6" }} /></Badge>
            </Link>
        </HeaderAntd>
    )
}