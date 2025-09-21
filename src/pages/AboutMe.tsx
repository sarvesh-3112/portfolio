import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Download } from 'lucide-react';
import SkillsSection from '../components/SkillsSection';

const AboutMe: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 text-center sticky top-24">
            {/* Profile Photo Placeholder */}
            <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden shadow-lg">
              <img 
                src="https://res.cloudinary.com/dv2nqjc47/image/upload/WhatsApp_Image_2025-09-21_at_15.12.34_29508fdf_ujdb2p" 
                alt="Sri Sarvesh" 
                className="w-full h-full object-cover"
              />
            </div>

            
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Sri Sarvesh R
            </h1>
            <p className="text-lg text-blue-600 font-medium mb-6">
              Full Stack Developer
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 text-sm lg:text-base">
              <div className="flex items-center justify-center space-x-3 text-slate-600">
                <MapPin size={18} className="text-blue-500" />
                <span>Cuddalore TN</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-slate-600">
                <Mail size={18} className="text-blue-500" />
                <span>srisarvesh2006@gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-slate-600">
                <Phone size={18} className="text-blue-500" />
                <span>+91 6379315200 </span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-4 mt-6">
              <a href="https://www.linkedin.com/in/srisarvesh-r-7ab21b325" className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Linkedin size={20} className="text-blue-600" />
              </a>
              <a href="https://github.com/sarvesh-3112" className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <Github size={20} className="text-slate-600" />
              </a>
            </div>
            
            {/* Download Resume Button */}
            <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Download size={18} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">About Me</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg leading-relaxed text-slate-600 mb-4">
                I'm a passionate Full Stack Developer with over 5 years of experience creating 
                scalable web applications and robust backend systems. My journey in technology 
                started with a curiosity for problem-solving and has evolved into a deep expertise 
                in modern web technologies.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 mb-4">
                I specialize in React, Node.js, and cloud technologies, with a strong focus on 
                building user-centric applications that deliver exceptional experiences. I thrive 
                in collaborative environments and enjoy mentoring junior developers.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                When I'm not coding, you'll find me contributing to open-source projects, 
                learning new technologies, or sharing knowledge through technical writing and 
                community presentations.
              </p>
            </div>
          </div>
          
          {/* Skills Section */}
          <SkillsSection />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
