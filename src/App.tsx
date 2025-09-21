import React, { useState } from 'react';
import Navigation from './components/Navigation';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';

function App() {
  const [currentPage, setCurrentPage] = useState('about');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutMe />;
      case 'projects':
        return <Projects />;
      case 'certifications':
        return <Certifications />;
      default:
        return <AboutMe />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="transition-all duration-300 ease-in-out">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;