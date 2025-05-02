import { useState } from "react";
import Banner2Card from "./Banner2Card";

function Banner2() {
    const [list1]=useState([{image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/474e6e58-1894-4378-86f1-168cc7266d1a.png",name:"Dairy&Bread"}
    ,{image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/54dd01e1-2781-4a45-bc3a-ed53ebab9bd9.png",name:"Atta&Rice"}
    ,{image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/8d4d3977-5197-49d9-9867-8a670524e48b.png",name:"Masala"}
    ,{image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/ab241d87-da5b-4830-b38f-1a6cd30d0d41.png",name:"breakfast"}
    ,{image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/47b3a34d-8f9f-42fe-97a0-4d8350748924.png",name:"Packged"}]);

  const[list2]=useState([{image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/031c2a24-d40f-4272-8c71-8a566252495e.png",name:"Zepto Coffe"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/92493ad5-6242-42f9-b951-dca41e55d744.png",name:"Tea coffe"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-334,pr-true,f-auto,q-80/cms/category/db346f5e-644f-426a-85af-92d707e086ac.png",name:"Ice cream"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/59d2c0cc-e776-407c-9142-7e69898d9eab.png",name:"Cold Drinks"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/9b88fff5-73f5-46fd-999f-1622db4203d7.png",name:"Biscuits"},
  ]);
   const[list3]=useState([{image:"https://cdn.zeptonow.com/production/tr:w-420,ar-486-333,pr-true,f-auto,q-80/cms/category/55a9c3a6-4960-4744-b472-0929b06e0a4a.png",name:"Makeup &Beauty"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/b1909dfd-726c-412b-beb7-9553bc909363.png",name:"Skincare"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/227b70d5-d1cf-428b-a276-1392c5067eb3.png",name:"BabyCare"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/227b70d5-d1cf-428b-a276-1392c5067eb3.png",name:"babyCare"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/e4fe52ef-96d9-4289-afb1-1c1ca7efd85b.png",name:"Bath"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/eb6fe22a-f8b8-4189-8d9a-deb32ff659c9.png",name:"Hair"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/20d9687b-58a4-4bf7-a561-99198b4d5ca1.png",name:"Jewllery"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/a4d7f18e-3a58-4c85-b912-f15f0be533ab.png",name:"Fragrances"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-304-464,pr-true,f-auto,q-80/cms/category/bc5f6b57-fa3a-4a71-b498-7b8cb83323f9.png",name:"Pharmacy"},
      {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/2b267097-f22b-4269-be34-1ea534ced3d4.png",name:"Feminine"},
   ]) 

   const[list4]=useState([{image:"https://cdn.zeptonow.com/production/tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/b322b3db-e75e-45e5-a11d-7ee37561c426.png",name:"Home needs"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/c42610fc-a94c-40f6-9e74-d30c4a1f5895.png",name:"Kitchen &Dinning"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-334,pr-true,f-auto,q-80/cms/category/acfa1279-d46b-408c-8f74-6fcd71bd89f9.png",name:"cleaning &Essentials"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/c084c75c-82ca-497f-857c-5069c6723194.png",name:"Electrical &Applinace"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-226-334,pr-true,f-auto,q-80/cms/category/8d4fb022-bae0-432d-92c8-2b12d97ee6cc.png",name:"toy &sports"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/b5cfc944-9611-4f08-b4f9-a071d07b1aad.png",name:"Stationary &Book"},
    {image:"https://cdn.zeptonow.com/production/tr:w-210,ar-225-333,pr-true,f-auto,q-80/cms/category/6d26710a-1dd8-4d53-9884-33bbaebc4bf4.png",name:"paan corner"}
   ])
  return (
    
    <div className="w-[85%] mx-auto my-4 p-4"> 
    <div >
    <p className="md:text-2xl  font-bold">Grocery &Kitchen</p>
    <div className="flex flex-wrap md:ml-10  gap-6">
          {list1.map((item) => (
            <Banner2Card key={item.name}  item={item} />
          ))}
        </div>
    </div>
    
    <div >
    <p className="md:text-2xl mt-5 font-bold">Snacks &Drinks</p>
    <div className="flex flex-wrap md:ml-10 gap-6">
          {list2.map((item) => (
            <Banner2Card key={item.name}  item={item}  />
          ))}
        </div>
    </div>
    
    <div >
    <p className="md:text-2xl mt-5  font-bold">Beauty & Personal Care</p>
    <div className="flex flex-wrap  md:ml-10 gap-6">
          {list3.map((item) => (
            <Banner2Card key={item.name}  item={item}  />
          ))}
        </div>
    </div> 
    <div >
    <p className="md:text-2xl   font-bold">Household Essentials</p>
    <div className="flex flex-wrap md:ml-10 gap-6">
          {list4.map((item) => (
            <Banner2Card key={item.name}  item={item}  />
          ))}
        </div>
    </div> 
    </div>
  )
}

export default Banner2;
