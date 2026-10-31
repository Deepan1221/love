import React, { useState } from 'react';
import {
  Sun,
  Sunset,
  Moon,
  Sparkles,
  Flame,
  Home,
  Trees,
  Bird,
  Bell,
  Heart,
  Flower2,
  Users,
  Baby,
  Milk,
  Dog,
  Cat,
  HeartHandshake,
  X,
  Volume2,
} from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';
import confetti from 'canvas-confetti';

export default function TamilVillageSection() {
  const { tamilVillage } = anniversaryData;
  const [timeOfDay, setTimeOfDay] = useState('sunset'); // 'day', 'sunset', 'night'
  const [lampLit, setLampLit] = useState(true);
  const [birdFlockKey, setBirdFlockKey] = useState(0);
  const [activeSpotlight, setActiveSpotlight] = useState(null);

  // Sound generator using Web Audio API for interactive farm elements
  const playSoundEffect = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      if (type === 'cow') {
        // Gentle warm cow moo
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(155, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(115, ctx.currentTime + 1.2);
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.3);
        osc.start();
        osc.stop(ctx.currentTime + 1.3);
      } else if (type === 'dog') {
        // Playful puppy bark
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.16);
        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else if (type === 'cat') {
        // Sweet kitten meow
        osc.type = 'sine';
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.2);
        osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);
        osc.start();
        osc.stop(ctx.currentTime + 0.7);
      } else if (type === 'hen') {
        // Hen cluck
        osc.type = 'square';
        osc.frequency.setValueAtTime(380, ctx.currentTime);
        osc.frequency.setValueAtTime(420, ctx.currentTime + 0.08);
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } else {
        // Brass temple chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 chime
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
        osc.start();
        osc.stop(ctx.currentTime + 2.5);
      }

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
    } catch {
      // Audio fallback
    }
  };

  const handleSpotlightClick = (key, sound = 'bell') => {
    setActiveSpotlight(key);
    playSoundEffect(sound);

    if (key === 'couple' || key === 'children' || key === 'garden') {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#38BDF8', '#FBBF24', '#34D399', '#FFFFFF'],
      });
    }
  };

  const triggerBirdFlight = () => {
    setBirdFlockKey((prev) => prev + 1);
  };

  // Sky Gradients based on time of day
  const skyBackgrounds = {
    day: 'from-sky-400 via-sky-200 to-emerald-100',
    sunset: 'from-amber-600 via-rose-700 to-indigo-950',
    night: 'from-slate-950 via-indigo-950 to-blue-950',
  };

  const paddyGradients = {
    day: 'from-emerald-500 via-green-600 to-emerald-800',
    sunset: 'from-amber-800 via-emerald-900 to-slate-900',
    night: 'from-emerald-950 via-slate-900 to-slate-950',
  };

  // Detailed modal stories for each homestead member
  const spotlightDetails = {
    couple: {
      title: 'நாம் இருவரும் • Deepan & Suvithra',
      subtitle: 'The Heart & Soul of Our Home',
      icon: '👩🏻‍❤️‍👨🏻',
      desc: 'Sitting lovingly hand-in-hand on the wooden carved thinnai, savoring hot morning filter coffee while listening to the birds sing. Deepan and his Queen Suvithra living their forever dream in peace and endless happiness.',
      tamil: 'திண்ணையில் உன் கையை பிடித்துக்கொண்டு, காலை பில்டர் காபி குடிக்கும் அந்த அமைதியான இன்பம்... நமது காதல் எப்போதுமே நிலைத்திருக்கும்!',
      sound: 'bell',
    },
    children: {
      title: 'நமது செல்லக் குழந்தைகள் • 1 Boy & 1 Girl',
      subtitle: 'Our Future Little Angels',
      icon: '👦🏻👧🏻',
      desc: 'Our precious son running with a colorful pinwheel and our darling daughter giggling in her sweet pattu pavada with jasmine flowers in her hair. Their sweet laughter echoes through the green fields and fills every corner with pure blessing.',
      tamil: 'நமது குட்டி பையனும் குட்டி பொண்ணும் வீட்டு முற்றத்தில் சிரித்து ஓடி விளையாடும் பேரானந்தம்!',
      sound: 'bell',
    },
    cows: {
      title: '2 கறவை பசுக்கள் • Kamadhenu & Nandhini',
      subtitle: 'Gentle Dairy Cows with Brass Bells',
      icon: '🐮🐮',
      desc: 'Two serene cows with brass bells, colorful flower garlands, and kind eyes, grazing happily in the lush green pasture by the coconut trees. Bringing pure milk, prosperity, and sacred abundance to our peaceful abode.',
      tamil: 'கழுத்தில் வெண்கல மணி கட்டிய இரண்டு பாசமான பசு மாடுகள் நமது வீட்டுக்கு லட்சுமி கடாட்சம் சேர்க்கும்!',
      sound: 'cow',
    },
    dogs: {
      title: '2 செல்ல நாய்கள் • Mani & Bhairava',
      subtitle: 'Loyal Companions & Protectors',
      icon: '🐶🐶',
      desc: 'Two faithful village dogs with energetic wagging tails guarding our farmhouse gate, playing joyous games of chase with our children, and sleeping faithfully near our doorsteps.',
      tamil: 'வாலாட்டி விளையாடும் இரண்டு பாசமான நாட்டு நாய்க்குட்டிகள் நமது வீட்டின் சிறந்த காவலர்கள்!',
      sound: 'dog',
    },
    cats: {
      title: '2 செல்லப் பூனைகள் • Mia & Levi',
      subtitle: 'Cozy Sunlit Companions',
      icon: '🐱🐱',
      desc: 'Two fluffy kittens purring peacefully, taking warm sun-dappled naps on the terracotta roof tiles and stretching lazily on the wooden thinnai steps.',
      tamil: 'திண்ணை படிக்கட்டில் சுகமாக படுத்து உருளும் இரண்டு செல்ல பூனைக்குட்டிகள்!',
      sound: 'cat',
    },
    hens: {
      title: '2 நாட்டு கோழிகள் • Chutti & Bubbly',
      subtitle: 'Cheerful Morning Cluckers',
      icon: '🐔🐔',
      desc: 'Two colorful country hens with bright red crests pecking grains along the clay garden path, clucking merrily in the golden sunrise and bringing rustic country charm.',
      tamil: 'காலை விடியலில் முற்றத்தில் தானியங்களை கொத்தித் தின்னும் இரண்டு சுட்டி நாட்டு கோழிகள்!',
      sound: 'hen',
    },
    garden: {
      title: 'பூந்தோட்டம் & துளசி • Suvithra’s Garden',
      subtitle: 'Fragrant Jasmine, Roses, Marigolds & Veggies',
      icon: '🌸🌿',
      desc: 'A vibrant garden planted with love: fragrant Madurai Malligai (jasmine) for Suvithra’s hair, velvety red roses, golden marigolds, holy Tulsi madam with glowing deepam, and healthy green vegetable vines.',
      tamil: 'சுவித்ராவின் கைவண்ணத்தில் மலர்ந்த மல்லிகை, ரோஜா, துளசி மாடம் மற்றும் பசுமையான காய்கறி தோட்டம்!',
      sound: 'bell',
    },
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-rose-300" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-sky-300" />;
      case 'Milk':
        return <Milk className="w-5 h-5 text-amber-300" />;
      case 'Dog':
        return <Dog className="w-5 h-5 text-orange-300" />;
      case 'Cat':
        return <Cat className="w-5 h-5 text-purple-300" />;
      case 'Bird':
        return <Bird className="w-5 h-5 text-emerald-300" />;
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-pink-300" />;
      case 'Home':
      default:
        return <Home className="w-5 h-5 text-emerald-300" />;
    }
  };

  return (
    <section id="village" className="py-20 px-4 max-w-7xl mx-auto relative">
      {/* Section Header with Tamil Calligraphy */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <Trees className="w-3.5 h-3.5" />
          <span>Our Future Haven & Family Homestead</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          {tamilVillage.tamilTitle}
        </h2>
        <h3 className="text-xl sm:text-2xl font-serif text-sky-200 font-light italic">
          {tamilVillage.englishTitle}
        </h3>
        <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl mx-auto">
          {tamilVillage.englishSubtitle}
        </p>

        {/* Quick Homestead Member Badges (Click to highlight in the scene!) */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'couple', label: '👩🏻‍❤️‍👨🏻 Me & Her (Deepan & Suvithra)', sound: 'bell' },
            { id: 'children', label: '👦🏻👧🏻 1 Boy & 1 Girl', sound: 'bell' },
            { id: 'cows', label: '🐮 2 Cows', sound: 'cow' },
            { id: 'dogs', label: '🐶 2 Dogs', sound: 'dog' },
            { id: 'cats', label: '🐱 2 Cats', sound: 'cat' },
            { id: 'hens', label: '🐔 2 Hens', sound: 'hen' },
            { id: 'garden', label: '🌸 Blooming Garden', sound: 'bell' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleSpotlightClick(item.id, item.sound)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                activeSpotlight === item.id
                  ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/30 scale-105 border border-white/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Atmospheric Time of Day Selector */}
      <div className="flex justify-center items-center gap-2 mb-8">
        <span className="text-xs text-sky-300 mr-2 font-medium">Sky Atmosphere:</span>
        <button
          onClick={() => setTimeOfDay('day')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
            timeOfDay === 'day'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/30'
              : 'glass-card text-slate-300 hover:text-white'
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Morning Daylight</span>
        </button>
        <button
          onClick={() => setTimeOfDay('sunset')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
            timeOfDay === 'sunset'
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'glass-card text-slate-300 hover:text-white'
          }`}
        >
          <Sunset className="w-3.5 h-3.5" />
          <span>Golden Sunset</span>
        </button>
        <button
          onClick={() => setTimeOfDay('night')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 ${
            timeOfDay === 'night'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
              : 'glass-card text-slate-300 hover:text-white'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Starlit Twilight</span>
        </button>
      </div>

      {/* The Panoramic Tamil Village Farmhouse Illustration */}
      <div className="relative rounded-3xl overflow-hidden border border-sky-400/30 shadow-2xl transition-all duration-700">
        <div
          className={`relative w-full h-[520px] sm:h-[620px] bg-gradient-to-b ${skyBackgrounds[timeOfDay]} transition-all duration-1000 overflow-hidden flex flex-col justify-end`}
        >
          {/* Celestial Body: Sun or Moon */}
          <div className="absolute top-10 right-16 sm:right-28 transition-all duration-1000">
            {timeOfDay === 'day' && (
              <div className="w-20 h-20 rounded-full bg-amber-300 shadow-[0_0_60px_#f59e0b] animate-pulse" />
            )}
            {timeOfDay === 'sunset' && (
              <div className="w-24 h-24 rounded-full bg-gradient-to-t from-rose-500 to-amber-400 shadow-[0_0_80px_#fb923c]" />
            )}
            {timeOfDay === 'night' && (
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-slate-100 shadow-[0_0_50px_#ffffff]" />
                <div className="absolute -top-6 -left-32 text-white text-xs opacity-80">✨</div>
                <div className="absolute top-12 -left-48 text-white text-xs opacity-70">✨</div>
                <div className="absolute -top-4 -left-64 text-white text-xs opacity-90">⭐</div>
              </div>
            )}
          </div>

          {/* Distant Hills & Mountain Silhouettes */}
          <svg
            className="absolute bottom-52 left-0 right-0 w-full h-44 opacity-75 transition-opacity duration-700"
            preserveAspectRatio="none"
            viewBox="0 0 1200 200"
          >
            <path
              d="M0,140 Q300,50 600,110 T1200,80 L1200,200 L0,200 Z"
              fill={timeOfDay === 'day' ? '#047857' : timeOfDay === 'sunset' ? '#4c1d95' : '#0f172a'}
            />
          </svg>

          {/* Animated Flocking Birds in the Sky */}
          <div
            key={birdFlockKey}
            onClick={triggerBirdFlight}
            className="absolute top-14 left-10 sm:left-24 flex items-center gap-6 cursor-pointer animate-float-slow z-10"
            title="Click to watch birds soar"
          >
            <svg className="w-7 h-5 text-slate-800 dark:text-slate-300" viewBox="0 0 30 20" fill="currentColor">
              <path d="M 0 10 Q 7 0 15 10 Q 22 0 30 10 Q 22 5 15 15 Q 7 5 0 10 Z" />
            </svg>
            <svg className="w-5 h-4 text-slate-800 dark:text-slate-300 mt-2" viewBox="0 0 30 20" fill="currentColor">
              <path d="M 0 10 Q 7 0 15 10 Q 22 0 30 10 Q 22 5 15 15 Q 7 5 0 10 Z" />
            </svg>
            <svg className="w-4 h-3 text-slate-800 dark:text-slate-300 -mt-2" viewBox="0 0 30 20" fill="currentColor">
              <path d="M 0 10 Q 7 0 15 10 Q 22 0 30 10 Q 22 5 15 15 Q 7 5 0 10 Z" />
            </svg>
          </div>

          {/* Lush Green Farmland / Paddy Fields (பச்சை பசேல் வயல்) */}
          <div
            className={`w-full h-72 sm:h-80 bg-gradient-to-t ${paddyGradients[timeOfDay]} relative transition-all duration-1000`}
          >
            {/* Swaying coconut trees (Left & Right) */}
            <div className="absolute -top-52 left-4 sm:left-12 w-28 sm:w-36 pointer-events-none">
              <svg viewBox="0 0 100 200" className="w-full h-full animate-sway">
                <path d="M 50 200 Q 55 120 48 40" stroke="#78350F" strokeWidth="8" fill="transparent" />
                <path d="M 48 40 Q 10 20 0 60" stroke="#15803D" strokeWidth="6" fill="transparent" />
                <path d="M 48 40 Q 30 5 45 -10" stroke="#16A34A" strokeWidth="6" fill="transparent" />
                <path d="M 48 40 Q 80 10 95 50" stroke="#15803D" strokeWidth="6" fill="transparent" />
                <path d="M 48 40 Q 75 35 90 75" stroke="#16A34A" strokeWidth="5" fill="transparent" />
                <path d="M 48 40 Q 15 40 5 80" stroke="#15803D" strokeWidth="5" fill="transparent" />
              </svg>
            </div>

            <div className="absolute -top-48 right-6 sm:right-16 w-24 sm:w-32 pointer-events-none">
              <svg viewBox="0 0 100 200" className="w-full h-full animate-sway delay-150">
                <path d="M 50 200 Q 45 120 52 40" stroke="#78350F" strokeWidth="7" fill="transparent" />
                <path d="M 52 40 Q 85 20 95 60" stroke="#15803D" strokeWidth="5" fill="transparent" />
                <path d="M 52 40 Q 70 5 55 -10" stroke="#16A34A" strokeWidth="5" fill="transparent" />
                <path d="M 52 40 Q 20 10 5 50" stroke="#15803D" strokeWidth="5" fill="transparent" />
              </svg>
            </div>

            {/* TRADITIONAL TAMIL FARMHOUSE (ஓட்டு வீடு & திண்ணை) */}
            <div className="absolute -top-36 sm:-top-40 left-1/2 -translate-x-1/2 w-[340px] sm:w-[460px] z-10">
              <svg viewBox="0 0 360 210" className="w-full h-auto drop-shadow-2xl">
                {/* Terracotta tiled roof (ஓட்டு கூரை) */}
                <polygon points="180,15 15,70 345,70" fill="#B91C1C" />
                <polygon points="180,15 5,70 355,70" fill="#991B1B" opacity="0.6" />
                {/* Tile ridges */}
                <line x1="180" y1="15" x2="60" y2="70" stroke="#7F1D1D" strokeWidth="2.5" />
                <line x1="180" y1="15" x2="110" y2="70" stroke="#7F1D1D" strokeWidth="2.5" />
                <line x1="180" y1="15" x2="180" y2="70" stroke="#7F1D1D" strokeWidth="2.5" />
                <line x1="180" y1="15" x2="250" y2="70" stroke="#7F1D1D" strokeWidth="2.5" />
                <line x1="180" y1="15" x2="300" y2="70" stroke="#7F1D1D" strokeWidth="2.5" />

                {/* Main house wall */}
                <rect x="35" y="70" width="290" height="95" fill="#FEF3C7" />

                {/* Wooden carved pillars supporting the Thinnai (திண்ணை தூண்கள்) */}
                <rect x="45" y="70" width="10" height="90" fill="#78350F" rx="2" />
                <rect x="115" y="70" width="10" height="90" fill="#78350F" rx="2" />
                <rect x="235" y="70" width="10" height="90" fill="#78350F" rx="2" />
                <rect x="305" y="70" width="10" height="90" fill="#78350F" rx="2" />

                {/* Traditional Wooden doorway */}
                <rect x="165" y="80" width="30" height="75" fill="#92400E" rx="3" />
                <circle cx="190" cy="115" r="2.5" fill="#FBBF24" />

                {/* Raised stone Thinnai base (திண்ணை தளம்) */}
                <rect x="25" y="155" width="310" height="18" fill="#D97706" rx="3" />
                {/* Steps */}
                <rect x="145" y="173" width="70" height="12" fill="#B45309" rx="2" />

                {/* Kolam on the ground at entrance */}
                <ellipse cx="180" cy="190" rx="28" ry="5" fill="#FFFFFF" opacity="0.85" />

                {/* Traditional Kuthuvilakku Brass Lamp */}
                <rect x="215" y="132" width="4" height="23" fill="#F59E0B" />
                <circle cx="217" cy="129" r="4.5" fill="#FBBF24" />
                {lampLit && (
                  <circle cx="217" cy="125" r="3.5" fill="#EF4444" className="animate-ping opacity-75" />
                )}

                {/* ============================================================ */}
                {/* 1. ME AND HER (Deepan & Suvithra sitting on the Thinnai) */}
                {/* ============================================================ */}
                <g
                  onClick={() => handleSpotlightClick('couple', 'bell')}
                  className="cursor-pointer group transform hover:scale-105 transition-transform origin-bottom"
                >
                  {/* Floating Love Heart over the couple */}
                  <path
                    d="M 90 92 C 90 85 82 82 78 87 C 74 82 66 85 66 92 C 66 100 78 106 78 106 C 78 106 90 100 90 92 Z"
                    fill="#F43F5E"
                    className="animate-pulse"
                  />

                  {/* Deepan (sitting on left thinnai) */}
                  {/* Head */}
                  <circle cx="68" cy="115" r="7" fill="#FBBF24" />
                  {/* Hair */}
                  <path d="M 61 114 Q 68 106 75 114 Z" fill="#1E293B" />
                  {/* Blue silk shirt */}
                  <path d="M 60 122 L 76 122 L 78 145 L 58 145 Z" fill="#2563EB" />
                  {/* White dhoti / seated posture */}
                  <rect x="56" y="145" width="22" height="12" fill="#F8FAFC" rx="2" />

                  {/* Suvithra (sitting right beside Deepan) */}
                  {/* Head */}
                  <circle cx="85" cy="116" r="6.5" fill="#FBBF24" />
                  {/* Long hair with jasmine flowers (மல்லிகைப்பூ) */}
                  <path d="M 79 116 Q 85 108 92 116 L 94 135 L 77 135 Z" fill="#0F172A" />
                  <circle cx="80" cy="113" r="2.5" fill="#FFFFFF" />
                  <circle cx="83" cy="111" r="2.5" fill="#FFFFFF" />
                  <circle cx="86" cy="111" r="2.5" fill="#FFFFFF" />
                  {/* Pink/Red traditional saree & pallu */}
                  <path d="M 77 123 L 93 123 L 95 145 L 75 145 Z" fill="#E11D48" />
                  <rect x="74" y="145" width="22" height="12" fill="#BE123C" rx="2" />

                  {/* Deepan's arm around Suvithra */}
                  <line x1="72" y1="126" x2="84" y2="128" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
                </g>

                {/* ============================================================ */}
                {/* 2. 2 CATS (🐱🐱 Napping & Lounging on the Thinnai steps) */}
                {/* ============================================================ */}
                <g
                  onClick={() => handleSpotlightClick('cats', 'cat')}
                  className="cursor-pointer group transform hover:scale-110 transition-transform"
                >
                  {/* Cat 1: Ginger Cat curled up on step */}
                  <ellipse cx="130" cy="162" rx="6" ry="4.5" fill="#F97316" />
                  <circle cx="125" cy="160" r="3.5" fill="#EA580C" />
                  <polygon points="123,158 125,155 126,158" fill="#C2410C" />
                  <polygon points="126,158 128,155 129,158" fill="#C2410C" />
                  {/* Cat tail */}
                  <path d="M 136 162 Q 139 158 136 156" stroke="#EA580C" strokeWidth="1.5" fill="none" />

                  {/* Cat 2: Grey Tabby sitting upright near pillar */}
                  <ellipse cx="255" cy="150" rx="4" ry="7" fill="#64748B" />
                  <circle cx="255" cy="141" r="4" fill="#475569" />
                  <polygon points="252,139 253,136 255,139" fill="#334155" />
                  <polygon points="255,139 257,136 258,139" fill="#334155" />
                  <path d="M 259 152 Q 263 148 261 144" stroke="#475569" strokeWidth="1.5" fill="none" />
                </g>
              </svg>
            </div>

            {/* ================================================================ */}
            {/* 3. THE 2 COWS (🐮🐮 Grazing peacefully on the Left Pasture) */}
            {/* ================================================================ */}
            <div
              onClick={() => handleSpotlightClick('cows', 'cow')}
              className="absolute bottom-16 sm:bottom-20 left-4 sm:left-12 z-20 cursor-pointer group hover:scale-105 transition-transform"
              title="Click to hear 2 gentle cows"
            >
              <svg viewBox="0 0 160 110" className="w-32 sm:w-44 h-auto drop-shadow-xl">
                {/* Cow 1: Mother Dairy Cow (காமதேனு) */}
                <ellipse cx="85" cy="65" rx="32" ry="22" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
                {/* Gray patches on cow */}
                <path d="M 70 52 Q 80 48 85 58 Q 78 68 68 64 Z" fill="#94A3B8" />
                <path d="M 95 60 Q 105 58 108 68 Q 98 75 92 68 Z" fill="#94A3B8" />
                {/* Legs */}
                <rect x="65" y="82" width="6" height="22" fill="#E2E8F0" rx="2" />
                <rect x="75" y="82" width="6" height="22" fill="#CBD5E1" rx="2" />
                <rect x="95" y="82" width="6" height="22" fill="#E2E8F0" rx="2" />
                <rect x="105" y="82" width="6" height="22" fill="#CBD5E1" rx="2" />
                {/* Cow Head */}
                <ellipse cx="50" cy="50" rx="14" ry="12" fill="#F8FAFC" />
                <ellipse cx="40" cy="54" rx="7" ry="6" fill="#FBCFE8" />
                {/* Eyes */}
                <circle cx="48" cy="46" r="2.5" fill="#0F172A" />
                {/* Horns */}
                <path d="M 52 40 Q 56 30 50 25" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 58 42 Q 65 34 62 28" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Ears */}
                <ellipse cx="60" cy="48" rx="6" ry="3" fill="#F8FAFC" transform="rotate(20 60 48)" />
                {/* Red collar garland with golden brass bell */}
                <path d="M 56 56 Q 59 64 64 62" stroke="#DC2626" strokeWidth="3" fill="none" />
                <circle cx="61" cy="65" r="3.5" fill="#F59E0B" />
                {/* Tail with tuft */}
                <path d="M 115 60 Q 124 75 120 90" stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
                <ellipse cx="120" cy="92" rx="3" ry="5" fill="#475569" />

                {/* Cow 2: Companion cow resting behind (நந்தினி) */}
                <ellipse cx="130" cy="72" rx="22" ry="15" fill="#FEF3C7" opacity="0.9" />
                <ellipse cx="112" cy="62" rx="10" ry="8" fill="#FEF3C7" opacity="0.9" />
                <ellipse cx="106" cy="65" rx="5" ry="4" fill="#FBCFE8" opacity="0.9" />
                <circle cx="112" cy="60" r="1.8" fill="#0F172A" />
                <path d="M 114 55 Q 118 48 115 45" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="120" cy="72" r="2.5" fill="#F59E0B" />
              </svg>
            </div>

            {/* ================================================================ */}
            {/* 4. 1 LITTLE BOY & 1 LITTLE GIRL (👦🏻👧🏻 Playing in the Courtyard) */}
            {/* ================================================================ */}
            <div
              onClick={() => handleSpotlightClick('children', 'bell')}
              className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 cursor-pointer group hover:scale-105 transition-transform"
              title="Click to see our cute little boy and girl"
            >
              <div className="flex items-end gap-5 sm:gap-7">
                {/* Little Boy (Running joyfully with a pinwheel) */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    {/* Toy Pinwheel */}
                    <div className="absolute -top-7 -right-4 w-6 h-6 animate-spin">
                      <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-sky-400 p-0.5 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="w-0.5 h-6 bg-amber-800 mx-auto -mt-1" />
                    </div>

                    <svg viewBox="0 0 50 85" className="w-10 sm:w-14 h-auto drop-shadow-lg">
                      {/* Head */}
                      <circle cx="25" cy="18" r="11" fill="#FBBF24" />
                      {/* Short cute boy hair */}
                      <path d="M 14 18 Q 25 7 36 18 Z" fill="#0F172A" />
                      {/* Big bright eyes & smile */}
                      <circle cx="22" cy="17" r="1.5" fill="#0F172A" />
                      <circle cx="28" cy="17" r="1.5" fill="#0F172A" />
                      <path d="M 22 23 Q 25 26 28 23" stroke="#DC2626" strokeWidth="1.2" fill="none" />
                      {/* Yellow / Golden Kurta Shirt */}
                      <path d="M 15 29 L 35 29 L 38 56 L 12 56 Z" fill="#F59E0B" rx="3" />
                      {/* White Pattu Dhoti */}
                      <rect x="14" y="56" width="10" height="20" fill="#FFFFFF" rx="2" />
                      <rect x="26" y="56" width="10" height="20" fill="#FFFFFF" rx="2" />
                      {/* Feet */}
                      <ellipse cx="18" cy="78" rx="4" ry="2" fill="#FBBF24" />
                      <ellipse cx="32" cy="78" rx="4" ry="2" fill="#FBBF24" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-amber-300 font-semibold mt-0.5 bg-slate-950/80 px-2 py-0.5 rounded-full border border-amber-400/30">
                    Boy 👦🏻
                  </span>
                </div>

                {/* Little Girl (In traditional pattu pavada with flowers) */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    {/* Flower in hair */}
                    <div className="absolute -top-1 left-0 text-[10px] animate-pulse">🌸</div>

                    <svg viewBox="0 0 50 85" className="w-10 sm:w-14 h-auto drop-shadow-lg">
                      {/* Head */}
                      <circle cx="25" cy="18" r="10.5" fill="#FBBF24" />
                      {/* Twin cute ponytails / hair with flowers */}
                      <path d="M 14 18 Q 25 7 36 18 Z" fill="#0F172A" />
                      <circle cx="13" cy="16" r="3.5" fill="#0F172A" />
                      <circle cx="37" cy="16" r="3.5" fill="#0F172A" />
                      {/* Cute face */}
                      <circle cx="22" cy="17" r="1.5" fill="#0F172A" />
                      <circle cx="28" cy="17" r="1.5" fill="#0F172A" />
                      <path d="M 22 22 Q 25 25 28 22" stroke="#DC2626" strokeWidth="1.2" fill="none" />
                      {/* Green silk blouse */}
                      <path d="M 16 29 L 34 29 L 36 44 L 14 44 Z" fill="#16A34A" rx="2" />
                      {/* Bright magenta Pattu Pavada (skirt) */}
                      <polygon points="25,44 7,74 43,74" fill="#DB2777" />
                      <rect x="7" y="70" width="36" height="4" fill="#F59E0B" />
                      {/* Little feet */}
                      <ellipse cx="20" cy="77" rx="3.5" ry="2" fill="#FBBF24" />
                      <ellipse cx="30" cy="77" rx="3.5" ry="2" fill="#FBBF24" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-pink-300 font-semibold mt-0.5 bg-slate-950/80 px-2 py-0.5 rounded-full border border-pink-400/30">
                    Girl 👧🏻
                  </span>
                </div>
              </div>
            </div>

            {/* ================================================================ */}
            {/* 5. 2 LOYAL DOGS (🐶🐶 In the Courtyard) */}
            {/* ================================================================ */}
            <div
              onClick={() => handleSpotlightClick('dogs', 'dog')}
              className="absolute bottom-12 sm:bottom-16 left-32 sm:left-64 z-20 cursor-pointer group hover:scale-110 transition-transform"
              title="Click to hear 2 loyal dogs bark"
            >
              <svg viewBox="0 0 90 60" className="w-16 sm:w-24 h-auto drop-shadow-md">
                {/* Dog 1: Standing proud and wagging tail (Mani) */}
                <ellipse cx="35" cy="35" rx="14" ry="9" fill="#D97706" />
                <rect x="25" y="42" width="3.5" height="14" fill="#B45309" rx="1.5" />
                <rect x="31" y="42" width="3.5" height="14" fill="#B45309" rx="1.5" />
                <rect x="40" y="42" width="3.5" height="14" fill="#B45309" rx="1.5" />
                <rect x="46" y="42" width="3.5" height="14" fill="#B45309" rx="1.5" />
                {/* Head */}
                <circle cx="20" cy="27" r="7" fill="#D97706" />
                <ellipse cx="14" cy="29" rx="4" ry="3" fill="#B45309" />
                <circle cx="12" cy="28" r="1.2" fill="#000000" />
                <circle cx="19" cy="25" r="1.2" fill="#000000" />
                <polygon points="21,21 24,14 26,21" fill="#92400E" />
                {/* Wagging Tail */}
                <path d="M 48 33 Q 56 24 53 18" stroke="#D97706" strokeWidth="2.5" fill="none" className="animate-wiggle" />

                {/* Dog 2: Cute puppy sitting happily (Bhairava) */}
                <ellipse cx="72" cy="40" rx="9" ry="8" fill="#F59E0B" />
                <circle cx="66" cy="32" r="5" fill="#F59E0B" />
                <ellipse cx="62" cy="34" rx="3" ry="2" fill="#B45309" />
                <circle cx="61" cy="33" r="1" fill="#000000" />
                <circle cx="65" cy="30" r="1" fill="#000000" />
                <polygon points="67,28 69,23 71,28" fill="#B45309" />
                <path d="M 79 43 Q 83 38 82 34" stroke="#F59E0B" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* ================================================================ */}
            {/* 6. 2 HENS (🐔🐔 Pecking grains by the Garden pathway) */}
            {/* ================================================================ */}
            <div
              onClick={() => handleSpotlightClick('hens', 'hen')}
              className="absolute bottom-10 sm:bottom-14 right-44 sm:right-64 z-20 cursor-pointer group hover:scale-110 transition-transform"
              title="Click to hear 2 cheerful country hens"
            >
              <svg viewBox="0 0 65 40" className="w-12 sm:w-16 h-auto drop-shadow-sm">
                {/* Hen 1: Reddish country hen pecking ground */}
                <ellipse cx="20" cy="22" rx="9" ry="7" fill="#DC2626" />
                <circle cx="11" cy="26" r="4.5" fill="#B91C1C" />
                {/* Beak */}
                <polygon points="6,27 10,25 10,29" fill="#FBBF24" />
                {/* Red crest */}
                <polygon points="11,21 13,17 14,21" fill="#EF4444" />
                {/* Little legs */}
                <line x1="18" y1="28" x2="16" y2="36" stroke="#F59E0B" strokeWidth="1.5" />
                <line x1="22" y1="28" x2="23" y2="36" stroke="#F59E0B" strokeWidth="1.5" />

                {/* Hen 2: Brown/Golden hen */}
                <ellipse cx="48" cy="20" rx="8" ry="6" fill="#D97706" />
                <circle cx="41" cy="16" r="4" fill="#B45309" />
                <polygon points="36,17 40,15 40,19" fill="#FBBF24" />
                <polygon points="41,12 43,8 44,12" fill="#EF4444" />
                <line x1="46" y1="26" x2="45" y2="34" stroke="#F59E0B" strokeWidth="1.5" />
                <line x1="50" y1="26" x2="52" y2="34" stroke="#F59E0B" strokeWidth="1.5" />
              </svg>
            </div>

            {/* ================================================================ */}
            {/* 7. BLOOMING FLOWER & TULSI GARDEN (🌸🌿 Right Foreground) */}
            {/* ================================================================ */}
            <div
              onClick={() => handleSpotlightClick('garden', 'bell')}
              className="absolute bottom-6 sm:bottom-8 right-4 sm:right-12 z-20 cursor-pointer group hover:scale-105 transition-transform"
              title="Click to explore Suvithra's flower garden"
            >
              <div className="relative">
                {/* Animated fluttering butterfly */}
                <div className="absolute -top-7 left-4 text-xs animate-bounce">🦋</div>
                <div className="absolute -top-5 right-2 text-xs animate-pulse delay-100">🌸</div>

                <svg viewBox="0 0 160 110" className="w-32 sm:w-44 h-auto drop-shadow-xl">
                  {/* Traditional Tulsi Madam (துளசி மாடம்) */}
                  <rect x="25" y="55" width="26" height="35" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" rx="2" />
                  <rect x="22" y="50" width="32" height="6" fill="#D97706" rx="1.5" />
                  {/* Small alcove with burning deepam lamp */}
                  <rect x="33" y="68" width="10" height="12" fill="#475569" rx="3" />
                  <circle cx="38" cy="74" r="2.5" fill="#F59E0B" />
                  <circle cx="38" cy="72" r="1.5" fill="#EF4444" className="animate-ping" />
                  {/* Sacred Tulsi plant growing on top */}
                  <path d="M 38 50 Q 32 38 28 35" stroke="#15803D" strokeWidth="2" fill="none" />
                  <path d="M 38 50 Q 38 32 38 28" stroke="#16A34A" strokeWidth="2.5" fill="none" />
                  <path d="M 38 50 Q 44 38 48 35" stroke="#15803D" strokeWidth="2" fill="none" />
                  <circle cx="28" cy="35" r="2.5" fill="#16A34A" />
                  <circle cx="38" cy="27" r="3" fill="#15803D" />
                  <circle cx="48" cy="35" r="2.5" fill="#16A34A" />

                  {/* Lush Flower Bushes (Jasmine, Roses & Marigolds) */}
                  {/* Jasmine Bush (மல்லிகைப்பூ புதர்) */}
                  <ellipse cx="80" cy="75" rx="22" ry="16" fill="#15803D" />
                  <circle cx="72" cy="70" r="3" fill="#FFFFFF" />
                  <circle cx="82" cy="65" r="3" fill="#FFFFFF" />
                  <circle cx="88" cy="72" r="3" fill="#FFFFFF" />
                  <circle cx="76" cy="80" r="3" fill="#FFFFFF" />
                  <circle cx="85" cy="82" r="3" fill="#FFFFFF" />

                  {/* Crimson Rose Bush (ரோஜா புதர்) */}
                  <ellipse cx="115" cy="70" rx="18" ry="15" fill="#166534" />
                  <circle cx="110" cy="64" r="4" fill="#E11D48" />
                  <circle cx="122" cy="66" r="4" fill="#E11D48" />
                  <circle cx="115" cy="75" r="3.5" fill="#BE123C" />

                  {/* Golden Marigold Flowers (சாமந்தி) */}
                  <circle cx="138" cy="80" r="4.5" fill="#F59E0B" />
                  <circle cx="145" cy="75" r="4" fill="#FBBF24" />
                  <circle cx="100" cy="85" r="3.5" fill="#F59E0B" />
                  <circle cx="62" cy="85" r="3" fill="#F43F5E" />
                </svg>
              </div>
            </div>

            {/* Clay Village Pathway */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#854d0e] opacity-80" />
          </div>

          {/* Foreground Interactive Hotspot Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 z-30">
            <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/30 text-amber-200 text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>குத்துவிளக்கு: {lampLit ? 'சுடரொளி வீசுகிறது ✨' : 'அணைந்துள்ளது'}</span>
              <button
                onClick={() => setLampLit(!lampLit)}
                className="ml-2 text-[10px] uppercase font-bold text-sky-300 underline hover:text-white"
              >
                {lampLit ? 'Extinguish' : 'Light Lamp'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => playSoundEffect('bell')}
                className="glass-button px-4 py-2 rounded-full text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5 text-amber-300" />
                <span>Ring Temple Bell 🔔</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP MODAL: Interactive Character / Animal Spotlight Card */}
      {activeSpotlight && spotlightDetails[activeSpotlight] && (
        <div
          onClick={() => setActiveSpotlight(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-slate-900 border border-emerald-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-center"
          >
            <button
              onClick={() => setActiveSpotlight(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-5xl my-2">
              {spotlightDetails[activeSpotlight].icon}
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {spotlightDetails[activeSpotlight].title}
              </h3>
              <p className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                {spotlightDetails[activeSpotlight].subtitle}
              </p>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {spotlightDetails[activeSpotlight].desc}
            </p>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 text-xs text-emerald-200 font-medium italic">
              "{spotlightDetails[activeSpotlight].tamil}"
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => playSoundEffect(spotlightDetails[activeSpotlight].sound)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Hear Sound</span>
              </button>

              <button
                onClick={() => {
                  confetti({ particleCount: 30, spread: 50 });
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Shower Love 💖</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Highlights Grid (All 8 Homestead Features) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {tamilVillage.features.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              const keys = ['couple', 'children', 'cows', 'dogs', 'cats', 'hens', 'garden', 'couple'];
              handleSpotlightClick(keys[idx], spotlightDetails[keys[idx]]?.sound || 'bell');
            }}
            className="glass-card rounded-2xl p-5 border border-sky-400/20 hover:border-emerald-400/50 transition transform hover:-translate-y-1.5 cursor-pointer shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mb-3">
              {renderIcon(item.icon)}
            </div>
            <h4 className="font-serif font-bold text-white text-base mb-1.5">{item.name}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Poetic Love Verse Card */}
      <div className="mt-12 glass-panel rounded-3xl p-8 border border-emerald-400/30 text-center max-w-3xl mx-auto space-y-3">
        <p className="text-xl sm:text-2xl font-serif font-bold text-emerald-200 tracking-wide">
          {tamilVillage.quote}
        </p>
        <p className="text-sm text-sky-200/90 italic">{tamilVillage.quoteTranslation}</p>
        <div className="pt-3">
          <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">
            Dedicated with all my heart to my Queen Suvithra — Deepan 💙
          </span>
        </div>
      </div>
    </section>
  );
}
