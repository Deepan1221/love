import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FloatingParticles from './components/FloatingParticles';
import AudioPlayer from './components/AudioPlayer';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import AnimeAndCatsSection from './components/AnimeAndCatsSection';
import GamesSection from './components/GamesSection';
import TamilVillageSection from './components/TamilVillageSection';
import LoveLetterSection from './components/LoveLetterSection';
import WebsiteLockScreen from './components/WebsiteLockScreen';
import VideoSection from './components/VideoSection';
import { anniversaryData } from './data/anniversaryData us.js';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Everyone starts with the locked site first!
  // Only automatically unlocked if the real date has arrived on/after December 5, 2026.
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      // Clear any legacy persistent unlock flag so everyone sees the lock screen first
      localStorage.removeItem('anniversary_website_unlocked');

      const unlockTime = new Date(`${anniversaryData.couple.anniversaryDate || '2026-12-05'}T00:00:00`).getTime();
      if (Date.now() >= unlockTime) {
        return true;
      }

      const sessionSaved = sessionStorage.getItem('anniversary_website_unlocked');
      if (sessionSaved === 'true') {
        return true;
      }
    } catch {
      // Fallback
    }
    return false;
  });

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem('anniversary_website_unlocked', 'true');
    } catch {
      // Fallback
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('anniversary_website_unlocked');
      localStorage.removeItem('anniversary_website_unlocked');
    } catch {
      // Fallback
    }
  };

  // Smooth scroll handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to update active section in navbar
  useEffect(() => {
    if (!isUnlocked) return;

    const sectionIds = [
      'hero',
      'timeline',
      'gallery',
      'videos',
      'anime-cats',
      'games',
      'village',
      'letter',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked]);

  return (
    <div className="min-h-screen bg-romantic-darkest text-slate-100 relative selection:bg-sky-500 selection:text-white">
      {/* Ambient Floating Hearts & Sparkles */}
      <FloatingParticles />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Website Gate / Lock Screen */}
      {!isUnlocked ? (
        <WebsiteLockScreen onUnlock={handleUnlock} />
      ) : (
        <>
          {/* Romantic Sticky Navigation Bar */}
          <Navbar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onLock={handleLock}
          />

          {/* Page Sections */}
          <main className="relative z-20 space-y-16 sm:space-y-24">
            <HeroSection onStartStory={() => handleNavigate('timeline')} />
            <TimelineSection />
            <GallerySection />
            <VideoSection />
            <AnimeAndCatsSection />
            <GamesSection />
            <TamilVillageSection />
            <LoveLetterSection />
          </main>
        </>
      )}
    </div>
  );
}

