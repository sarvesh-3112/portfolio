import React from 'react';
import { Code, Server, Database, Palette, Users, Lightbulb } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code,
      color: 'bg-blue-500',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js']
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'bg-green-500',
      skills: ['Node.js', 'Express', 'Python', 'RESTful APIs', 'GraphQL']
    },
    {
      title: 'Database',
      icon: Database,
      color: 'bg-purple-500',
      skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'Redis']
    },
    {
      title: 'Design',
      icon: Palette,
      color: 'bg-pink-500',
      skills: ['Figma', 'Adobe XD', 'UI/UX', 'Responsive Design', 'Prototyping']
    },
    {
      title: 'Soft Skills',
      icon: Users,
      color: 'bg-orange-500',
      skills: ['Team Leadership', 'Communication', 'Problem Solving', 'Agile', 'Mentoring']
    },
    {
      title: 'Tools',
      icon: Lightbulb,
      color: 'bg-teal-500',
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'CI/CD']
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">Skills & Expertise</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-white text-slate-600 rounded-full text-sm font-medium border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsSection;