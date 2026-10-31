import React, { useState } from 'react';
import { Shield, Sparkles, Heart, Sword, Feather, Zap } from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us';
import confetti from 'canvas-confetti';

export default function AnimeAndCatsSection() {
  const { animeSection, catSection } = anniversaryData;

  // Levi Ackerman state
  const [saluteCount, setSaluteCount] = useState(0);
  const [isSlashing, setIsSlashing] = useState(false);
  const [isDusterActive, setIsDusterActive] = useState(false);

  // Cat section state
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [catSpeech, setCatSpeech] = useState(catSection.cats[0].lines[0]);
  const [petCount, setPetCount] = useState(5);
  const [treatGiven, setTreatGiven] = useState(false);

  // Levi Heart Salute
  const handleLeviSalute = () => {
    setSaluteCount((prev) => prev + 1);
    setIsSlashing(true);

    // Blue and white Scout Legion confetti burst
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#1E40AF', '#38BDF8', '#FFFFFF', '#60A5FA', '#0F172A'],
    });

    setTimeout(() => setIsSlashing(false), 500);
  };

  // Levi Cleaning Duster
  const handleLeviClean = () => {
    setIsDusterActive(true);
    setTimeout(() => setIsDusterActive(false), 1200);
  };

  // Pet Cat
  const handlePetCat = (cat) => {
    setPetCount((prev) => prev + 1);
    const randomLine = cat.lines[Math.floor(Math.random() * cat.lines.length)];
    setCatSpeech(randomLine);

    confetti({
      particleCount: 15,
      spread: 45,
      scalar: 0.8,
      origin: { y: 0.75 },
      colors: ['#F472B6', '#38BDF8', '#FFFFFF'],
    });
  };

  // Feed Cat Treat
  const handleGiveTreat = () => {
    setTreatGiven(true);
    setCatSpeech("YUMMY FISH! *munch munch munch* You're the best ever! 🐟✨");
    setTimeout(() => setTreatGiven(false), 2000);
  };

  const currentCat = catSection.cats[activeCatIndex];

  return (
    <section id="anime-cats" className="py-20 px-4 max-w-7xl mx-auto space-y-24 relative">
      {/* =========================================================================
          PART 1: LEVI ACKERMAN ANIME VISUALS & TRIBUTE
         ========================================================================= */}
      <div>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span>Special Anime Tribute</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            {animeSection.title}
          </h2>
          <p className="text-sky-200/80 text-sm sm:text-base font-light">
            {animeSection.subtitle}
          </p>
        </div>

        {/* Levi Main Feature Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-sky-400/30 shadow-2xl relative overflow-hidden">
          {/* Subtle Scout Crest Watermark */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
            <Shield className="w-96 h-96 text-sky-300" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Scout Legion Wings of Freedom Emblem */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-5">
              <div className="relative group">
                <div
                  className={`w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-slate-900 via-blue-950 to-sky-900 border-2 border-sky-300/40 p-4 flex flex-col items-center justify-center shadow-2xl shadow-blue-500/30 transition-transform ${
                    isSlashing ? 'scale-105 rotate-2' : ''
                  }`}
                >
                  {/* Wings of Freedom Graphic Representation */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Left Wing (White Feather) */}
                    <div className="absolute -left-1 top-2 w-14 h-24 bg-white/90 rounded-tl-full rounded-br-2xl transform -rotate-12 shadow-md border border-slate-300/50 flex flex-col justify-around p-1">
                      <div className="w-full h-1 bg-sky-200/60 rounded"></div>
                      <div className="w-3/4 h-1 bg-sky-200/60 rounded"></div>
                      <div className="w-1/2 h-1 bg-sky-200/60 rounded"></div>
                    </div>
                    {/* Right Wing (Deep Sapphire Blue Feather) */}
                    <div className="absolute -right-1 top-2 w-14 h-24 bg-blue-700/90 rounded-tr-full rounded-bl-2xl transform rotate-12 shadow-md border border-blue-400/50 flex flex-col justify-around p-1">
                      <div className="w-full h-1 bg-blue-300/60 rounded ml-auto"></div>
                      <div className="w-3/4 h-1 bg-blue-300/60 rounded ml-auto"></div>
                      <div className="w-1/2 h-1 bg-blue-300/60 rounded ml-auto"></div>
                    </div>
                    {/* Heart Center */}
                    <div className="relative z-10 w-10 h-10 rounded-full bg-slate-950 border border-sky-300 flex items-center justify-center shadow-lg">
                      <Heart className="w-5 h-5 text-sky-400 fill-sky-400" />
                    </div>
                  </div>

                  <span className="text-xs font-mono tracking-widest text-sky-200 uppercase mt-2 font-bold">
                    Survey Corps • Love Division
                  </span>
                </div>

                {/* Slash animation effect overlay */}
                {isSlashing && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-1 bg-sky-200 transform -rotate-45 shadow-[0_0_20px_#38BDF8] animate-ping" />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleLeviSalute}
                  className="glass-button px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold flex items-center gap-2"
                >
                  <Sword className="w-4 h-4 text-sky-300" />
                  <span>Dedicate Your Heart ({saluteCount})</span>
                </button>

                <button
                  onClick={handleLeviClean}
                  className="px-4 py-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-sky-200 text-xs font-semibold border border-sky-400/20 transition flex items-center gap-1.5"
                >
                  <Feather className="w-3.5 h-3.5 text-sky-400" />
                  <span>Captain's Duster</span>
                </button>
              </div>
            </div>

            {/* Right: Levi Quotes & Relationship Dedication */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-950/70 rounded-2xl p-6 border border-sky-400/20 shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
                    Captain Levi's Word of Wisdom
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span className="text-xs text-slate-400">Humanity's Strongest</span>
                </div>
                <blockquote className="text-lg sm:text-xl font-serif text-white italic leading-relaxed">
                  {animeSection.captainQuote}
                </blockquote>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-sm sm:text-base text-sky-300 font-medium">
                    {animeSection.personalTwist}
                  </p>
                </div>
              </div>

              {/* Chibi Duster Status Box */}
              <div
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                  isDusterActive
                    ? 'bg-sky-500/20 border-sky-400 shadow-lg shadow-sky-500/20'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="text-2xl shrink-0">🧹</div>
                <div className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-white block mb-0.5">
                    {isDusterActive ? '✨ Cleaning in progress! *swoosh swoosh*' : 'Levi’s Worry-Free Guarantee:'}
                  </strong>
                  {animeSection.chibiDusterNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART 2: CUTE ANIMATED CATS PLAYGROUND
         ========================================================================= */}
      <div>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
            <span className="text-base">🐾</span>
            <span>Cute Companions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            {catSection.title}
          </h2>
          <p className="text-sky-200/80 text-sm sm:text-base font-light">
            {catSection.subtitle}
          </p>
        </div>

        {/* Interactive Cat Card */}
        <div className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-sky-400/30 text-center relative">
          {/* Cat Selector Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            {catSection.cats.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCatIndex(idx);
                  setCatSpeech(cat.lines[0]);
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeCatIndex === idx
                    ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/25 border border-sky-300/40'
                    : 'bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/50'
                }`}
              >
                {cat.avatar} {cat.name} ({cat.type})
              </button>
            ))}
          </div>

          {/* Speech Bubble */}
          <div className="inline-block relative bg-white text-slate-900 px-5 py-3 rounded-2xl shadow-xl font-medium text-sm sm:text-base mb-6 animate-float-slow max-w-md">
            <span>{catSpeech}</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45" />
          </div>

          {/* Animated Cat Character Illustration */}
          <div className="relative w-40 h-40 mx-auto my-4 flex items-center justify-center">
            {/* Animated Cat SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full transform hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_10px_25px_rgba(56,189,248,0.3)]"
              onClick={() => handlePetCat(currentCat)}
            >
              {/* Cat Body */}
              <ellipse cx="50" cy="65" rx="30" ry="24" fill={activeCatIndex === 0 ? "#FDE68A" : "#334155"} />
              {/* Cat Head */}
              <circle cx="50" cy="40" r="22" fill={activeCatIndex === 0 ? "#FDE68A" : "#334155"} />
              {/* Ears */}
              <polygon points="32,25 40,40 28,38" fill={activeCatIndex === 0 ? "#F59E0B" : "#1E293B"} />
              <polygon points="68,25 60,40 72,38" fill={activeCatIndex === 0 ? "#F59E0B" : "#1E293B"} />
              {/* Inner ears */}
              <polygon points="33,27 38,38 30,36" fill="#F472B6" />
              <polygon points="67,27 62,38 70,36" fill="#F472B6" />
              {/* Eyes */}
              <circle cx="42" cy="38" r="3" fill="#0F172A" />
              <circle cx="58" cy="38" r="3" fill="#0F172A" />
              <circle cx="43" cy="37" r="1" fill="#FFFFFF" />
              <circle cx="59" cy="37" r="1" fill="#FFFFFF" />
              {/* Nose & Mouth */}
              <polygon points="50,44 47,42 53,42" fill="#F472B6" />
              <path d="M 46 45 Q 50 48 54 45" stroke="#0F172A" strokeWidth="1.5" fill="transparent" />
              {/* Whiskers */}
              <line x1="28" y1="41" x2="38" y2="42" stroke="#64748B" strokeWidth="1.5" />
              <line x1="26" y1="45" x2="38" y2="44" stroke="#64748B" strokeWidth="1.5" />
              <line x1="72" y1="41" x2="62" y2="42" stroke="#64748B" strokeWidth="1.5" />
              <line x1="74" y1="45" x2="62" y2="44" stroke="#64748B" strokeWidth="1.5" />
              {/* Cute heart blush */}
              <circle cx="36" cy="45" r="3" fill="#F472B6" opacity="0.6" />
              <circle cx="64" cy="45" r="3" fill="#F472B6" opacity="0.6" />
              {/* Tail */}
              <path
                d="M 76 65 Q 88 55 84 45"
                stroke={activeCatIndex === 0 ? "#F59E0B" : "#1E293B"}
                strokeWidth="6"
                strokeLinecap="round"
                fill="transparent"
                className="animate-sway"
              />
            </svg>
          </div>

          {/* Purring & Love Stats */}
          <div className="flex items-center justify-center gap-6 my-6 text-xs text-sky-200">
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-sky-400/20">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>Purr Level: {petCount} Happy Purrs</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-full border border-sky-400/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Favorite Toy: {currentCat.favoriteToy}</span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handlePetCat(currentCat)}
              className="glass-button px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Pet {currentCat.name}!</span>
            </button>

            <button
              onClick={handleGiveTreat}
              className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-sky-200 text-xs sm:text-sm font-semibold border border-sky-400/30 transition flex items-center gap-2"
            >
              <span>🐟</span>
              <span>Give Fish Treat</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
