'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MarkdownContent from './components/MarkdownContent';
import { FiArrowUp } from 'react-icons/fi';

export default function Home() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [activeSection, setActiveSection] = useState('introduction');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Fetch the markdown content
    fetch('/guide-content.md')
      .then(response => response.text())
      .then(text => setMarkdownContent(text))
      .catch(error => console.error('Error loading markdown:', error));
    
    // Set up scroll listener for the scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="flex flex-col md:flex-row">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="flex-1 p-4 md:p-8">
          {markdownContent ? (
            <MarkdownContent content={markdownContent} activeSection={activeSection} />
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-gray-400">Loading content...</div>
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-500 text-white shadow-lg transition-opacity ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FiArrowUp size={20} />
      </button>
    </main>
  );
}
