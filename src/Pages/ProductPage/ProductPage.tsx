import { FC, useCallback, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Spin, Skeleton, Button } from "antd";
import { GoodsSearch, Good } from "src/types/general";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getGoods, getGoodsLoadStatus, goodActions } from "src/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "src/hooks/useAppDispatch";

export const ProductPage: FC = () => {
    const loadStatus = useSelector(getGoodsLoadStatus);
    const navigate = useNavigate();
    const { ids } = useParams();
    const dispatch = useAppDispatch();
    const goods = useSelector(getGoods);
    const [params, setParams] = useState<Partial<GoodsSearch>>({ ids: ids });
    const [good, setGood] = useState<Good | null>(null);
    useEffect(() => {
        getGood();
    }, []);
    useEffect(() => {
        setGood(goods[0]);
    }, [goods]);

    const getGood = useCallback(() => dispatch(goodActions.serverRequest(params)), []);
    if (loadStatus === "ERROR" || loadStatus === "UNKNOWN") {
        return (
            <Content>
                <p>Продукт не найден, <Link to="" onClick={() => navigate(-1)}>вернуться назад</Link></p>
            </Content>
        )
    }
    return (
        <Content>
            <div className="product" style={{ display: "flex", alignItems: "flex-start" }}>
                <Skeleton.Node style={{ width: "400px", height: "600px" }} active={true}>
                    <img src="https://source.unsplash.com/featured/400x600?product" alt="product image" />
                </Skeleton.Node>
                {loadStatus === "LOADING" ? <Spin tip="Загрузка"></Spin> :
                    <div className="info">
                        <h3>{good?.label}</h3>
                        <p>{good?.description}</p>
                        <p>{good?.price}$</p>
                        <Button icon={<ShoppingCartOutlined />} size="large">Добавить в корзину</Button>
                    </div>}
            </div>
        </Content>
    )
}