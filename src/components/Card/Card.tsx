import { FC } from "react";
import { Good } from "src/types/general";
import { Card as AntdCard } from "antd";

interface CardProps {
    good: Good;
}

export const Card: FC<CardProps> = ({ good }) => {

    return (
        <AntdCard>
            <h3>{good.label}</h3>
            <p>{good.description}</p>
            <p>{good.price}$</p>
        </AntdCard>
    )
}