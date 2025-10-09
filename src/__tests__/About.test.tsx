import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '@/components/about';
import '@testing-library/jest-dom';

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock the dialog element
HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();

describe('About Component', () => {
  it('renders the about section correctly', () => {
    render(<About />);
    
    // Check if main headings are present
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText("Hello, I'm Thanachai (Nut)")).toBeInTheDocument();
    
    // Check if social links are present
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/thanachai-t-bb2622208/'
    );
    expect(screen.getByRole('link', { name: /gitlab/i })).toHaveAttribute(
      'href',
      'https://gitlab.com/thanachai.tre/'
    );
  });

  it('opens email modal and handles copy functionality', async () => {
    render(<About />);
    
    // Click email button
    const emailButton = screen.getByRole('button', { name: /gmail/i });
    fireEvent.click(emailButton);
    
    // Check if modal content is displayed
    expect(screen.getByText('EMAIL ADDRESS')).toBeInTheDocument();
    expect(screen.getByText('thanachai.tre@gmail.com')).toBeInTheDocument();
    
    // Test copy functionality
    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);
    
    // Check if "Copied" text appears
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });

  it('opens phone modal and handles copy functionality', async () => {
    render(<About />);
    
    // Click phone button
    const phoneButton = screen.getByRole('button', { name: /phone/i });
    fireEvent.click(phoneButton);
    
    // Check if modal content is displayed
    expect(screen.getByText('MOBILE NUMBER')).toBeInTheDocument();
    expect(screen.getByText('+6683-990-7607')).toBeInTheDocument();
    
    // Test copy functionality
    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);
    
    // Check if "Copied" text appears
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });
});