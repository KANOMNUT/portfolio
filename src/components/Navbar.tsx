'use client'
import React, { useState, useEffect } from 'react';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  target?: string;
}

interface MobileNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function NavLink({ to, children, target }: NavLinkProps): React.ReactElement {
  return <a href={to} className={`mx-4 my-5`} target={target}>
    {children}
  </a>;
}

function MobileNav({ open, setOpen }: MobileNavProps): React.ReactElement {
  return (
    <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
      <button 
        className="flex flex-col ml-14 mt-20 text-black text-xl font-mono text-left bg-transparent border-none" 
        onClick={() => setTimeout(() => { setOpen(!open) }, 100)}
        aria-label="Close mobile navigation"
      >
        <NavLink to='#about'>About</NavLink>
        <NavLink to='#exp'>Experience</NavLink>
        <NavLink to='#skills'>Skills</NavLink>
        <NavLink to='https://stseakanomnutt.blob.core.windows.net/portfolio/ThanachaiT-Resume.pdf' target='_blank'>Resume</NavLink>
      </button>
    </div>
  );
}

export default function Navbar(): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [sticky, setSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`flex w-full filter drop-shadow-md bg-white px-5 py-4 h-20 items-center ${sticky ? 'fixed top-0' : ''} z-50`}>
      <div className="w-full flex justify-center items-center text-xl">
        <div className="hidden md:flex text-black font-mono">
          <NavLink to="#about">ABOUT</NavLink>
          <NavLink to="#exp">WORK EXPERIENCE</NavLink>
          <NavLink to="#skills">SKILLS</NavLink>
          <NavLink target="_blank" to="https://stseakanomnutt.blob.core.windows.net/portfolio/ThanachaiT-Resume.pdf">RESUME</NavLink>
        </div>
        <MobileNav open={open} setOpen={setOpen} />
      </div>
      <button
        className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden bg-transparent border-none p-0"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        tabIndex={0}
        type="button"
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpen(!open);
          }
        }}
      >
        {/* hamburger button */}
        <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
        <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
        <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
      </button>
    </nav>
  );
}