import { FC } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "src/store";
import { Menu as AntdMenu } from "antd";

export const Menu: FC = () => {
    const categories = useSelector(getCategories);
    return (
        <AntdMenu>
            {categories.map((category) => <AntdMenu.Item key={category.id}>{category.label}</AntdMenu.Item>)}
        </AntdMenu>
    )
}