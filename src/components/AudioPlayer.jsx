import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';

export default function AudioPlayer() {
  const { musicTrackName, musicArtist, customAudioUrl } = anniversaryData.couple;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSynthMode, setIsSynthMode] = useState(!customAudioUrl);
  const [audioError, setAudioError] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthTimerRef = useRef(null);
  const chordStepRef = useRef(0);
  const isMutedRef = useRef(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (customAudioUrl) {
      setIsSynthMode(false);
      setAudioError(false);
    } else {
      setIsSynthMode(true);
    }
  }, [customAudioUrl]);

  // Web Audio Procedural Romantic Chord Progression
  // Beautiful romantic progression: Cmaj9 -> G6 -> Am9 -> Fmaj7
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // C, E, G, B
    [196.00, 246.94, 293.66, 392.00], // G, B, D, G
    [220.00, 261.63, 329.63, 440.00], // A, C, E, A
    [174.61, 220.00, 261.63, 349.23], // F, A, C, F
  ];

  const playTone = (freq, duration, delay = 0) => {
    if (!audioCtxRef.current || isMutedRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gainNode.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + delay + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch {
      // Audio context might be suspended or closed
    }
  };

  const playRomanticArpeggio = () => {
    const currentChord = chords[chordStepRef.current % chords.length];
    chordStepRef.current += 1;

    // Play gentle arpeggiated notes
    currentChord.forEach((note, index) => {
      playTone(note, 2.8, index * 0.4);
    });
    // Add a high sparkling harmony bell
    playTone(currentChord[1] * 2, 2.0, 1.2);
  };

  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      playRomanticArpeggio();
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      synthTimerRef.current = setInterval(playRomanticArpeggio, 2200);
      setIsPlaying(true);
      hasStartedRef.current = true;
      setNeedsGesture(false);
    } catch {
      setNeedsGesture(true);
    }
  };

  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  // Central playback starter
  const startPlayback = () => {
    if (hasStartedRef.current && isPlaying) return;

    if (customAudioUrl && !audioError && !isSynthMode) {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              hasStartedRef.current = true;
              setNeedsGesture(false);
            })
            .catch(() => {
              // Browser requires user gesture before playing audio
              setNeedsGesture(true);
            });
        }
      }
    } else {
      startSynth();
    }
  };

  // Auto-play immediately on load + fallback on first gesture (click, scroll, touch)
  useEffect(() => {
    // Attempt automatic playback immediately on mount
    startPlayback();

    const handleFirstInteraction = () => {
      if (!hasStartedRef.current) {
        startPlayback();
      }
      cleanup();
    };

    const events = ['click', 'touchstart', 'scroll', 'keydown', 'pointerdown'];
    const cleanup = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, true);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { capture: true, once: true });
    });

    return () => {
      cleanup();
      stopSynth();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, [customAudioUrl, audioError, isSynthMode]);

  const togglePlay = () => {
    if (customAudioUrl && !audioError && !isSynthMode) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
          hasStartedRef.current = false;
        } else {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              hasStartedRef.current = true;
              setNeedsGesture(false);
            })
            .catch(() => {
              setAudioError(true);
              setIsSynthMode(true);
              startSynth();
            });
        }
      }
    } else {
      if (isPlaying) {
        stopSynth();
        setIsPlaying(false);
        hasStartedRef.current = false;
      } else {
        startSynth();
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Gentle helper tooltip if browser blocks unprompted autoplay */}
      {needsGesture && !isPlaying && (
        <button
          onClick={startPlayback}
          className="mb-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/30 border border-sky-300/40 animate-bounce flex items-center gap-1.5 backdrop-blur-md cursor-pointer hover:scale-105 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-200" />
          <span>Tap anywhere to play our song 🎵</span>
        </button>
      )}

      {customAudioUrl && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          loop
          autoPlay
          playsInline
          preload="auto"
          onCanPlay={() => {
            if (!isPlaying) {
              startPlayback();
            }
          }}
          onError={() => {
            setAudioError(true);
            setIsSynthMode(true);
            startSynth();
          }}
        />
      )}

      <div className="glass-panel px-4 py-3 rounded-full flex items-center space-x-3 shadow-2xl border border-sky-300/30 hover:border-sky-300/60 transition-all duration-300">
        {/* Animated Sound Wave or Icon */}
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-lg shadow-sky-500/20">
          <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
        </div>

        {/* Track details (hidden on tiny screens, visible on mobile+) */}
        <div className="flex flex-col pr-1">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-semibold text-sky-100 max-w-[120px] sm:max-w-[160px] truncate">
              {musicTrackName}
            </span>
            {isPlaying && (
              <span className="flex space-x-0.5 items-end h-3">
                <span className="w-0.5 h-2 bg-sky-400 rounded-full animate-pulse"></span>
                <span className="w-0.5 h-3 bg-blue-300 rounded-full animate-pulse delay-75"></span>
                <span className="w-0.5 h-1.5 bg-sky-400 rounded-full animate-pulse delay-150"></span>
              </span>
            )}
          </div>
          <span className="text-[10px] text-sky-300/70 truncate max-w-[120px]">
            {isSynthMode ? 'Procedural Piano Chimes' : musicArtist}
          </span>
        </div>

        {/* Play / Pause Toggle Button */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-sky-500/20 hover:bg-sky-500/40 text-sky-200 hover:text-white flex items-center justify-center transition border border-sky-400/20"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Mute Toggle Button */}
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-700/80 text-sky-300 hover:text-white flex items-center justify-center transition border border-slate-700/50"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
