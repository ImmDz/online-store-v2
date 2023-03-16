import { FC } from "react";
import { Good } from "src/types/general";
import { Card as AntdCard } from "antd";

interface CardProps {
    good: Good;
}

export const Card: FC<CardProps> = ({ good }) => {

    return (
        <AntdCard>
            <p>{good.label}</p>
            <p>{good.description}</p>
            <p>{good.price}</p>
        </AntdCard>
    )
}