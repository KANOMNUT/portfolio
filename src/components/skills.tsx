import React from 'react'
import { skillsData, interestsData } from '@/data/skills'

interface SkillItemProps {
  Icon: React.ElementType;
  name: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ Icon, name }) => (
  <li className='bg-white dark:bg-gray-800 border border-black/[0.1] dark:border-gray-700 rounded-xl px-4 py-2 flex items-center hover:scale-[1.15] text-black dark:text-white'>
    <Icon className='mr-2' />{name}
  </li>
);

interface SkillSectionProps {
  title: string;
  items: Array<{ icon: React.ElementType; name: string }>;
}

const SkillSection: React.FC<SkillSectionProps> = ({ title, items }) => (
  <>
    <div className={`text-3xl font-medium capitalize mb-8 text-center dark:text-white ${title === "Interested Tools" ? "mt-12" : ""}`}>{title}</div>
    <ul className='flex flex-wrap justify-center gap-2 text-lg text-gray-800 dark:text-gray-200'>
      {items.map((item) => (
        <SkillItem key={item.name} Icon={item.icon} name={item.name} />
      ))}
    </ul>
  </>
);

const Skills: React.FC = () => {
  return (
    <div id='skills'>
      <section className='text-center font-mono sm:mb-50 mb-50 text-black dark:text-white'>
        <SkillSection title="Technical Skills" items={skillsData} />
        <SkillSection title="Interested Tools" items={interestsData} />
      </section>
    </div>
  );
};

export default Skills;
