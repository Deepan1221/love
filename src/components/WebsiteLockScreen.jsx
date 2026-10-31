import React, { useState, useEffect } from 'react';
import { Lock, Unlock, KeyRound, Heart, Sparkles, Clock, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';
import confetti from 'canvas-confetti';

export default function WebsiteLockScreen({ onUnlock }) {
  const [accessCode, setAccessCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Target unlock date: December 5, 2026 00:00:00
  const anniversaryTimestamp = new Date(`${anniversaryData.couple.anniversaryDate || '2026-12-05'}T00:00:00`).getTime();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasArrived: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = anniversaryTimestamp - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, hasArrived: true });
        // Automatically unlock when December 5 arrives!
        onUnlock();
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, hasArrived: false });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [anniversaryTimestamp, onUnlock]);

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    const cleanInput = accessCode.trim().toLowerCase().replace(/\s+/g, ' ');
    const expectedCode = 'deepan wife suvithra 1221';

    if (cleanInput === expectedCode) {
      setIsUnlocking(true);
      setErrorMessage('');

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#38BDF8', '#60A5FA', '#F472B6', '#FFFFFF', '#F59E0B'],
      });

      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setIsShaking(true);
      setErrorMessage('Access code incorrect. Access is restricted.');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto">
      {/* Background ambient light orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative max-w-xl w-full my-8 bg-slate-900/90 border border-sky-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-sky-500/20 text-center space-y-6">
        {/* Crown & Lock Icon */}
        <div className="flex justify-center">
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-sky-500 to-sky-300 p-0.5 shadow-xl shadow-sky-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/90 rounded-[22px] flex items-center justify-center border border-white/20">
              {isUnlocking ? (
                <Unlock className="w-9 h-9 text-sky-300 animate-bounce" />
              ) : (
                <Lock className="w-9 h-9 text-sky-400 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Section Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-sky-400/30 text-sky-200 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-300" />
          <span>Reserved for Deepan's Queen • Suvithra</span>
        </div>

        {/* Cinematic Title & Message */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Our 1st Anniversary Vault 💖
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto">
            This website is locked and officially opens on <strong className="text-sky-300">December 5, 2026</strong>.
            Enter the private access code to unlock.
          </p>
        </div>

        {/* Live Countdown to December 5 */}
        <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-sky-500/20 shadow-inner">
          <div className="flex items-center justify-center gap-1.5 mb-3 text-xs uppercase tracking-widest text-sky-300 font-semibold">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Opens Automatically In:</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-slate-900/80 rounded-xl p-2.5 sm:p-3 border border-sky-500/15">
              <span className="block text-xl sm:text-3xl font-bold text-white font-mono">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-sky-300/80 uppercase font-medium">Days</span>
            </div>
            <div className="bg-slate-900/80 rounded-xl p-2.5 sm:p-3 border border-sky-500/15">
              <span className="block text-xl sm:text-3xl font-bold text-sky-200 font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-sky-300/80 uppercase font-medium">Hours</span>
            </div>
            <div className="bg-slate-900/80 rounded-xl p-2.5 sm:p-3 border border-sky-500/15">
              <span className="block text-xl sm:text-3xl font-bold text-sky-300 font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-sky-300/80 uppercase font-medium">Mins</span>
            </div>
            <div className="bg-slate-900/80 rounded-xl p-2.5 sm:p-3 border border-sky-500/15">
              <span className="block text-xl sm:text-3xl font-bold text-sky-400 font-mono animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-sky-300/80 uppercase font-medium">Secs</span>
            </div>
          </div>
        </div>

        {/* Access Code Input Form */}
        <form onSubmit={handleUnlockSubmit} className="space-y-4 pt-2">
          <div className={`space-y-1 text-left ${isShaking ? 'animate-shake' : ''}`}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-sky-300 ml-1">
              Enter VIP Access Code:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-400">
                <KeyRound className="w-4 h-4" />
              </div>

              <input
                type={showPassword ? 'text' : 'password'}
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter access code..."
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 focus:border-sky-400 rounded-2xl pl-10 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 justify-center bg-rose-500/10 border border-rose-500/20 py-2 px-3 rounded-xl">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Unlock Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white font-semibold text-sm shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2 transform active:scale-95 transition"
          >
            <Heart className="w-4 h-4 fill-white animate-pulse" />
            <span>Unlock Our Love Story ✨</span>
          </button>
        </form>

        {/* Subtle Romantic Footer without revealing the access code */}
        <div className="pt-2 text-[11px] text-slate-500">
          🔒 Private & Confidential • Made with love for Deepan & Suvithra
        </div>
      </div>
    </div>
  );
}
