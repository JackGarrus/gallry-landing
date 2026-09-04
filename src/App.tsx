import Why from "./sections/Why";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import WhatYouCanDo from "./sections/WhatYouCanDo";
import Hero from "./sections/Hero";
import Header from "./components/Header";
import Solution from "./sections/Solution";
import { Footer } from "./sections/Footer";
import ConfirmationNotice from "./components/ConfirmationNotice";

export default function App() {
  const confirmation = new URLSearchParams(window.location.search).get(
    "confirmation",
  );

  return (
    <>
      <Header />
      {(confirmation === "invalid" || confirmation === "expired") && (
        <ConfirmationNotice confirmation={confirmation} />
      )}

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
