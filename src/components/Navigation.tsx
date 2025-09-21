import React from 'react';
import { User, FolderOpen, Award } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-1 py-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentPage(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;