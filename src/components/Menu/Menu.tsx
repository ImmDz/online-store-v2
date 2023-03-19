import { FC } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "src/store";
import { Menu as AntdMenu } from "antd";
import { Link } from "react-router-dom";

export const Menu: FC = () => {
    const categories = useSelector(getCategories);
    return (
        <AntdMenu >
            {categories.map((category) =>
                <AntdMenu.Item key={category.id}>
                    <Link to={`/category/${category.id}`}>{category.label}</Link>
                </AntdMenu.Item>)}
        </AntdMenu>

    )
}