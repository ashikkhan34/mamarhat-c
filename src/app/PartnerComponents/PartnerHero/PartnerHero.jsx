import Image from "next/image";
import React from "react";

export default function PartnerHero() {
  const steps = [
    {
      title: "Customer Choice",
      text: "The customer chooses a nearby restaurant or shop and inputs a delivery address via the app or website.",
      img: "/partnerImage/4.png",
    },
    {
      title: "Prepare Food",
      text: "The restaurant or store sees the order that Mamarhat provides to the food-makers; they immediately begin preparing the order.",
      img: "/partnerImage/6.png",
    },
    {
      title: "To Deliver",
      text: "Our Hero (rider) will pick your tasty food and deliver toward our sweet customers.",
      img: "/partnerImage/7.png",
    },
    {
      title: "Earn with us",
      text: "Each month Mamarhat sends you money earned from your ordered items plus full performance data.",
      img: "/partnerImage/8.png",
    },
  ];
  return (
    <div>
      <div>
        <Image
          width={400}
          height={400}
          src="/partnerImage/hero.png"
          className="w-full h-[500px] object-cover "
        />
      </div>

      <div className="py-16 bg-[#e8f2e4] container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
          {steps.map((item, index) => (
            <div
              key={index}
              className="p-6 text-center transition relative"
            >
              <div className="w-36 h-36 mx-auto mb-4 ">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>

              <div
                className="relative w-full h-64 bg-cover bg-center -mt-20"
                style={{ backgroundImage: `url('/partnerImage/5.png')` }}
              >
                <div className="absolute inset-0 bg-opacity-20 flex flex-col justify-center items-center p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-700">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
