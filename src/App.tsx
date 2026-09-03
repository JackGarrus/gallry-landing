import Why from "./sections/Why";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import WhatYouCanDo from "./sections/WhatYouCanDo";
import Hero from "./sections/Hero";
import Header from "./components/Header";
import Solution from "./sections/Solution";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Why />
        <Solution />
        <WhatYouCanDo />
        <FinalCTA />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
