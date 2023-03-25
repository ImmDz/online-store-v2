import { FC } from "react";
import { Good } from "src/types/general";
import { Card as AntdCard, Image, Skeleton, Typography } from "antd";
import { Link } from "react-router-dom"
const { Text, Paragraph } = Typography;

interface CardProps {
    good: Good;
}

export const Card: FC<CardProps> = ({ good }) => {
    return (
        <AntdCard
            title={<Link to={`/product/${good.id}`}><h3>{good.label}</h3></Link>}
            cover={<Skeleton.Node
                active={true}
                style={{ width: "100%", height: "200px" }}>
                <Image preview={false} alt="product_img"
                    src={`https://source.unsplash.com/featured/300x200?product=${good.id}`}
                    style={{ width: "100%", objectFit: "scale-down" }} />
            </Skeleton.Node>}
            style={{ height: "450px", width: "300px" }}>
            <AntdCard.Meta
                title={
                    <Paragraph>
                        Price: ${good.price}{" "}
                        <Text delete type="danger">${+good.price * 1.5}.00</Text>
                    </Paragraph>}
                description={<Paragraph>{good.description}</Paragraph>} />
        </AntdCard>

    )
}