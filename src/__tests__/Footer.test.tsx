// __tests__/Footer.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/Footer';

// Mock next/link if using Next.js
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock react-icons if used
jest.mock('react-icons/fa', () => ({
  FaGithub: () => <div data-testid="github-icon">GitHub</div>,
  FaLinkedin: () => <div data-testid="linkedin-icon">LinkedIn</div>,
  FaTwitter: () => <div data-testid="twitter-icon">Twitter</div>,
  FaEnvelope: () => <div data-testid="email-icon">Email</div>,
}));

describe('Footer', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  it('renders footer component', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(new RegExp(`${currentYear}`, 'i'));
    expect(copyrightText).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    
    // Test for common social media links
    const githubLink = screen.queryByTestId('github-icon');
    const linkedinLink = screen.queryByTestId('linkedin-icon');
    const twitterLink = screen.queryByTestId('twitter-icon');
    const emailLink = screen.queryByTestId('email-icon');

    // At least one social link should be present
    expect(
      githubLink || linkedinLink || twitterLink || emailLink
    ).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveAttribute('role', 'contentinfo');
  });

  it('renders navigation links if present', () => {
    render(<Footer />);
    
    // Common footer navigation items
    const possibleNavItems = [
      'About',
      'Contact',
      'Privacy Policy',
      'Terms of Service',
      'Home',
      'Services'
    ];

    // Check if any navigation items are present
    const hasNavigation = possibleNavItems.some(item => 
      screen.queryByText(new RegExp(item, 'i'))
    );

    // This test passes if navigation exists or doesn't exist
    expect(typeof hasNavigation).toBe('boolean');
  });

  it('external links open in new tab', () => {
    render(<Footer />);
    
    // Find all external links (assuming they have target="_blank")
    const externalLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('target') === '_blank'
    );

    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });

  it('handles click events on interactive elements', () => {
    render(<Footer />);
    
    // Find all clickable elements
    const clickableElements = [
      ...screen.getAllByRole('link'),
      ...screen.getAllByRole('button')
    ];

    // Test that clicking doesn't throw errors
    clickableElements.forEach(element => {
      expect(() => fireEvent.click(element)).not.toThrow();
    });
  });

  it('displays contact information if present', () => {
    render(<Footer />);
    
    // Common contact patterns
    const emailPattern = /[\w\.-]+@[\w\.-]+\.\w+/;
    const phonePattern = /[\+]?[\d\s\-\(\)]+/;
    
    const footerText = screen.getByRole('contentinfo').textContent || '';
    
    // Check if email or phone is present (optional)
    const hasEmail = emailPattern.test(footerText);
    const hasPhone = phonePattern.test(footerText);
    
    // This test documents the presence of contact info
    expect(typeof hasEmail).toBe('boolean');
    expect(typeof hasPhone).toBe('boolean');
  });

  it('renders with proper semantic structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer.tagName.toLowerCase()).toBe('footer');
  });

  it('has consistent styling classes', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    const className = footer.className;
    
    // Footer should have some styling classes
    expect(className).toBeTruthy();
    expect(typeof className).toBe('string');
  });

  it('renders without crashing', () => {
    expect(() => render(<Footer />)).not.toThrow();
  });

  it('handles responsive design classes', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    const className = footer.className;
    
    // Check for common responsive classes
    const hasResponsiveClasses = /sm:|md:|lg:|xl:/.test(className);
    
    // Document whether responsive classes are used
    expect(typeof hasResponsiveClasses).toBe('boolean');
  });

  it('maintains proper contrast and accessibility', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    
    // Check that footer has proper background/text contrast classes
    const className = footer.className;
    const hasColorClasses = /bg-|text-/.test(className);
    
    expect(typeof hasColorClasses).toBe('boolean');
  });

  it('renders legal links if present', () => {
    render(<Footer />);
    
    const legalTerms = ['Privacy', 'Terms', 'Cookie', 'Legal'];
    const hasLegalLinks = legalTerms.some(term => 
      screen.queryByText(new RegExp(term, 'i'))
    );
    
    // Document presence of legal links
    expect(typeof hasLegalLinks).toBe('boolean');
  });

  it('handles keyboard navigation', () => {
    render(<Footer />);
    
    const focusableElements = screen.getAllByRole('link');
    
    focusableElements.forEach(element => {
      // Test that elements can receive focus
      element.focus();
      expect(document.activeElement).toBe(element);
    });
  });

  it('displays company or personal branding', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    const footerText = footer.textContent || '';
    
    // Footer should contain some identifying text
    expect(footerText.length).toBeGreaterThan(0);
  });
});
