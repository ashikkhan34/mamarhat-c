import Image from "next/image";
import React from "react";

export default function PartnerAbout() {
  return (
    <div className="container mx-auto px-6 ">
      <div className="flex flex-col lg:flex-row  gap-8">
       
        <div className=" flex flex-col md:w-[500px] pt-12 ">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center justify-center">
            <div className="w-20 h-20 mb-4 p-3 flex text-center justify-center">
              <Image
                src="/partnerImage/2.png"
                alt="Customer Choice Icon"
                width={80}
                height={80}
                className="object-contain justify-center"
              />
            </div>
            <h3 className="text-xl font-extrabold text-center text-gray-800 mb-2">
              Customer Choice
            </h3>
            <p className="text-sm text-gray-600 max-w-sm lg:max-w-full">
              You will have an extra source of income with Mamahat. Our clients
              are always looking for the newest, hippest eateries in their area.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center ">
            <div className="w-20 h-20 mb-4 p-3 flex items-center justify-center">
              <Image
                src="/partnerImage/1.png"
                alt="Dedicated Support Icon"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-2">
              Dedicated Support
            </h3>
            <p className="text-sm text-gray-600 max-w-sm lg:max-w-full">
              We will help you at every stage, from improving your delivery menu
              and generating weekly reports to improving your performance.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-4 p-3 flex items-center justify-center">
              <Image
                src="/partnerImage/3.png"
                alt="Constant Flexibility Icon"
                width={400}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-2">
              Constant Flexibility
            </h3>
            <p className="text-sm text-gray-600 max-w-sm lg:max-w-full">
              If you re feeling overwhelmed pause orders. You make the final
              decisions!
            </p>
          </div>
        </div>

        <div className="flex py-12">
          <Image
            src="/partnerImage/9.png"
            alt="Mamahat Delivery App"
            width={600}
            height={400}
            className="md:w-[900px] md:h-[600px]" 
            priority
          />
        </div>
      </div>
    </div>
  );
}
