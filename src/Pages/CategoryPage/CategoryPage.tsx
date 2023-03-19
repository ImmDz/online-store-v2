import { FC, useCallback, useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Spin } from "antd";
import { useParams } from "react-router";
import { getGoods, getGoodsLoadStatus, goodActions } from "src/store";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { Card } from "src/components";
import { GoodsSearch } from "src/types/general";
import { useNavigate, Link } from "react-router-dom";

export const CategoryPage: FC = () => {
    const dispatch = useAppDispatch();
    const goods = useSelector(getGoods);
    const { ids } = useParams();
    const [params] = useState<Partial<GoodsSearch>>({ categoryTypeIds: ids });
    const loadStatus = useSelector(getGoodsLoadStatus);
    const navigate = useNavigate();
    useEffect(() => {
        goodsRequest();
    }, [ids])

    const goodsRequest = useCallback(() => dispatch(goodActions.serverRequest(params)), []);

    if (loadStatus === "UNKNOWN" || loadStatus === "ERROR") {
        return <Content><p>Категория не найдена, вернуться <Link to="" onClick={() => navigate(-1)}>назад</Link></p></Content>
    }

    return (
        <Content>
            {loadStatus === "LOADING" ? <Spin tip="Загрузка"></Spin> : <ul>{goods?.map((good) => <li key={good.id}><Card good={good}></Card></li>)}</ul>}
        </Content>
    )
}