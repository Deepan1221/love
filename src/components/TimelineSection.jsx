import React, { useState } from 'react';
import {
  Sparkles,
  Coffee,
  Heart,
  Compass,
  Shield,
  Crown,
  Calendar,
  MessageCircleHeart,
  ChevronRight,
} from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';

const iconMap = {
  Sparkles,
  Coffee,
  Heart,
  Compass,
  Shield,
  Crown,
};

export default function TimelineSection() {
  const [activeMilestone, setActiveMilestone] = useState(1);
  const [likes, setLikes] = useState({});

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="timeline" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Chapter by Chapter</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Our Love Story Timeline
        </h2>
        <p className="text-sky-200/80 text-sm sm:text-base font-light">
          From the very first shy smile to 365 days of holding each other tight. Tap on any milestone to open its memory box!
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative">
        {/* Central Vertical Glowing Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-sky-400 to-indigo-600 opacity-60 pointer-events-none" />

        <div className="space-y-12">
          {anniversaryData.timeline.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Heart;
            const isEven = index % 2 === 0;
            const isSelected = activeMilestone === item.id;
            const likeCount = likes[item.id] || 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-8 md:gap-0`}
              >
                {/* Center Node Icon */}
                <div
                  onClick={() => setActiveMilestone(item.id)}
                  className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-sky-400 to-blue-600 text-white ring-4 ring-sky-400/30 scale-110 shadow-lg shadow-sky-500/50'
                      : 'bg-slate-900 border-2 border-sky-400/40 text-sky-300 hover:border-sky-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Milestone Card Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    isEven ? 'md:pl-12' : 'md:pr-12'
                  } w-full`}
                >
                  <div
                    onClick={() => setActiveMilestone(item.id)}
                    className={`glass-card rounded-3xl p-6 sm:p-7 border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-sky-400/50 shadow-2xl shadow-blue-500/20 bg-slate-900/90'
                        : 'border-slate-700/50 hover:border-sky-400/30'
                    }`}
                  >
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      <span className="text-xs text-sky-300/80 font-mono font-medium">
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 group-hover:text-sky-300 transition">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Image Preview (shown when selected or on hover) */}
                    <div className="relative rounded-2xl overflow-hidden mb-4 border border-sky-400/20 aspect-video sm:aspect-[21/9]">
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 left-3 right-3 text-xs text-sky-100 italic truncate flex items-center gap-1.5">
                        <MessageCircleHeart className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>"{item.memoryNote}"</span>
                      </div>
                    </div>

                    {/* Footer reaction bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                      <span className="text-sky-300/70">
                        Milestone #{item.id} of 6
                      </span>
                      <button
                        onClick={(e) => handleLike(item.id, e)}
                        className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 hover:text-white border border-sky-400/20 transition"
                      >
                        <Heart className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                        <span>{likeCount > 0 ? `${likeCount} Loves` : 'Send Love'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
