import { FC } from "react";
import { Link } from "react-router-dom";
import { Header as HeaderAntd } from "antd/es/layout/layout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Row, Col, Space } from "antd";
import { getCartGoods, getIsAuthValue } from "src/store";
import { useSelector } from "react-redux";

export const Header: FC = () => {
    const cartGoods = useSelector(getCartGoods);
    const isAuth = useSelector(getIsAuthValue);

    return (
        <HeaderAntd style={{ height: "100px" }}>
            <Row style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                <Col><h1><Link style={{ color: "#f7f4c6" }} to="/">Banana Store</Link></h1></Col>
                <Col span={16} style={{ display: "flex", alignItems: "center", gap: "30px", justifyContent: "flex-end" }}>
                    <Space size={"large"}>
                        <Col><Link to="/goods">Все товары</Link></Col>
                        <Col>{!isAuth ? <Link to="/login"><Button>Войти</Button></Link> : <Space size={"large"} style={{ display: "flex", alignItems: "center" }}><p style={{ color: "white" }}>{localStorage.getItem('login')}@mail.com</p><Button onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}>Выйти</Button></Space>}</Col>
                    </Space>
                </Col>
                <Col>
                    <Link to="/cart"><Badge count={cartGoods.map(good => good.count).reduce((acc, curr) => {
                        return acc + curr;
                    }, 0)}>
                        <ShoppingCartOutlined style={{ fontSize: "30px", color: "#f7f4c6" }} /></Badge>
                    </Link>
                </Col>
            </Row>
        </HeaderAntd>
    )
}