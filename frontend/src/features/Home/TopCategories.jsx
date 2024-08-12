import React from "react";
import { Link } from "react-router-dom";

// const items = [
//   {
//     id: 1,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/bb30587d1148b6ab628a61945f64bf88_1625164768.png?output-format=webp",
//     name: "McDonald's",
//   },
//   {
//     id: 2,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/6a11fd0f30c9fd9ceaff2f5b21f61d23_1617187857.png?output-format=webp",
//     name: "Burger King",
//   },
//   {
//     id: 3,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/1a985408ca7ad8fd097f2c47db9c5cb6_1611252699.png?output-format=webp",
//     name: "Domino's Pizza",
//   },
//   {
//     id: 4,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/466f8fc74274145f3b21795c3d21816d_1589433692.png?output-format=webp",
//     name: "KFC",
//   },
//   {
//     id: 5,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/22529ff52d41a4aa3b36ac1e7e0c0db3_1605099406.png?output-format=webp",
//     name: "Haldiram's",
//   },
//   {
//     id: 6,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/9302c59eca94abbee01aec9acf9305f6_1676471786.png?output-format=webp",
//     name: "Subway",
//   },
//   {
//     id: 7,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/1356425eff0c9acd8ab6b0ad351759e4_1611253489.png?output-format=webp",
//     name: "Bikanervala",
//   },
//   {
//     id: 8,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/05142cf68ce04384bb185659e1bfe450_1625160307.png?output-format=webp",
//     name: "La Pino'z Pizza",
//   },
//   {
//     id: 9,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/1cbe03ee1c6933e8fb2021cd835e889d_1624021602.png?output-format=webp",
//     name: "RollsKing",
//   },
//   {
//     id: 10,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/7fdbbe0f4f0aff0bb3775f3ac819ecb0_1638424082.png?output-format=webp",
//     name: "Biryani Blues",
//   },
//   {
//     id: 11,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/9742d760cf95e9dbf9b869ca9c753f8f_1613213827.png",
//     name: "Pizza Hut",
//   },
//   {
//     id: 12,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/c57f22bdf13844d8a566f26c5753ef5d_1611306689.png",
//     name: "Mahesh Pav Bhaji",
//   },
//   {
//     id: 13,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/8acd3229db5ca430a6be045a0fdb3724_1583389614.png",
//     name: "Trishiv Chinese Corner",
//   },
//   {
//     id: 14,
//     sorc: "https://b.zmtcdn.com/data/brand_creatives/logos/a4ae81b582113bae13b46a75a4e85c20_1617972894.png",
//     name: "Bismillah",
//   },
// ];

const TopCategories = ({ items }) => {
  return (
    <div className="w-full py-10 my-10 ">
      <div className="w-full">
        <div className="flex  font-bold text-xl md:text-3xl justify-center md:justify-normal">Top Categories for you</div>
        <div className="flex min-w-full p-5 pt-8 h-fit my-2 gap-4 justify-evenly flex-wrap md:flex-nowrap md:justify-normal md:gap-10 scro md:overflow-x-scroll">
          {items?.map((el, i) => (
            <Link to={`/category/${el.value}`} key={i} >
              <div
                className={`aspect-1 w-20 md:w-36 h-fit flex flex-col justify-center items-center hover:scale-105 `}
              >
                <img
                  src={el.image}
                  className=" h-full border bg-black border-black rounded-full object-cover "
                />
                <p className=" lg:text-lg text-sm p-2 font-semibold text-center ">
                  {el?.value}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
