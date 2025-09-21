import React from 'react';
import { ExternalLink, Github, Code2, Layers } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Portfolio',
      description: 'A full-featured e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
      technologies: ['React', 'tailwind', 'Node.js', 'PostgreSQL', 'Stripe', 'html 5', 'css 3'],
      liveDemo: 'https://portfolio-blush-omega-yq0s8saymv.vercel.app',
      github: 'https://github.com/sarvesh-3112/portfolio',
      image: 'https://res.cloudinary.com/dv2nqjc47/image/upload/WhatsApp_Image_2025-09-21_at_15.12.34_29508fdf_ujdb2p'
    },
    {
      title: 'Task Management SaaS',
      description: 'A collaborative task management application with team workspaces, real-time updates, and advanced analytics.',
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
      liveDemo: '#',
      github: '#',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    },
    {
      title: 'Social Media Analytics',
      description: 'AI-powered social media analytics platform that provides insights and automated reporting for businesses.',
      technologies: ['React', 'Python', 'Firebase', 'Chart.js', 'OpenAI API'],
      liveDemo: '#',
      github: '#',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    },
    {
      title: 'Learning Management System',
      description: 'Educational platform with course creation tools, progress tracking, and interactive assessments.',
      technologies: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
      liveDemo: '#',
      github: '#',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg'
    }
  ];

  const tools = [
    'Firebase', 'Supabase', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes',
    'AWS', 'Vercel', 'Netlify', 'Figma', 'Adobe XD', 'Git', 'GitHub Actions',
    'Jest', 'Cypress', 'Postman', 'Swagger', 'Redis', 'GraphQL', 'REST APIs'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="space-y-12">
        {/* Projects Section */}
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <Code2 className="text-blue-600" size={32} />
            <h1 className="text-4xl font-bold text-slate-800">Projects & Applications</h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{project.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="flex space-x-4">
                    <a
                      href={project.liveDemo}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Known Applications/Tools */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Layers className="text-blue-600" size={28} />
            <h2 className="text-3xl font-bold text-slate-800">Known Applications & Tools</h2>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Here are the various tools, frameworks, and platforms I'm proficient with across different domains:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="p-3 bg-slate-50 rounded-lg text-center hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <span className="font-medium text-slate-700">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
