import { FC } from "react";
import { Good } from "src/types/general";
import { Card as AntdCard } from "antd";
import { Link } from "react-router-dom"

interface CardProps {
    good: Good;
}

export const Card: FC<CardProps> = ({ good }) => {

    return (

        <Link to={`/product/${good.id}`}>
            <AntdCard>
                <h3>{good.label}</h3>
                <p>{good.description}</p>
                <p>{good.price}$</p>
            </AntdCard>
        </Link>
    )
}