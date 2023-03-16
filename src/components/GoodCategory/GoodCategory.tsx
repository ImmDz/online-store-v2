import { FC } from "react";
import { Card } from "src/components";
import type { Category, Good } from "src/types/general";

interface GoodCategoryProps {
    category: Category;
    goods: Good[];
}

export const GoodCategory: FC<GoodCategoryProps> = ({ category, goods }) => {

    return (
        <section className="category">
            <h2>{category.label}</h2>
            <ul>
                {goods.map((good) => good.categoryTypeId === category.id && <li key={good.id}><Card good={good} /></li>)}
            </ul>
        </section>
    )
}