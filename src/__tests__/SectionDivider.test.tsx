// __tests__/SectionDivider.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SectionDivider from '@/components/section-divider';

describe('SectionDivider', () => {
  it('renders with default props', () => {
    render(<SectionDivider />);
    const divider = screen.getByTestId('section-divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute('id', 'skills');
  });

  it('renders with custom id', () => {
    render(<SectionDivider id="custom-section" />);
    const divider = screen.getByTestId('section-divider');
    expect(divider).toHaveAttribute('id', 'custom-section');
  });

  it('applies correct height classes', () => {
    const { rerender } = render(<SectionDivider height="sm" />);
    let divider = screen.getByTestId('section-divider');
    expect(divider).toHaveClass('h-10');

    rerender(<SectionDivider height="lg" />);
    divider = screen.getByTestId('section-divider');
    expect(divider).toHaveClass('h-32');
  });

  it('applies correct color classes', () => {
    const { rerender } = render(<SectionDivider color="blue" />);
    let divider = screen.getByTestId('section-divider');
    expect(divider).toHaveClass('bg-blue-500');

    rerender(<SectionDivider color="green" />);
    divider = screen.getByTestId('section-divider');
    expect(divider).toHaveClass('bg-green-500');
  });

  it('applies custom className', () => {
    render(<SectionDivider className="custom-class" />);
    const divider = screen.getByTestId('section-divider');
    expect(divider).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<SectionDivider />);
    const divider = screen.getByTestId('section-divider');
    expect(divider).toHaveAttribute('role', 'separator');
    expect(divider).toHaveAttribute('aria-hidden', 'true');
  });

  it('handles default cases in switch statements', () => {
    // Test default height
    render(<SectionDivider height={'invalid' as any} />);
    const divider = screen.getByTestId('section-divider');
    expect(divider).toHaveClass('h-20');
  });
});
