import React from 'react';
import { render } from '@testing-library/react';
import SectionDivider from '@/components/SectionDivider';
import '@testing-library/jest-dom';

describe('SectionDivider', () => {
  it('renders correctly', () => {
    const { container } = render(<SectionDivider />);
    const dividerContainer = container.querySelector('#section-divider');
    expect(dividerContainer).toBeInTheDocument();
  });

  it('renders divider line with correct styles', () => {
    const { container } = render(<SectionDivider />);
    const dividerLine = container.querySelector('.bg-slate-500');
    expect(dividerLine).toBeInTheDocument();
    expect(dividerLine).toHaveClass('h-1', 'w-60', 'rounded-full');
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<SectionDivider />);
    const dividerLine = container.querySelector('[aria-hidden="true"]');
    expect(dividerLine).toBeInTheDocument();
  });
});
