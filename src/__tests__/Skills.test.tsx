import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from '@/components/skills';
import '@testing-library/jest-dom';

// Mock react-icons
jest.mock('react-icons/si', () => ({
  SiMicrosoftazure: () => 'Azure Icon',
  SiGooglecloud: () => 'GCP Icon',
  SiTerraform: () => 'Terraform Icon',
  SiGitlab: () => 'Gitlab Icon',
  SiGit: () => 'Git Icon',
  SiKubernetes: () => 'Kubernetes Icon',
  // Add other icons as needed
}));

describe('Skills Component', () => {
  it('renders the skills section correctly', () => {
    render(<Skills />);
    
    // Check if section titles are present
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Interested')).toBeInTheDocument();
    
    // Check if some skills are present
    const expectedSkills = [
      'Azure',
      'GCP',
      'Terraform',
      'Gitlab',
      'Git',
      'Kubernetes'
    ];
    
    expectedSkills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('renders interests correctly', () => {
    render(<Skills />);
    
    // Check if some interests are present
    const expectedInterests = [
      'AWS Cloud',
      'Jenkins',
      'Node.JS',
      'React.JS',
      'Next.JS'
    ];
    
    expectedInterests.forEach(interest => {
      expect(screen.getByText(interest)).toBeInTheDocument();
    });
  });

  it('applies hover styles to skill items', () => {
    render(<Skills />);
    
    // Check if skill items have the correct hover classes
    const skillItems = screen.getAllByRole('listitem');
    skillItems.forEach(item => {
      expect(item).toHaveClass('hover:scale-[1.15]');
    });
  });
});