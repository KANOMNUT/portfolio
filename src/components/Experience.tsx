'use client';

import React from 'react';
import { MdStarOutline, MdWorkOutline } from 'react-icons/md';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { TimelineElementProps } from '@/types';
import { experienceData } from '@/data/experience';
import { timelineElementStyle, timelineArrowStyle, timelineIconStyle } from '@/constants/styles';

const TimelineElement: React.FC<TimelineElementProps> = ({
  title,
  company,
  location,
  period,
  description
}) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={timelineElementStyle}
    contentArrowStyle={timelineArrowStyle}
    date={period}
    iconStyle={timelineIconStyle}
    icon={<MdWorkOutline />}
  >
    <div className="dark:text-white">
      <h3 className="vertical-timeline-element-title text-xl dark:text-white">{title}</h3>
      <h4 className="vertical-timeline-element-subtitle dark:text-gray-300">{company}</h4>
      <h4 className="vertical-timeline-element-subtitle dark:text-gray-300">{location}</h4>
      <p className="dark:text-gray-400">{description}</p>
    </div>
  </VerticalTimelineElement>
);

const Experience: React.FC = () => {
  return (
    <section id="exp">
      <section className="mb-25 text-center sm:mb-25 text-black dark:text-white">
        <h2 className="text-3xl mb-10 text-center font-mono dark:text-white">Work Experience</h2>
        <div className="flex flex-col items-center justify-center font-mono">
          <VerticalTimeline lineColor="darkgrey">
            {experienceData.map((experience, index) => (
              <TimelineElement key={index} {...experience} />
            ))}
          </VerticalTimeline>
        </div>
      </section>
    </section>
  );
};

export default Experience;
