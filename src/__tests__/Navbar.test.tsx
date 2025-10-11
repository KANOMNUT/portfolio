import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
  // Test data constants
  const NAVIGATION_LINKS = ['ABOUT', 'WORK EXPERIENCE', 'SKILLS', 'RESUME'] as const;
  const MOBILE_LINKS = [
    { text: 'About', href: '#about' },
    { text: 'Experience', href: '#exp' },
    { text: 'Skills', href: '#skills' }
  ] as const;

  // Helper functions
  const mockScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', {
      value,
      writable: true,
      configurable: true,
    });
  };

  const simulateScroll = (scrollY: number) => {
    mockScrollY(scrollY);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
  };

  const toggleMobileMenu = () => {
    const menuButton = screen.getByRole('button', { name: /Open navigation menu/i });
    fireEvent.click(menuButton);
    return menuButton;
  };

  const getMobileMenuElement = (isOpen: boolean) => {
    const className = isOpen ? '.transform.-translate-x-0' : '.transform.-translate-x-full';
    return document.querySelector(className);
  };

  beforeEach(() => {
    mockScrollY(0);
  });

  describe('Navigation Links', () => {
    it('renders all navigation links correctly', () => {
      render(<Navbar />);
      
      NAVIGATION_LINKS.forEach(link => {
        expect(screen.getByText(link)).toBeInTheDocument();
      });
    });
  });

  describe('Sticky Behavior', () => {
    it('is not sticky initially', () => {
      render(<Navbar />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).not.toHaveClass('fixed');
    });

    it('becomes sticky when scrolling down', () => {
      render(<Navbar />);
      
      simulateScroll(100);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('fixed');
    });

    it('remains not sticky when scroll position is at top', () => {
      render(<Navbar />);
    
      simulateScroll(100);
      simulateScroll(0);
      
      const nav = screen.getByRole('navigation');
      expect(nav).not.toHaveClass('fixed');
    });
  });

  describe('Mobile Menu', () => {
    it('opens mobile menu when hamburger button is clicked', () => {
      render(<Navbar />);
      
      toggleMobileMenu();
      
      const openMenu = getMobileMenuElement(true);
      expect(openMenu).toBeInTheDocument();
    });

    it('closes mobile menu when hamburger button is clicked twice', () => {
      render(<Navbar />);
      
      // Open then close
      toggleMobileMenu();
      toggleMobileMenu();
      
      const closedMenu = getMobileMenuElement(false);
      expect(closedMenu).toBeInTheDocument();
    });

    it('renders mobile menu links with correct attributes', () => {
      render(<Navbar />);
      
      toggleMobileMenu();
      
      MOBILE_LINKS.forEach(({ text, href }) => {
        const linkElement = screen.getByRole('link', { name: text });
        expect(linkElement).toHaveAttribute('href', href);
      });
    });
  });
});
