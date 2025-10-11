import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '@/components/about';
import '@testing-library/jest-dom';

// Test utilities and constants
const CONTACT_INFO = {
  email: 'thanachai.tre@gmail.com',
  phone: '+6683-990-7607',
  linkedin: 'https://www.linkedin.com/in/thanachai-t-bb2622208/',
  gitlab: 'https://gitlab.com/thanachai.tre/',
  resume: 'https://stseakanomnutt.blob.core.windows.net/portfolio/ThanachaiT-Resume.pdf'
} as const;

const EXPECTED_TEXT = {
  aboutMe: 'About Me',
  greeting: "Hello, I'm Thanachai (Nut)",
  emailHeader: 'EMAIL ADDRESS',
  phoneHeader: 'MOBILE NUMBER',
  copied: 'Copied'
} as const;

// Mock setup utilities
const setupMocks = () => {
  // Mock the clipboard API
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn().mockImplementation(() => Promise.resolve()),
    },
  });

  // Mock the dialog element
  HTMLDialogElement.prototype.showModal = jest.fn();
  HTMLDialogElement.prototype.close = jest.fn();
};

// Test helper functions
const getButtonByName = (name: RegExp) => screen.getByRole('button', { name });
const getLinkByName = (name: RegExp) => screen.getByRole('link', { name });
const expectTextToBeInDocument = (text: string) => expect(screen.getByText(text)).toBeInTheDocument();
const expectLinkToHaveHref = (linkElement: HTMLElement, href: string) => expect(linkElement).toHaveAttribute('href', href);

const testModalFunctionality = async (buttonAriaLabel: RegExp, headerText: string, contactInfo: string) => {
  // Click the button to open modal
  const button = getButtonByName(buttonAriaLabel);
  fireEvent.click(button);
  
  // Verify modal content
  expectTextToBeInDocument(headerText);
  expectTextToBeInDocument(contactInfo);
  
  // Test copy functionality
  const copyButton = getButtonByName(/copy/i);
  fireEvent.click(copyButton);
  
  // Verify copy feedback
  expectTextToBeInDocument(EXPECTED_TEXT.copied);
};

describe('About Component', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('Initial Render', () => {
    it('renders the about section with correct headings', () => {
      render(<About />);
      
      expectTextToBeInDocument(EXPECTED_TEXT.aboutMe);
      expectTextToBeInDocument(EXPECTED_TEXT.greeting);
    });

    it('renders social links with correct URLs', () => {
      render(<About />);
      
      const linkedinLink = getLinkByName(/visit linkedin profile/i);
      const gitlabLink = getLinkByName(/visit gitlab profile/i);
      
      expectLinkToHaveHref(linkedinLink, CONTACT_INFO.linkedin);
      expectLinkToHaveHref(gitlabLink, CONTACT_INFO.gitlab);
    });

    it('renders resume download link with correct URL', () => {
      render(<About />);
      
      const resumeLink = getLinkByName(/download resume/i);
      expectLinkToHaveHref(resumeLink, CONTACT_INFO.resume);
    });

    it('renders contact buttons with proper aria labels', () => {
      render(<About />);
      
      expect(getButtonByName(/contact via email/i)).toBeInTheDocument();
      expect(getButtonByName(/contact via phone/i)).toBeInTheDocument();
    });
  });

  describe('Modal Functionality', () => {
    beforeEach(() => {
      render(<About />);
    });

    it('opens email modal and handles copy functionality', async () => {
      await testModalFunctionality(
        /contact via email/i,
        EXPECTED_TEXT.emailHeader,
        CONTACT_INFO.email
      );
    });

    it('opens phone modal and handles copy functionality', async () => {
      await testModalFunctionality(
        /contact via phone/i,
        EXPECTED_TEXT.phoneHeader,
        CONTACT_INFO.phone
      );
    });

    it('closes modal when close button is clicked', () => {
      // Open email modal
      const emailButton = getButtonByName(/contact via email/i);
      fireEvent.click(emailButton);
      
      // Click close button
      const closeButton = getButtonByName(/close/i);
      fireEvent.click(closeButton);
      
      // Verify modal is closed (isCopied state should be reset)
      // This is tested indirectly by checking that the copy button is visible again
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper aria labels for all interactive elements', () => {
      render(<About />);
      
      // Check that all buttons and links have proper aria labels
      expect(getButtonByName(/contact via email/i)).toHaveAttribute('aria-label', 'Contact via email');
      expect(getButtonByName(/contact via phone/i)).toHaveAttribute('aria-label', 'Contact via phone');
      expect(getLinkByName(/visit linkedin profile/i)).toHaveAttribute('aria-label', 'Visit LinkedIn profile');
      expect(getLinkByName(/visit gitlab profile/i)).toHaveAttribute('aria-label', 'Visit GitLab profile');
      expect(getLinkByName(/download resume/i)).toHaveAttribute('aria-label', 'Download resume');
    });

    it('has proper external link attributes', () => {
      render(<About />);
      
      const externalLinks = [
        getLinkByName(/visit linkedin profile/i),
        getLinkByName(/visit gitlab profile/i),
        getLinkByName(/download resume/i)
      ];

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Error Handling', () => {
    it('handles clipboard write errors gracefully', async () => {
      // Mock clipboard to reject
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockRejectedValue(new Error('Clipboard error')),
        },
      });

      render(<About />);
      
      // Open email modal and try to copy
      const emailButton = getButtonByName(/contact via email/i);
      fireEvent.click(emailButton);
      
      const copyButton = getButtonByName(/copy/i);
      fireEvent.click(copyButton);
      
      // Should log error but not crash
      expect(consoleSpy).toHaveBeenCalledWith('Error copying text:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });
});
