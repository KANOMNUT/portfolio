'use client';
import React from 'react';

const SectionDivider: React.FC = () => {
  return (
    <div id='section-divider' className="w-full flex justify-center my-10 sm:my-20">
      <div className="h-1 w-60 rounded-full bg-slate-500" aria-hidden="true" />
    </div>
  );
};

export default SectionDivider;