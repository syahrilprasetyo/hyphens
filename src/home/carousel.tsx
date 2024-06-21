import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ImageCarrousel1 from "../img/Main_Banner.jpg";
import ImageCarrousel2 from "../img/Main_Banner2.jpg";
import ImageCarrousel3 from "../img/Main_Banner3.jpg";

export default function CarouselHome() {
  return (
    <>
      <div className="flex justify-center content-center">
        <Carousel
          showArrows={false}
          infiniteLoop={true}
          autoPlay={true}
          transitionTime={500}
          showThumbs={false}
          className="bg-black w-[1120px] mt-12 rounded-xl relative">
          <div className="relative flex items-center justify-center h-[30rem]">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={ImageCarrousel1}
              alt="Image Alt Text"
            />
            {/* <div className="absolute text-white flex  w-full p-8">
              <div className="h-full w-96 text-start">
                <h2 className="text-2xl mb-0 mix-blend-exclusion">
                  Hero Slide 1
                </h2>
                <p className="text-blue-400 text-2xl font-bold">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Numquam labore blanditiis qui eum nobis porro magnam
                  accusantium facilis ab iure sequi vel soluta, reprehenderit
                  debitis minus veniam? Facilis, illum repellendus!
                </p>
                <button className="bg-blue-500  text-white border-none px-4 py-2  cursor-pointer">
                  Learn More
                </button>
              </div>
            </div> */}
          </div>
          <div className="relative flex items-center justify-center h-[30rem]">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={ImageCarrousel2}
              alt="Image Alt Text"
            />
            <div className="absolute text-white flex  w-full p-8">
              <div className="h-full w-96 text-start flex flex-col gap-4">
                <h2 className="mb-0 text-5xl font-bold">Vitamin</h2>
                <p className="  text-2xl  font-bold">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Numquam labore blanditiis qui eum nobis porro magnam
                  accusantium facilis ab iure sequi vel soluta, reprehenderit
                  debitis minus veniam? Facilis, illum repellendus!
                </p>
                <button className="bg-blue-500 text-white border-none px-4 py-2  cursor-pointer rounded-3xl">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center h-[30rem]">
            <img
              className="w-full h-full rounded-xl object-cover"
              src={ImageCarrousel3}
              alt="Image Alt Text"
            />
            <div className="absolute text-white flex  w-full p-8">
              <div className="h-full w-96 text-start flex flex-col gap-4">
                <h2 className="mb-0 text-5xl font-bold">Vitamin</h2>
                <p className="  text-2xl  font-bold">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Numquam labore blanditiis qui eum nobis porro magnam
                  accusantium facilis ab iure sequi vel soluta, reprehenderit
                  debitis minus veniam? Facilis, illum repellendus!
                </p>
                <button className="bg-blue-500 text-white border-none px-4 py-2  cursor-pointer rounded-3xl">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
}
