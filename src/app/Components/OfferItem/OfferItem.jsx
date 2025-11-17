"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BadgeInfo, Heart, Star } from "lucide-react";
import Image from "next/image";
import { useFoods } from "@/app/Hooks/usefood";
import Link from "next/link";

const OfferItem = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false })
  );
  const { offerItems } = useFoods();

  // favorite state per food
  const [favorites, setFavorites] = React.useState({});

  const toggleFav = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold text-blue-500 p-6">
          offerItems Foods
        </h1>
      </div>
      <Carousel
        className="w-full container mx-auto"
        plugins={[plugin.current]}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent className="flex gap-4">
          {offerItems.map((food) => (
            <CarouselItem
              key={food._id}
              className="md:basis-1/3 lg:basis-1/5 mb-10"
            >
              <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                <div className="relative w-full h-40 overflow-hidden group">
                  {/* Image */}
                  <Image
                    src={food.image}
                    alt={food.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFav(food._id)}
                    className="absolute top-2 right-2 z-10 bg-blue-300/50 backdrop-blur-md p-2 rounded-full shadow hover:bg-pink-400 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition ${
                        favorites[food._id]
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </button>
                </div>

                <CardContent className="p-4 space-y-1">
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {food.title}
                  </h2>
                 <Link href={food._id}>
                       <p className="text-blue-400 flex items-center gap-1 hover:underline text-sm">See info<BadgeInfo size={16}/></p>
                 </Link>
                  <div className="flex justify-between mx-2">
                    <p className="text-xl font-bold text-gray-600">
                      <span className="text-red-300 line-through">{food.oldPrice}</span> {food.price} ৳ 
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {food.rating || 4.5}
                      </span>
                    </div>
                   
                  </div>
                   <button className="px-3 rounded-sm mx-auto flex cursor-pointer py-2 text-white bg-green-600">Add to Cart </button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default OfferItem;
