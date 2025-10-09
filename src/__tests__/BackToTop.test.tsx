import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ButtonBackToTop from '@/components/backtotop';
import '@testing-library/jest-dom';

// Mock window.pageYOffset and scroll events
const mockScroll = (pageYOffset: number) => {
  Object.defineProperty(window, 'pageYOffset', {
    value: pageYOffset,
    writable: true,
  });
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
};

// Mock window.scrollTo
const mockScrollTo = jest.fn();

describe('ButtonBackToTop Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    
    // Mock window.pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0
    });
  });

  it('is hidden initially', () => {
    render(<ButtonBackToTop />);
    
    // Button should not be visible initially
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('appears when scrolling down', () => {
    render(<ButtonBackToTop />);
    
    // Simulate scroll
    window.pageYOffset = 400;
    fireEvent.scroll(window);
    
    // Button should be visible now
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('scrolls to top when clicked', () => {
    render(<ButtonBackToTop />);
    
    // Make button visible
    window.pageYOffset = 400;
    fireEvent.scroll(window);
    
    // Click the button
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check if window.scrollTo was called with correct parameters
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('disappears when scrolling back to top', () => {
    render(<ButtonBackToTop />);
    
    // Make button visible
    window.pageYOffset = 400;
    fireEvent.scroll(window);
    
    // Button should be visible
    expect(screen.getByRole('button')).toBeInTheDocument();
    
    // Scroll back to top
    window.pageYOffset = 0;
    fireEvent.scroll(window);
    
    // Button should be hidden
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});