import { FC, useCallback, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Spin, Skeleton, Button, message } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getGoods, getGoodsLoadStatus, goodActions, cartActions, getCartGoods } from "src/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { api } from "src/api/api";

export const ProductPage: FC = () => {
    const loadStatus = useSelector(getGoodsLoadStatus);
    const navigate = useNavigate();
    const { ids } = useParams();
    const dispatch = useAppDispatch();
    const goods = useSelector(getGoods);
    const cartGoods = useSelector(getCartGoods);
    const [count, setCount] = useState<number>(1);
    useEffect(() => {
        getGood();
    }, [ids]);

    const getCart = () => dispatch(cartActions.serverRequest());
    const getGood = useCallback(() => dispatch(goodActions.serverRequest({ ids })), []);
    const countGoodsInCart = cartGoods.find(good => good.id === ids)?.count ?? 0;
    const addToCarts = () => {
        count > 0 && api.addToCart(
            {
                good: { ...goods[0], price: String(+goods[0].price * count) },
                count: countGoodsInCart + count, id: goods[0].id
            }).then(getCart);
    }

    if (loadStatus === "ERROR" || loadStatus === "UNKNOWN") {
        return (
            <Content style={{ maxWidth: "1400px" }}>
                <p>Продукт не найден, <Link to="" onClick={() => navigate(-1)}>вернуться назад</Link></p>
            </Content>
        )
    }
    return (
        <Content style={{ maxWidth: "1200px" }}>
            <div className="product" style={{ display: "flex", alignItems: "flex-start" }}>
                <Skeleton.Node style={{ width: "400px", height: "600px" }} active={true}>
                    <img src="https://source.unsplash.com/featured/400x600?product" alt="product image" />
                </Skeleton.Node>
                {loadStatus === "LOADING" ? <Spin style={{ color: "#f7f4c6" }}></Spin> :
                    <div className="info">
                        <h3>{goods[0].label}</h3>
                        <p>{goods[0].description}</p>
                        <p>{goods[0].price}$</p>
                        <Button onClick={() => {
                            if (localStorage.getItem('token')) {
                                addToCarts();
                                setCount(1);
                                message.open({
                                    type: "success",
                                    content: "Продукт добавлен в корзину"
                                });
                            } else {
                                message.open({ type: "error", content: "Только для зарегистрированных пользователей" });
                            }
                        }} icon={<ShoppingCartOutlined />} size="large">Добавить в корзину</Button>
                        <p>Количество: {count}</p>
                        <Button onClick={() => setCount(count > 1 ? count - 1 : count)}>-</Button>
                        <Button onClick={() => setCount(count + 1)}>+</Button>
                    </div>}
            </div>
        </Content>
    )
}