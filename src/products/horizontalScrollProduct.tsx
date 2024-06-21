import React from "react";

import ProductCard from "./productCard";

type ProductProps = {
  items: {
    name: string
    image: string;
    description: string;
    price: string;
    id: number;
    discount: number;
  }[];
};

function HorizontalScrollProduct(props: ProductProps) {
  const { items } = props;

  return (
    <>
      <div className="flex justify-center content-center">
        <div className="flex p-6 gap-4  w-[1120px] flex-row overflow-auto whitespace-nowrap ">
          {/* Map through items and render each item */}
          {items.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HorizontalScrollProduct;
