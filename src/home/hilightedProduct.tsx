import React, { useEffect, useState } from "react";
import { productsModel } from "../products/productPage";
import HorizontalScrollProduct from "../products/horizontalScrollProduct";
import axios from "axios";

export default function Hilightedproducts() {
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
      const response = await axios.post("http://localhost:8000/Product/List");
      const gridItems = response.data.data.products.map((data: any) => ({
        name: data.name,
        image: data.image,
        price: data.finalPrice,
        regularPrice: data.regularPrice,
        discount: data.discount,
        id: parseInt(data.id)
      }));
    setGridItems(gridItems);
    console.log(response.data.data);
  };

  

  const [gridItems, setGridItems] = useState<productsModel[]>([]);

  


  return <HorizontalScrollProduct items={gridItems}  />;
}
