import React from "react";
import Nav from "../home/nav";
import CarouselHome from "../home/carousel";
import SectionAchievement from "./sectionAchievement";
import image2 from "../img/image4.jpg";
import Hilightedproducts from "./hilightedProduct";
import Footer from "./foother";

export default function Home() {
  return (
    <>
      <div className="-z-10 fixed h-full mt-14 w-full bg-cover bg-blue-100"></div>
      <Nav />
      <div className="h-16"></div>
      <CarouselHome />
      {/* <SectionAchievement /> */}
      <Hilightedproducts />
      <div className="bg-gradient-to-t from-white via-transparent w-full h-28"></div>
      <div className="bg-white h-56 "></div>

      <Footer />
    </>
  );
}
