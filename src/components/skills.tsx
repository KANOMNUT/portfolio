import React from 'react'
import * as SI from 'react-icons/si'

const styles = {
  section: "text-center font-mono sm:mb-20 mb-20 text-black",
  title: "text-3xl font-medium capitalize mb-8 text-center",
  skillList: "flex flex-wrap justify-center gap-2 text-lg text-gray-800",
  skillItem: "bg-white border border-black/[0.1] rounded-xl px-4 py-2 flex items-center hover:scale-[1.15]",
  icon: "mr-2"
} as const;

interface SkillItem {
  icon: React.ElementType;
  name: string;
}

const skillsData: SkillItem[] = [
  { icon: SI.SiMicrosoftazure, name: "Azure" },
  { icon: SI.SiGooglecloud, name: "GCP" },
  { icon: SI.SiTerraform, name: "Terraform" },
  { icon: SI.SiGitlab, name: "Gitlab" },
  { icon: SI.SiGit, name: "Git" },
  { icon: SI.SiKubernetes, name: "Kuberbetes" },
  { icon: SI.SiArgo, name: "ArgoCD" },
  { icon: SI.SiHelm, name: "HelmChart" },
  { icon: SI.SiDocker, name: "Docker" },
  { icon: SI.SiPrometheus, name: "Prometheus" },
  { icon: SI.SiGrafana, name: "Grafana" },
  { icon: SI.SiOpentelemetry, name: "OpenteleMetry" },
  { icon: SI.SiApachekafka, name: "Kafka" },
  { icon: SI.SiLinux, name: "Linux" },
  { icon: SI.SiGnubash, name: "Bash" },
  { icon: SI.SiVmware, name: "VMWare" },
  { icon: SI.SiVeeam, name: "Veeam Backup" },
  { icon: SI.SiMongodb, name: "MongoDB" },
  { icon: SI.SiPython, name: "Python" },
  { icon: SI.SiJavascript, name: "JavaScript" },
];

const interestsData: SkillItem[] = [
  { icon: SI.SiAmazonaws, name: "AWS Cloud" },
  { icon: SI.SiJenkins, name: "Jenkins" },
  { icon: SI.SiNodedotjs, name: "Node.JS" },
  { icon: SI.SiReact, name: "React.JS" },
  { icon: SI.SiNextdotjs, name: "Next.JS" },
  { icon: SI.SiGo, name: "Golang" },
  { icon: SI.SiTailwindcss, name: "Tailwind" },
  { icon: SI.SiAnsible, name: "Ansible" },
  { icon: SI.SiPostgresql, name: "PostgreSQL" },
  { icon: SI.SiPrisma, name: "Prisma" },
];

interface SkillItemProps {
  Icon: React.ElementType;
  name: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ Icon, name }) => (
  <li className={styles.skillItem}>
    <Icon className={styles.icon} />{name}
  </li>
);

interface SkillSectionProps {
  title: string;
  items: SkillItem[];
}

const SkillSection: React.FC<SkillSectionProps> = ({ title, items }) => (
  <>
    <div className={`${styles.title} ${title === "Interested" ? "mt-12" : ""}`}>{title}</div>
    <ul className={styles.skillList}>
      {items.map((item) => (
        <SkillItem key={item.name} Icon={item.icon} name={item.name} />
      ))}
    </ul>
  </>
);

const Skills: React.FC = () => {
  return (
    <section id="skill" className={styles.section}>
      <SkillSection title="Skills" items={skillsData} />
      <SkillSection title="Interested" items={interestsData} />
    </section>
  );
};

export default Skills;