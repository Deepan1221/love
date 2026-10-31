import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Sparkles, MapPin, Lock } from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';

export default function Navbar({ activeSection, onNavigate, onLock }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { boyfriendName, girlfriendName, anniversaryYear } = anniversaryData.couple;

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'timeline', label: 'Our Journey' },
    { id: 'gallery', label: 'Memories' },
    { id: 'videos', label: 'Videos 🎬' },
    { id: 'anime-cats', label: 'Anime & Cats' },
    { id: 'games', label: 'Mini-Games' },
    { id: 'village', label: 'Village Dream' },
    { id: 'letter', label: 'Love Letter' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-2.5 glass-panel shadow-lg shadow-black/30' : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center space-x-2 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-sky-300 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition transform">
            <div className="w-full h-full bg-romantic-darkest rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-sky-400 fill-sky-400 group-hover:animate-ping" />
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-white flex items-center space-x-1">
              <span>{boyfriendName}</span>
              <span className="text-sky-400">&</span>
              <span>{girlfriendName}</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-sky-300/80 font-mono">
              {anniversaryYear} Anniversary
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm shadow-sky-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {onLock && (
            <button
              onClick={onLock}
              className="ml-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 flex items-center gap-1.5 transition shadow-sm"
              title="Lock website"
            >
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span>Lock Site</span>
            </button>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {onLock && (
            <button
              onClick={onLock}
              className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-sky-300 hover:text-white focus:outline-none"
              title="Lock website"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-sky-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel mt-2 mx-4 rounded-2xl p-4 border border-sky-400/20 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-left transition ${
                    isActive
                      ? 'bg-sky-600/30 text-sky-200 border border-sky-400/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-sky-400" />}
                </button>
              );
            })}

            {onLock && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLock();
                }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-left text-slate-300 hover:bg-slate-800/60 hover:text-white border border-slate-700/50 mt-2"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>Lock Website</span>
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
