import React from "react";
import Hero from "./Components/Hero/Hero";
import TrendingFood from "./Components/TrendingFood/TrendingFood";
import FreeDelivery from "./Components/FreeDelivery/FreeDelivery";
import OfferItem from "./Components/OfferItem/OfferItem";
import Restaurant from "./Components/Restaurant/Restaurant";
import Mamarhat from "./Components/Mamarhat/Mamarhat";
import AboutMamarhat from "./Components/AboutMamarhat/AboutMamarhat";
import Accordion from "./Components/Accordion/Accordion";
import Category from "./Components/Category/Category";
import ClientLayout from "./clientLayout";

export default function page() {
  return (
    <div>
      <ClientLayout>
        <Hero></Hero>
        <Category></Category>
        <TrendingFood></TrendingFood>
        <FreeDelivery></FreeDelivery>
        <OfferItem></OfferItem>
        <Restaurant></Restaurant>
        <Mamarhat></Mamarhat>
        <AboutMamarhat></AboutMamarhat>
        <Accordion></Accordion>
      </ClientLayout>
    </div>
  );
}
