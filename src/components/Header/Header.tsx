import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header as HeaderAntd } from "antd/es/layout/layout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import { getCartGoods, getIsAuthValue } from "src/store";
import { useSelector } from "react-redux";

export const Header: FC = () => {
    const cartGoods = useSelector(getCartGoods);
    const isAuth = useSelector(getIsAuthValue);

    return (
        <HeaderAntd style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1><Link style={{ color: "#f7f4c6" }} to="/">Banana Store</Link></h1>
            <Link to="/goods">Все товары</Link>
            {!isAuth ? <Link to="/login">Войти</Link> : <span style={{ display: "flex", alignItems: "center" }}><p>{localStorage.getItem('login')}@mail.com</p><Button onClick={() => {
                localStorage.clear();
                window.location.reload();
            }}>Выйти</Button></span>}
            <Link to="/cart"><Badge count={cartGoods.map(good => good.count).reduce((acc, curr) => {
                return acc + curr;
            }, 0)}>
                <ShoppingCartOutlined style={{ fontSize: "30px", color: "#f7f4c6" }} /></Badge>
            </Link>
        </HeaderAntd>
    )
}