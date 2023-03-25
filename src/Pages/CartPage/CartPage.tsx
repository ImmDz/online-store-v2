import { FC, useEffect } from "react";
import { Content } from "antd/es/layout/layout";
import { cartActions, getCartGoods } from "src/store";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { List, Descriptions, Card, Button } from "antd";

export const CartPage: FC = () => {
    const dispatch = useAppDispatch();
    const cartGoods = useSelector(getCartGoods);
    useEffect(() => {
        dispatch(cartActions.serverRequest());
    }, []);
    const totalPrice = cartGoods.map(good => good.good.price).reduce((acc, curr) => {
        return Number(acc) + Number(curr);
    }, 0);
    const totalCount = cartGoods.map(good => good.count).reduce((acc, curr) => {
        return acc + curr;
    }, 0);
    return (
        <Content style={{ maxWidth: "1400px" }}>
            <div className="cart" style={{ display: "flex", gap: "50px", alignItems: "flex-start" }}>
                <List style={{ width: "100%", backgroundColor: "white", borderRadius: "5px" }} size="small" itemLayout="vertical" dataSource={cartGoods} renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        extra={
                            <img
                                width={100}
                                alt="product_img"
                                src={item.good.img}
                            />
                        }
                    >
                        <Descriptions>
                            <Descriptions.Item>{item.good.label}</Descriptions.Item>
                            <Descriptions.Item>{item.good.description}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions>
                            <Descriptions.Item label="Цена">{item.good.price}$</Descriptions.Item>
                            <Descriptions.Item label="Количество">{item.count}</Descriptions.Item>
                        </Descriptions>
                    </List.Item>
                )}>
                </List>
                <Card style={{ width: "300px" }}>
                    <p>Итого: ${totalPrice}</p>
                    <p>Всего товаров: {totalCount}</p>
                    <Button style={{ width: "100%", backgroundColor: "#f7f4c6" }}>Купить</Button>
                </Card>

            </div>
        </Content>
    )
}