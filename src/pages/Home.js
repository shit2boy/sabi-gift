import React, { useEffect } from "react";
import NavBar from "../components/NavigationBar";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import CardlistSection from "../components/cardlistSection";
import WhySabigift from "../components/whySabigift";
import Howitworks from "../components/howitworks";

function Home() {
  useEffect(() => {
    if (window.localStorage.token_id) {
      window.location.href = "/manageregistry";
    }
  });

  return (
    <>
      <NavBar />
      <Hero>
        <Banner />
      </Hero>
      <CardlistSection />
      <WhySabigift />
      <Howitworks />
    </>
  );
}

export default Home;
