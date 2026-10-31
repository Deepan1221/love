import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ChevronDown, Compass, Gift, Calendar, Clock } from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';
import confetti from 'canvas-confetti';

export default function HeroSection({ onStartStory }) {
  const { boyfriendName, girlfriendName, anniversaryYear, tagline, heroGreeting, anniversaryDate } =
    anniversaryData.couple;

  // Live real-time timer state
  const [timerMode, setTimerMode] = useState('countdown'); // 'countdown' or 'together'
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isHeartPopping, setIsHeartPopping] = useState(false);

  useEffect(() => {
    // Target: December 5, 2026 00:00:00
    const targetDate = new Date(`${anniversaryDate}T00:00:00`).getTime();
    // Relationship start date: December 5, 2025 00:00:00
    const startDate = new Date('2025-12-05T00:00:00').getTime();

    const updateTimers = () => {
      const now = Date.now();

      // 1. Live Countdown to December 5, 2026
      const diffToAnniversary = targetDate - now;
      if (diffToAnniversary > 0) {
        const d = Math.floor(diffToAnniversary / (1000 * 60 * 60 * 24));
        const h = Math.floor((diffToAnniversary / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diffToAnniversary / 1000 / 60) % 60);
        const s = Math.floor((diffToAnniversary / 1000) % 60);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isPassed: false });
      } else {
        const pastDiff = Math.abs(diffToAnniversary);
        const d = Math.floor(pastDiff / (1000 * 60 * 60 * 24));
        const h = Math.floor((pastDiff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((pastDiff / 1000 / 60) % 60);
        const s = Math.floor((pastDiff / 1000) % 60);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isPassed: true });
      }

      // 2. Live Relationship Counter (Time in Love since Dec 5, 2025)
      const diffTogether = Math.max(0, now - startDate);
      const daysTogether = Math.floor(diffTogether / (1000 * 60 * 60 * 24));
      const hoursTogether = Math.floor((diffTogether / (1000 * 60 * 60)) % 24);
      const minsTogether = Math.floor((diffTogether / 1000 / 60) % 60);
      const secsTogether = Math.floor((diffTogether / 1000) % 60);
      setTimeTogether({
        days: daysTogether,
        hours: hoursTogether,
        minutes: minsTogether,
        seconds: secsTogether,
      });
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  const activeTime = timerMode === 'countdown' ? timeLeft : timeTogether;

  const handleDrawQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % anniversaryData.quotes.length);
  };

  const handleHeartBurst = () => {
    setIsHeartPopping(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#7DD3FC', '#FFFFFF', '#1E40AF', '#BAE6FD'],
    });
    setTimeout(() => setIsHeartPopping(false), 600);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[550px] sm:h-[550px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-sky-400/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Hero Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-card border border-sky-400/30 text-sky-200 text-xs sm:text-sm mb-6 animate-pulse-glow">
        <Sparkles className="w-4 h-4 text-sky-300" />
        <span className="tracking-wide uppercase font-semibold">{heroGreeting}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
        <span>December 5, 2026</span>
      </div>

      {/* Main Cinematic Title */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-tight">
          Our <span className="text-shimmer italic font-cursive">{anniversaryYear}</span> Anniversary
        </h1>
        <p className="text-lg sm:text-2xl text-sky-200/90 font-light max-w-2xl mx-auto leading-relaxed">
          {tagline}
        </p>
      </div>

      {/* Interactive Centerpiece Heart Badge */}
      <div className="my-8 relative group">
        <button
          onClick={handleHeartBurst}
          className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-blue-700 via-sky-600 to-sky-300 p-1 shadow-2xl shadow-sky-500/30 transition-all duration-300 transform ${
            isHeartPopping ? 'scale-110' : 'group-hover:scale-105'
          } flex items-center justify-center`}
        >
          <div className="w-full h-full bg-slate-950/90 rounded-full flex flex-col items-center justify-center p-4 text-center border border-sky-300/30">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-sky-400 fill-sky-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs text-sky-200 uppercase tracking-widest mt-1 font-semibold">
              Tap for Love
            </span>
          </div>
        </button>
      </div>

      {/* Live Relationship Time Ticker */}
      <div className="w-full max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 mb-8 border border-sky-300/20 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="text-xs sm:text-sm uppercase tracking-wider text-sky-200 font-semibold">
              {timerMode === 'countdown'
                ? timeLeft.isPassed
                  ? '🎉 Happy 1st Anniversary! Today is Our Day!'
                  : '⏳ Countdown to Our 1st Anniversary'
                : '💖 Time We Have Been In Love'}
            </span>
          </div>

          {/* Toggle buttons between Countdown & Time in Love */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-full border border-sky-500/20 text-[11px]">
            <button
              onClick={() => setTimerMode('countdown')}
              className={`px-3 py-1 rounded-full font-medium transition ${
                timerMode === 'countdown'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⏳ Countdown to Dec 5
            </button>
            <button
              onClick={() => setTimerMode('together')}
              className={`px-3 py-1 rounded-full font-medium transition ${
                timerMode === 'together'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              💖 Time in Love
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
          <div className="bg-slate-900/70 rounded-2xl p-3 sm:p-4 border border-sky-500/20 backdrop-blur-md shadow-inner">
            <span className="block text-2xl sm:text-5xl font-bold text-white font-mono tracking-tight">
              {String(activeTime.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-sky-300/80 uppercase font-medium mt-1 block">
              Days
            </span>
          </div>
          <div className="bg-slate-900/70 rounded-2xl p-3 sm:p-4 border border-sky-500/20 backdrop-blur-md shadow-inner">
            <span className="block text-2xl sm:text-5xl font-bold text-sky-200 font-mono tracking-tight">
              {String(activeTime.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-sky-300/80 uppercase font-medium mt-1 block">
              Hours
            </span>
          </div>
          <div className="bg-slate-900/70 rounded-2xl p-3 sm:p-4 border border-sky-500/20 backdrop-blur-md shadow-inner">
            <span className="block text-2xl sm:text-5xl font-bold text-sky-300 font-mono tracking-tight">
              {String(activeTime.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-sky-300/80 uppercase font-medium mt-1 block">
              Mins
            </span>
          </div>
          <div className="bg-slate-900/70 rounded-2xl p-3 sm:p-4 border border-sky-500/20 backdrop-blur-md shadow-inner">
            <span className="block text-2xl sm:text-5xl font-bold text-sky-400 font-mono tracking-tight animate-pulse">
              {String(activeTime.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-sky-300/80 uppercase font-medium mt-1 block">
              Secs
            </span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="text-[11px] sm:text-xs text-sky-300/70 italic">
            {timerMode === 'countdown'
              ? '✨ Every second brings us closer to December 5, 2026 • 1st Anniversary ✨'
              : '✨ Cherishing every second of our story together since December 5, 2025 ✨'}
          </span>
        </div>
      </div>

      {/* Personal Love Quote Card */}
      <div className="w-full max-w-xl mx-auto glass-card rounded-2xl p-5 text-center relative border border-sky-400/20 mb-8">
        <p className="text-sm sm:text-base italic text-sky-100 font-serif leading-relaxed">
          "{anniversaryData.quotes[currentQuoteIndex]}"
        </p>
        <div className="mt-3 flex items-center justify-center space-x-3">
          <span className="text-xs text-sky-300/70">— {boyfriendName}</span>
          <button
            onClick={handleDrawQuote}
            className="text-xs px-3 py-1 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 transition flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Draw Another Love Note
          </button>
        </div>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 z-20">
        <button
          onClick={onStartStory}
          className="glass-button px-8 py-3.5 rounded-full text-white font-semibold text-sm sm:text-base flex items-center gap-2 group"
        >
          <span>Begin Our Story</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
