import React from 'react';
import { ExternalLink, Github, Code2, Layers } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'HealthAI – Full Stack Healthcare Prediction Platform',
      description: 'A full-stack AI-powered healthcare platform with three role-based apps (Patient, Hospital, Admin) enabling real-time disease risk prediction and system monitoring. FastAPI backend with ML integration; Next.js frontend deployed on Vercel, backend on Render.',
      technologies: ['Next.js', 'FastAPI', 'Python', 'Scikit-learn', 'Render', 'Vercel'],
      liveDemo: 'https://healthai-patient.vercel.app/',
      showLiveDemo: true,
      github: '#',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    },
    {
      title: 'Smart Footstep Power Generation System',
      description: 'A piezoelectric-based energy harvesting system that converts mechanical footstep pressure into usable electrical energy for low-power IoT devices. Integrated piezoelectric sensors with Arduino to capture and monitor real-time voltage output.',
      technologies: ['Arduino', 'Piezoelectric Sensors', 'Embedded C', 'IoT'],
      liveDemo: '',
      showLiveDemo: false,
      github: '#',
      image: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg'
    },
    {
      title: 'Smart Expense Manager – Personal Finance Dashboard',
      description:
        'A feature-rich personal finance management application designed to help users efficiently track, organize, and analyze their expenses. Real-time budget monitoring, expense categorization, interactive data visualization, CSV export, dark mode, and persistent storage via Local Storage.',
      technologies: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'Chart.js',
        'Local Storage API',
        'GitHub',
        'Vercel'
      ],
      liveDemo: 'https://smart-expense-manager-sooty.vercel.app/',
      showLiveDemo: true,
      github: '#',
      image:
        'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const tools = [
    'Java', 'Python', 'C', 'MySQL', 'JDBC', 'Git', 'GitHub',
    'VS Code', 'Eclipse', 'Next.js', 'FastAPI', 'Vercel',
    'Render', 'Scikit-learn', 'Arduino', 'Bootstrap', 'REST APIs'
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {project.showLiveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
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
