import React from 'react'
import { About } from '../components/About';
import { Banner } from '../components/Banner';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Proyects } from '../components/Proyects';
import { Services } from '../components/Services';

export const Porfolio = () => {

  return (
      <div>
          <Header />
          <Banner />
          <About />
          <Services />
          <Proyects />
          <Contact />
          <Footer />
      </div>
  );
}
