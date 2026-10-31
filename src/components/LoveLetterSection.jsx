import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Send, Award, PartyPopper } from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';
import confetti from 'canvas-confetti';

export default function LoveLetterSection() {
  const { loveLetter } = anniversaryData;
  const [isOpen, setIsOpen] = useState(false);
  const [hasPledged, setHasPledged] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    // Sweet romantic burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#BAE6FD', '#FFFFFF', '#F472B6'],
    });
  };

  const handleForeverPledge = () => {
    setHasPledged(true);

    // Multi-stage fireworks confetti celebration!
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#38BDF8', '#FFFFFF', '#60A5FA', '#F59E0B', '#F472B6'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section id="letter" className="py-24 px-4 max-w-4xl mx-auto relative min-h-screen flex flex-col items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>The Final Surprise</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          A Heartfelt Letter for You
        </h2>
        <p className="text-sky-200/80 text-sm sm:text-base font-light">
          Written with all my heart on our 1st Anniversary. Sealed with love, just waiting for your touch.
        </p>
      </div>

      {!isOpen ? (
        /* WAX-SEALED ENVELOPE INTERACTIVE CARD */
        <div className="w-full max-w-md mx-auto perspective-1000">
          <div
            onClick={handleOpenLetter}
            className="group cursor-pointer relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 sm:p-10 border-2 border-sky-400/40 shadow-2xl shadow-blue-900/40 transform hover:-translate-y-2 transition-all duration-500 flex flex-col items-center justify-center text-center overflow-hidden"
          >
            {/* Envelope flap lines */}
            <div className="absolute inset-0 border-b border-sky-400/10 pointer-events-none" />

            {/* Glowing Wax Seal Stamp */}
            <div className="relative my-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 via-sky-500 to-blue-700 shadow-[0_0_35px_rgba(56,189,248,0.6)] flex items-center justify-center border-4 border-sky-200/80 transform group-hover:scale-110 transition-transform">
                <span className="text-base font-serif font-bold text-white tracking-wider">
                  {loveLetter.envelopeSeal}
                </span>
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-spin" />
            </div>

            <h3 className="text-xl font-serif font-bold text-white mt-2 group-hover:text-sky-300 transition">
              Click Seal to Open Letter
            </h3>
            <span className="text-xs text-sky-300/80 mt-1 uppercase tracking-widest font-mono">
              Strictly for Her Eyes Only 💌
            </span>
          </div>
        </div>
      ) : (
        /* REVEALED PARCHMENT LOVE LETTER */
        <div className="w-full max-w-2xl mx-auto parchment text-slate-900 rounded-3xl p-8 sm:p-14 shadow-2xl border-4 border-amber-900/10 relative animate-in fade-in zoom-in-95 duration-700">
          {/* Decorative Corner Filigree Accent */}
          <div className="flex items-center justify-between border-b border-amber-900/20 pb-4 mb-6">
            <span className="font-serif italic text-sm text-amber-950/70 font-semibold">
              {loveLetter.date}
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
              1 yr
            </div>
          </div>

          {/* Salutation */}
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-6">
            {loveLetter.salutation}
          </h3>

          {/* Paragraphs */}
          <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-slate-800">
            {loveLetter.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Signoff */}
          <div className="mt-8 pt-6 border-t border-amber-900/20 text-right space-y-1">
            <p className="text-sm font-serif italic text-slate-700">
              {loveLetter.signoff}
            </p>
            <p className="text-2xl font-cursive font-bold text-blue-900">
              {loveLetter.signature}
            </p>
          </div>

          {/* Forever Pledge Action */}
          <div className="mt-10 text-center pt-6 border-t-2 border-dashed border-amber-900/20">
            {!hasPledged ? (
              <button
                onClick={handleForeverPledge}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-700 to-sky-600 text-white font-semibold text-sm sm:text-base shadow-xl shadow-blue-500/30 hover:scale-105 transition-all transform flex items-center gap-2 mx-auto"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>{loveLetter.finalPledgeButton}</span>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center justify-center gap-2 text-blue-800 font-bold text-lg font-serif">
                  <PartyPopper className="w-5 h-5 text-blue-600" />
                  <span>Pledged For Eternity! 💍✨</span>
                </div>
                <p className="text-xs text-blue-900/80">
                  Happy 1st Anniversary, my beautiful queen. Deepan loves you to the moon, across the stars, and forever more! 💙
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Closing Quote / Footer Note */}
      <div className="mt-16 text-center text-xs text-sky-300/60 font-mono">
        Made with infinite love for our 1st Anniversary • {anniversaryData.couple.anniversaryDate}
      </div>
    </section>
  );
}
