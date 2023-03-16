import { FC } from "react";
import { GoodCategory, Menu } from "src/components";
import { getPopularCategories, getPopularLoadStatus } from "src/store";
import { Layout, Image, Skeleton, Spin } from "antd";
import { useSelector } from "react-redux";
const { Content, Sider } = Layout;

export const MainPage: FC = () => {
    const popularCategories = useSelector(getPopularCategories);
    const loadStatus = useSelector(getPopularLoadStatus);
    return (
        <>
            <Sider theme="light">
                <Menu />
            </Sider>
            <Content>
                <div className="banner">
                    <Skeleton.Node active={true}>
                        <Image preview={false} src="https://source.unsplash.com/featured/1320x488?store" alt="banner-image" />
                    </Skeleton.Node>
                </div>
                {loadStatus === "LOADING" ? <div className="loading"><Spin tip={loadStatus} /></div> :
                    popularCategories.map((category) => <GoodCategory key={category.category.id} category={category.category} goods={category.items} />)}
            </Content>
        </>
    )
}