import { motion } from 'framer-motion';

const skillsData = {
  languages: [
    { name: 'Python', level: 'Advanced' },
    { name: 'C++', level: 'Advanced' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'HTML/CSS', level: 'Intermediate' },
    { name: 'SQL', level: 'Intermediate' },
  ],
  frameworks: [
    { name: 'React', level: 'Intermediate' },
    { name: 'Node.js', level: 'Intermediate' },
    { name: 'TailwindCSS', level: 'Intermediate' },
    { name: 'Bootstrap', level: 'Intermediate' },
  ],
  tools: [
    { name: 'Git', level: 'Advanced' },
    { name: 'GitHub', level: 'Advanced' },
    { name: 'VS Code', level: 'Advanced' },
    { name: 'Linux', level: 'Intermediate' },
    { name: 'Docker', level: 'Intermediate' },
  ],
  other: [
    { name: 'Agile/Scrum', level: 'Intermediate' },
    { name: 'Problem Solving', level: 'Advanced' },
    { name: 'Team Collaboration', level: 'Advanced' },
    { name: 'Technical Writing', level: 'Intermediate' },
  ]
};

const SkillCard = ({ name, level }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
  >
    <h4 className="font-medium text-lg text-neutral-900 dark:text-neutral-100">{name}</h4>
    <p className="text-sm text-neutral-600 dark:text-neutral-400">{level}</p>
  </motion.div>
);

const SkillSection = ({ title, skills }) => (
  <div className="mb-8">
    <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill) => (
        <SkillCard key={skill.name} {...skill} />
      ))}
    </div>
  </div>
);

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">Skills & Expertise</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            A comprehensive overview of my technical skills and competencies
          </p>
        </motion.div>

        <SkillSection title="Programming Languages" skills={skillsData.languages} />
        <SkillSection title="Frameworks & Libraries" skills={skillsData.frameworks} />
        <SkillSection title="Tools & Technologies" skills={skillsData.tools} />
        <SkillSection title="Other Skills" skills={skillsData.other} />
      </div>
    </section>
  );
} 