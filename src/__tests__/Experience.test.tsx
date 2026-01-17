import React from 'react';
import { render, screen } from '@testing-library/react';
import Experience from '@/components/Experience';
import '@testing-library/jest-dom';

// Mock react-icons
jest.mock('react-icons/md', () => ({
  MdStarOutline: () => 'Star Icon',
  MdWorkOutline: () => 'Work Icon',
}));

// Mock vertical timeline component
jest.mock('react-vertical-timeline-component', () => ({
  VerticalTimeline: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="vertical-timeline">{children}</div>
  ),
  VerticalTimelineElement: ({ children, date }: { children: React.ReactNode; date: string }) => (
    <div data-testid="timeline-element" data-date={date}>
      {children}
    </div>
  ),
}));

describe('Experience Component', () => {
  it('renders the experience section correctly', () => {
    render(<Experience />);
    
    // Check if section title is present
    expect(screen.getByText('Work Experience')).toBeInTheDocument();
    
    // Check if all job experiences are rendered
    const expectedJobs = [
      {
        title: "DevOps Engineer",
        company: "7Solutions Co.,Ltd.",
        location: "Bangkok, TH",
        period: "Jun 2025 - Present"
      },
      {
        title: "Cloud Engineer",
        company: "RIS Co.,Ltd.",
        location: "Bangkok, TH",
        period: "Mar 2023 - Jun 2025"
      },
      {
        title: "DevOps Engineer",
        company: "Leap Solutions Asia Co.,Ltd.",
        location: "Bangkok, TH",
        period: "May 2022 - Mar 2023"
      }
    ];
    
    expectedJobs.forEach(job => {
      // Use getAllByText for titles that may appear multiple times
      const titleElements = screen.queryAllByText(job.title);
      expect(titleElements.length).toBeGreaterThan(0);
      expect(screen.getByText(job.company)).toBeInTheDocument();
      // Multiple jobs can have same location, so use queryAllByText
      const locationElements = screen.queryAllByText(job.location);
      expect(locationElements.length).toBeGreaterThan(0);
      // Period is in data-date attribute, not in text content
      const periodElements = screen.queryAllByTestId('timeline-element');
      const hasPeriod = Array.from(periodElements).some(el =>
        el.getAttribute('data-date') === job.period
      );
      expect(hasPeriod).toBe(true);
    });
  });

  it('renders job descriptions correctly', () => {
    render(<Experience />);
    
    const expectedDescriptions = [
      "Managed Google Cloud Platform and GitLab DevSecOps CI/CD pipelines with ArgoCD",
      "Managed hybrid cloud infrastructure on Azure integrated with on-premises VMware, and deployed and managed applications on AKS clusters.",
      "Managed K8s clusters and Middle-ware Applications in On-Prem Environment."
    ];
    
    expectedDescriptions.forEach(description => {
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('renders timeline elements with correct styles', () => {
    render(<Experience />);
    
    // Check if timeline has the correct styling
    const timelineElements = document.querySelectorAll('.vertical-timeline-element--work');
    expect(timelineElements.length).toBeGreaterThan(0);
    
    // Check if timeline elements have white background
    timelineElements.forEach(element => {
      expect(element).toHaveStyle({ background: 'rgb(255, 255, 255)' });
    });
  });
});