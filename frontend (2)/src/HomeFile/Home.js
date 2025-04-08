import React from "react";
import Header from "../CoreFile/Header";
import Footer from "../CoreFile/Footer";
import {Web3Connect} from "./Web3Connect";
import {AboutSection} from "./AboutSection";
import {Features} from "./Features";
import WhyChoose from "./WhyChooseUs";
import BusinessStats from "./BusinessStats";
import Banner from "./Banner";
import Faq from "./Faq";
import  HeroSection  from "./HeroSection";
import TreadingView from "./TreadingView";
import {Pricing} from "./Pricing";
import Popup from "./Popup";
import NewsLetters from "./NewsLetters";
import ScrollingBanner from "./ScrollingBanner";

export const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      {/* <ScrollingBanner/> */}
      <AboutSection />
      <Features />
     
      {/* <TreadingView /> */}
      <WhyChoose />
       {/* <Web3Connect /> */}
      <Banner />
      <NewsLetters />
      {/* <BusinessStats /> */}
      {/* <Faq /> */}
      {/* <Pricing /> */}
      <Footer />
      <Popup />
    </>
  );
};
