import { FC, useEffect, useCallback, useState } from "react";
import { GoodCategory, Menu } from "src/components";
import { getPopularCategories, getPopularLoadStatus, goodActions, popularActions, categoryActions, getGoods } from "src/store";
import { Layout, Image, Skeleton, Spin } from "antd";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { GoodsSearch } from "src/types/general";
const { Content, Sider } = Layout;

export const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    const popularCategories = useSelector(getPopularCategories);
    const loadStatus = useSelector(getPopularLoadStatus);
    const goods = useSelector(getGoods);
    const [params, setParams] = useState<Partial<GoodsSearch>>({ offset: 5, limit: 5 })
    useEffect(() => {
        categoryRequest();
        popularRequest();
        // goodsRequest();
    }, [])
    const categoryRequest = useCallback(() => dispatch(categoryActions.serverRequest()), []);
    const popularRequest = useCallback(() => dispatch(popularActions.serverRequest()), []);
    const goodsRequest = useCallback(() => dispatch(goodActions.serverRequest()), []);
    return (
        <>
            <Sider theme="light">
                <Menu />
            </Sider>
            <Content style={{ maxWidth: "1400px" }}>
                <div className="banner">
                    <Skeleton.Node active={true}>
                        <Image preview={false} src="https://source.unsplash.com/featured/1320x488?store" alt="banner-image" />
                    </Skeleton.Node>
                </div>
                {loadStatus === "LOADING" ? <div className="loading"><Spin tip={loadStatus} /></div> :
                    <ul className="popularCategories">
                        {popularCategories.map((category) => <li key={category.category.id}><GoodCategory label={category.category.label} goods={category.items} /></li>)}
                    </ul>
                }
            </Content>
        </>
    )
}