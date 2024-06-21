import { useEffect, useState } from "react";
import Footer from "../home/foother";
import Nav from "../home/nav";
import GridComponent from "./gridComponent";
import axios from "axios";

export type productsModel = {
  image: string;
  name: string;
  regularPrice: string;
  discount: number;
  description: string;
  price: string;
  id: number;
}; 


export default function ProductsPage() {

// const gridItems: productsModel[] = [
//   {
//     id: 0,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 1,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 2,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 0,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 1,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 2,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 0,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 1,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 2,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 0,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 1,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
//   {
//     id: 2,
//     image: "product1.jpg",
//     name: "Product 1",
//     description: "Description for Product 1 goes here.",
//     price: "$19.99",
//     regularPrice: "19.99",
//     discount: 0,
//   },
// ];
  
  
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
        id: parseInt(data.id),
      }));
      setGridItems(gridItems);
      console.log(response.data.data);
    };
  
  const [gridItems, setGridItems] = useState<productsModel[]>([]);
  


  return (
    <>
      <Nav />
      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center gap-10">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Products
        </div>
        <GridComponent items={gridItems} />
      </div>
    </>
  );
}