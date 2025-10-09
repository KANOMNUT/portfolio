import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import '@testing-library/jest-dom';

// Mock window.scrollY and scroll events
const mockScroll = (scrollY: number) => {
  Object.defineProperty(window, 'scrollY', {
    value: scrollY,
    writable: true,
  });
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
};

describe('Navbar Component', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0
    });
  });

  it('renders navigation links correctly', () => {
    render(<Navbar />);
    
    // Check if all nav links are present
    const expectedLinks = ['ABOUT', 'WORK EXPERIENCE', 'SKILLS', 'RESUME'];
    expectedLinks.forEach(link => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('becomes sticky when scrolling', () => {
    render(<Navbar />);
    
    // Initially not sticky
    const nav = screen.getByRole('navigation');
    expect(nav).not.toHaveClass('fixed');
    
    // Simulate scroll
    window.scrollY = 100;
    fireEvent.scroll(window);
    
    // Should be sticky now
    expect(nav).toHaveClass('fixed');
  });

  it('handles mobile menu toggle correctly', () => {
    render(<Navbar />);
    
    // Find and click hamburger menu button
    const menuButton = screen.getByRole('button', { name: /Open navigation menu/i });
    fireEvent.click(menuButton);
    
    // Check if mobile menu is visible
    const mobileMenu = document.querySelector('.transform.-translate-x-0');
    expect(mobileMenu).toBeInTheDocument();
    
    // Click again to close
    fireEvent.click(menuButton);
    
    // Check if mobile menu is hidden
    const closedMenu = document.querySelector('.transform.-translate-x-full');
    expect(closedMenu).toBeInTheDocument();
  });

  it('mobile menu links work correctly', () => {
    render(<Navbar />);
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /Open navigation menu/i });
    fireEvent.click(menuButton);
    
    // Check if all mobile links are present and have correct hrefs
    const expectedMobileLinks = [
      { text: 'About', href: '#about' },
      { text: 'Experience', href: '#exp' },
      { text: 'Skills', href: '#skills' }
    ];
    
    expectedMobileLinks.forEach(link => {
      const linkElement = screen.getByRole('link', { name: link.text });
      expect(linkElement).toHaveAttribute('href', link.href);
    });
  });
});