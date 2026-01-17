import React from 'react';
import Skills from 'src/components/Skills';
import About from 'src/components/About';
import Experience from '@/components/Experience';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ButtonBackToTop from 'src/components/BackToTop';
import SectionDivider from '@/components/SectionDivider';

export default function Home(): React.ReactElement {
  return (
    <div className="bg-slate-100 dark:bg-gray-700 w-full min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="max-w-screen-lg w-full flex-grow flex flex-col items-center">
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
      </div>
      <Footer />
      <ButtonBackToTop />
    </div>
  );
}