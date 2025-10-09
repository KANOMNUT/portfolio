import React from 'react';
import Skills from "@/components/skills";
import About from "@/components/about";
import Expreience from "@/components/expreience";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ButtonBackToTop from "@/components/backtotop";
import SectionDivider from "@/components/section-divider";

export default function Home(): React.ReactElement {
  return (
    <div className="bg-slate-100 w-full min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="max-w-screen-lg w-full flex-grow flex flex-col items-center">
        <About />
        <SectionDivider />
        <Expreience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
      </div>
      <Footer />
      <ButtonBackToTop />
    </div>
  );
}