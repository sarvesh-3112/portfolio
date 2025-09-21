import React from 'react';
import { Briefcase, Award, Users, Server } from 'lucide-react';

const Certifications: React.FC = () => {
  const internships = [
    {
      company: 'Tech Innovators Inc.',
      duration: 'June 2022 - August 2022',
      role: 'Frontend Development Intern',
      learnings: 'Gained hands-on experience with React ecosystem, collaborated on enterprise-level applications, and learned agile development practices.'
    },
    {
      company: 'Edu Tantr',
      duration: 'January 2023 - March 2023',
      role: 'Full Stack Development Intern',
      learnings: 'Developed REST APIs, integrated third-party services, and participated in code reviews with senior developers.'
    }
  ];

  const projectCertifications = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'March 2023',
      description: 'Comprehensive understanding of AWS cloud architecture and services.'
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: 'January 2023',
      description: 'Advanced knowledge of MongoDB database design and development.'
    },
    {
      title: 'React Professional Certification',
      issuer: 'Meta',
      date: 'November 2022',
      description: 'Expertise in React development and best practices.'
    }
  ];

  const exposWorkshops = [
    {
      event: 'TechCrunch Disrupt 2023',
      role: 'Presenter',
      description: 'Presented innovative AI-powered web application to industry leaders and investors.'
    },
    {
      event: 'React Conference 2023',
      role: 'Workshop Leader',
      description: 'Led hands-on workshop on "Advanced React Patterns and Performance Optimization".'
    },
    {
      event: 'DevOps Summit 2022',
      role: 'Participant',
      description: 'Attended sessions on cloud architecture and modern deployment strategies.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <Award className="text-blue-600" size={32} />
          <h1 className="text-4xl font-bold text-slate-800">Certifications & Achievements</h1>
        </div>

        {/* Internships */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Briefcase className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-800">Internships</h2>
          </div>
          <div className="space-y-6">
            {internships.map((internship, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-semibold text-slate-800">{internship.company}</h3>
                  <span className="text-blue-600 font-medium">{internship.duration}</span>
                </div>
                <p className="text-lg text-slate-700 font-medium mb-3">{internship.role}</p>
                <p className="text-slate-600 leading-relaxed">{internship.learnings}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Certifications */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-800">Professional Certifications</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectCertifications.map((cert, index) => (
              <div key={index} className="p-6 bg-green-50 rounded-xl border border-green-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{cert.title}</h3>
                <p className="text-green-700 font-medium mb-2">{cert.issuer}</p>
                <p className="text-sm text-slate-500 mb-3">{cert.date}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expo/Workshops */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-800">Expo & Workshops</h2>
          </div>
          <div className="space-y-6">
            {exposWorkshops.map((event, index) => (
              <div key={index} className="p-6 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-semibold text-slate-800">{event.event}</h3>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {event.role}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backend Experience */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 lg:p-8 text-white">
          <div className="flex items-center space-x-3 mb-6">
            <Server className="text-blue-400" size={24} />
            <h2 className="text-2xl font-bold">Backend Experience</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Technologies & Frameworks</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'PostgreSQL',
                  'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Microservices'
                ].map((tech, index) => (
                  <span key={index} className="px-3 py-2 bg-slate-700 rounded-lg text-center text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Experience Overview</h3>
              <p className="text-slate-300 leading-relaxed">
                With over 4 years of backend development experience, I specialize in building 
                scalable, high-performance server applications. I've architected microservices 
                handling millions of requests, implemented robust authentication systems, and 
                optimized database performance for enterprise applications. My expertise includes 
                API design, cloud deployment, and maintaining 99.9% uptime for mission-critical systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
