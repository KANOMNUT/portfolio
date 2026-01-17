'use client'
import React, { useState, useEffect } from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '@/hooks/useTheme';

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
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
  return (
    <a href={to} className={`mx-4 my-5`} target={target} rel={rel}>
      {children}
    </a>
  );
}

function MobileNav({ open, setOpen }: MobileNavProps): React.ReactElement {
  return (
    <div
      role="dialog"
      aria-hidden={!open}
      aria-label="Mobile navigation"
      className={`absolute top-0 left-0 h-screen w-screen bg-white dark:bg-gray-900 transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <nav className="flex flex-col ml-14 mt-20 text-black dark:text-white text-xl font-mono text-left" onClick={() => setOpen(false)}>
        <a className="py-3" href="#about">About</a>
        <a className="py-3" href="#exp">Experience</a>
        <a className="py-3" href="#skills">Skills</a>
        <a className="py-3" href="https://stseakanomnutt.blob.core.windows.net/portfolio/ThanachaiT-Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
      </nav>
    </div>
  );
}

export default function Navbar(): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [sticky, setSticky] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

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

  // Close on Escape and prevent body scroll when mobile menu is open
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <nav className={`flex w-full filter drop-shadow-md bg-white dark:bg-gray-900 px-5 py-4 h-20 items-center ${sticky ? 'fixed top-0' : ''} z-50`}>
      <div className="w-full flex justify-center items-center text-xl">
        <div className="hidden md:flex text-black dark:text-white font-mono">
          <NavLink to="#about">ABOUT</NavLink>
          <NavLink to="#exp">WORK EXPERIENCE</NavLink>
          <NavLink to="#skills">SKILLS</NavLink>
          <NavLink target="_blank" to="https://stseakanomnutt.blob.core.windows.net/portfolio/ThanachaiT-Resume.pdf">RESUME</NavLink>
        </div>
        <MobileNav open={open} setOpen={setOpen} />
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        type="button"
      >
        {theme === 'light' ? (
          <BsMoon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        ) : (
          <BsSun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        )}
      </button>

      {/* Mobile Menu Hamburger */}
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
        <span className={`h-1 w-full bg-black dark:bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
        <span className={`h-1 w-full bg-black dark:bg-white rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
        <span className={`h-1 w-full bg-black dark:bg-white rounded-lg transform transition duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
      </button>
    </nav>
  );
}