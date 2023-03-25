import { FC } from "react";
import { Card } from "src/components";
import type { Good } from "src/types/general";
import { List } from "antd";

interface GoodCategoryProps {
    label: string;
    goods: Good[];
}

export const GoodCategory: FC<GoodCategoryProps> = ({ label, goods }) => {
    return (
        <section className="category">
            <h2 style={{ textAlign: "center" }}>{label}</h2>
            <List
                grid={{
                    gutter: 10,
                }}
                dataSource={goods}
                pagination={{ align: "center", pageSize: 4 }}
                renderItem={(good) => (
                    <List.Item>
                        <Card good={good} />
                    </List.Item>
                )}>
            </List>
        </section>
    )
}