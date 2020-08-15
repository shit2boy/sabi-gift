import React from 'react';
import NavBar from '../components/NavigationBar'
import Hero from '../components/Hero';
import Banner from '../components/Banner'
import CardlistSection from '../components/cardlistSection'
import WhySabigift from '../components/whySabigift';
import Howitworks from '../components/howitworks'


function Home() {
  return (
    <>
    <NavBar/>
    <Hero>
      <Banner/>
    </Hero>
    <CardlistSection/>
    <WhySabigift/>
    <Howitworks/>

     
    </>
  );
}

export default Home;
