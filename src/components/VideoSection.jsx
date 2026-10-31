import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Clapperboard,
  Play,
  Pause,
  Video,
  Plus,
  Trash2,
  Upload,
  Sparkles,
  Heart,
  Tv,
  Film,
  ExternalLink,
  RotateCcw,
  Check,
} from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';
import confetti from 'canvas-confetti';

export default function VideoSection() {
  // Always load permanent videos from anniversaryData.videos (including pondatti.mov)
  const permanentVideos = useMemo(() => {
    return anniversaryData?.videos || [
      {
        id: "permanent-pondatti",
        title: "Pondatti • Our Love in Motion 🎥💖",
        date: "Forever Memory",
        src: "https://res.cloudinary.com/durp4i12/video/upload/v1793441075/pondatti.mov",
        note: "En azhagana pondatti... Every smile, every laugh, and every glance caught in motion. A memory we will replay forever! 💖💍♾️",
        isPermanent: true,
      },
    ];
  }, []);

  // Manage additional user-pasted / uploaded videos with localStorage
  const [customVideos, setCustomVideos] = useState(() => {
    try {
      // 1. Check custom videos key
      const savedCustom = localStorage.getItem('anniversary_custom_videos');
      if (savedCustom) {
        return JSON.parse(savedCustom);
      }
      // 2. Clear legacy full-override key if present so permanent video is never blocked
      const legacySaved = localStorage.getItem('anniversary_user_videos');
      if (legacySaved) {
        localStorage.removeItem('anniversary_user_videos');
        const parsed = JSON.parse(legacySaved);
        if (Array.isArray(parsed)) {
          const onlyUser = parsed.filter((v) => v.isUserAdded);
          if (onlyUser.length > 0) {
            localStorage.setItem('anniversary_custom_videos', JSON.stringify(onlyUser));
            return onlyUser;
          }
        }
      }
    } catch (err) {
      console.warn('LocalStorage error in VideoSection:', err);
    }
    return [];
  });

  // Combined video playlist: custom pasted videos + permanent videos
  const videos = useMemo(() => {
    return [...customVideos, ...permanentVideos];
  }, [customVideos, permanentVideos]);

  // Current active video playing in the main cinema screen (defaults to permanent pondatti video)
  const [activeVideo, setActiveVideo] = useState(() => permanentVideos[0] || videos[0]);

  // Form input states for pasting video
  const [pastedUrl, setPastedUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoNote, setVideoNote] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSuccessToast, setIsSuccessToast] = useState(false);
  const [cinemaLikes, setCinemaLikes] = useState({});

  const videoPlayerRef = useRef(null);

  // Save custom videos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('anniversary_custom_videos', JSON.stringify(customVideos));
    } catch {
      // Fallback
    }
  }, [customVideos]);

  // Detect and format YouTube embeds if a YouTube URL is pasted (autoplay=0: only plays on click)
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regExp);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0` : null;
  };

  const isYouTube = getYouTubeEmbedUrl(activeVideo?.src);

  // Paste & Load Video (Waits for user to click play)
  const handleRunVideoNow = (e) => {
    if (e) e.preventDefault();
    if (!pastedUrl.trim()) {
      setUploadError('Please paste a video URL or select a video file.');
      return;
    }

    setUploadError('');
    const newVideoItem = {
      id: Date.now(),
      title: videoTitle.trim() || 'Our Romantic Video Moment 🎬',
      date: 'Today',
      src: pastedUrl.trim(),
      note: videoNote.trim() || 'A sweet video memory we cherish together.',
      isUserAdded: true,
    };

    // Add to custom list and set as active player (do not autoplay until play button is clicked)
    setCustomVideos((prev) => [newVideoItem, ...prev.filter((v) => v.src !== newVideoItem.src)]);
    setActiveVideo(newVideoItem);
    setIsPlaying(false);

    // Reset inputs
    setPastedUrl('');
    setVideoTitle('');
    setVideoNote('');
    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 3000);

    // Celebration
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#F472B6', '#FFFFFF', '#60A5FA'],
    });

    // Auto-scroll to cinema screen smoothly
    const playerEl = document.getElementById('cinema-screen');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Handle local video file upload from device
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setUploadError('Please select a valid video file (MP4, WebM, MOV).');
      return;
    }

    setUploadError('');
    const localUrl = URL.createObjectURL(file);
    setPastedUrl(localUrl);
    if (!videoTitle) {
      setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  // Delete custom video (permanent videos cannot be deleted)
  const handleDeleteVideo = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this video from your playlist?')) {
      const updated = customVideos.filter((v) => v.id !== id);
      setCustomVideos(updated);
      if (activeVideo?.id === id) {
        setActiveVideo(permanentVideos[0] || updated[0]);
      }
    }
  };

  // Heart like on current video
  const handleLikeCurrent = () => {
    if (!activeVideo) return;
    setCinemaLikes((prev) => ({
      ...prev,
      [activeVideo.id]: (prev[activeVideo.id] || 0) + 1,
    }));
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F43F5E', '#FDA4AF', '#FFFFFF'],
    });
  };

  return (
    <section id="videos" className="py-20 px-4 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Cinematic Love Reels • Moving Memories</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Captured in Motion • Our Videos
        </h2>
        <p className="text-sky-200/80 text-sm sm:text-base font-light">
          Watch our favorite videos together! Paste any video URL (Cloudinary, direct MP4, or YouTube) to play and run your video instantly.
        </p>
      </div>

      {/* PASTE & RUN VIDEO CONTROL PANEL */}
      <div className="max-w-3xl mx-auto mb-12 glass-panel rounded-3xl p-6 sm:p-8 border border-sky-400/30 shadow-2xl relative">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <Film className="w-5 h-5 text-sky-400" />
          <h3 className="text-base sm:text-lg font-serif font-bold text-white">
            Paste & Run Your Video
          </h3>
          <span className="ml-auto text-[11px] text-sky-300/70 font-mono">
            Direct MP4 • Cloudinary • YouTube
          </span>
        </div>

        <form onSubmit={handleRunVideoNow} className="space-y-4">
          {/* URL Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-sky-300 mb-1.5">
              Paste Video URL:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="https://res.cloudinary.com/.../video.mp4 or YouTube link"
                value={pastedUrl}
                onChange={(e) => {
                  setPastedUrl(e.target.value);
                  if (uploadError) setUploadError('');
                }}
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-sky-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition font-mono"
              />

              {/* Upload from device button */}
              <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition shrink-0">
                <Upload className="w-3.5 h-3.5 text-sky-300" />
                <span>Upload File</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Optional Title & Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Video Title (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Our Unjal Ride / Cute Moments"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Sweet Note / Caption:
              </label>
              <input
                type="text"
                placeholder="e.g. You looked so beautiful here..."
                value={videoNote}
                onChange={(e) => setVideoNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          {uploadError && (
            <p className="text-xs text-rose-400">{uploadError}</p>
          )}

          {/* Submit Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-sky-400 hover:from-blue-500 hover:to-sky-300 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transition transform active:scale-95"
            >
              <Film className="w-4 h-4" />
              <span>Load Video into Cinema 🎬</span>
            </button>
          </div>

          {isSuccessToast && (
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Video loaded into Cinema! Click Play to watch 🎬💖</span>
            </div>
          )}
        </form>
      </div>

      {/* THE CINEMA THEATER SCREEN */}
      <div id="cinema-screen" className="max-w-4xl mx-auto mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-sky-400/40 shadow-2xl shadow-sky-500/20 group">
          {/* Ambient backlight glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 -z-10" />

          {/* Video Player Display */}
          <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            {isYouTube ? (
              <iframe
                src={isYouTube}
                title={activeVideo?.title || 'YouTube Video'}
                className="w-full h-full border-0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : activeVideo?.src ? (
              <>
                <video
                  ref={videoPlayerRef}
                  key={activeVideo.src}
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-contain"
                >
                  <source
                    src={activeVideo.src}
                    type={activeVideo.src.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}
                  />
                  {activeVideo.src.includes('cloudinary.com') && activeVideo.src.toLowerCase().endsWith('.mov') && (
                    <source
                      src={activeVideo.src.replace(/\.mov$/i, '.mp4')}
                      type="video/mp4"
                    />
                  )}
                  Your browser does not support the video tag.
                </video>

                {/* Big Center Play Button Overlay - Only visible when NOT playing */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={() => {
                      if (videoPlayerRef.current) {
                        videoPlayerRef.current.play();
                      }
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 hover:bg-black/30 transition-all duration-300 group/play z-10 focus:outline-none cursor-pointer"
                    aria-label="Play Video"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-blue-600 via-sky-500 to-sky-400 text-white flex items-center justify-center shadow-2xl shadow-sky-500/50 group-hover/play:scale-110 active:scale-95 transition transform">
                      <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-current ml-1.5 drop-shadow" />
                    </div>
                    <span className="mt-4 px-4 py-1.5 rounded-full bg-slate-950/90 border border-sky-400/40 text-xs sm:text-sm font-semibold text-sky-200 shadow-lg backdrop-blur-md">
                      Click to Play Video ▶️
                    </span>
                  </button>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 p-8 text-center space-y-2">
                <Video className="w-12 h-12 text-slate-600" />
                <p className="text-sm">Paste a video link above to start watching!</p>
              </div>
            )}
          </div>

          {/* Video Details & Interaction Bar */}
          {activeVideo && (
            <div className="p-5 sm:p-6 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      isPlaying
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                        : 'bg-sky-500/20 text-sky-300 border-sky-400/30'
                    }`}
                  >
                    {isPlaying ? 'Playing Now ▶' : 'Ready to Play 🎬'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{activeVideo.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  {activeVideo.title}
                </h3>
                {activeVideo.note && (
                  <p className="text-xs sm:text-sm text-slate-300 italic">
                    "{activeVideo.note}"
                  </p>
                )}
              </div>

              {/* Action Buttons: Play/Pause button and Love reaction */}
              <div className="flex items-center gap-2.5 shrink-0">
                {!isYouTube && (
                  <button
                    onClick={() => {
                      if (videoPlayerRef.current) {
                        if (isPlaying) {
                          videoPlayerRef.current.pause();
                        } else {
                          videoPlayerRef.current.play();
                        }
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition border ${
                      isPlaying
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        : 'bg-sky-500 hover:bg-sky-400 text-white border-sky-400 shadow-md shadow-sky-500/30'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Video</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={handleLikeCurrent}
                  className="px-4 py-2 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 flex items-center gap-2 transition text-xs font-semibold shrink-0"
                >
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span>
                    {cinemaLikes[activeVideo.id]
                      ? `${cinemaLikes[activeVideo.id]} Loved`
                      : 'Love This Video'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VIDEO PLAYLIST & MEMORY REELS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Tv className="w-4 h-4 text-sky-400" />
            <h3 className="text-base sm:text-lg font-serif font-bold text-white">
              Video Playlist ({videos.length})
            </h3>
          </div>
          <span className="text-xs text-sky-300/70">
            Click any reel to load into Cinema screen
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => {
            const isCurrent = activeVideo?.id === vid.id;
            const ytEmbed = getYouTubeEmbedUrl(vid.src);

            return (
              <div
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  setIsPlaying(false);
                  const playerEl = document.getElementById('cinema-screen');
                  if (playerEl) {
                    playerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`group cursor-pointer rounded-2xl p-4 transition-all duration-300 relative border ${isCurrent
                    ? 'bg-slate-900 border-sky-400 shadow-xl shadow-sky-500/20 ring-1 ring-sky-400/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
              >
                {/* Delete button for user added videos */}
                {vid.isUserAdded && (
                  <button
                    onClick={(e) => handleDeleteVideo(vid.id, e)}
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-slate-950/80 hover:bg-rose-900/90 text-rose-300 flex items-center justify-center transition border border-rose-500/30"
                    title="Remove this video"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Video Card Thumbnail Box */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800 flex items-center justify-center">
                  {ytEmbed ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <Clapperboard className="w-8 h-8 text-sky-400 opacity-80" />
                    </div>
                  ) : (
                    <video
                      src={vid.src}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                      preload="metadata"
                      muted
                      playsInline
                    />
                  )}

                  {/* Play Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition ${isCurrent
                          ? 'bg-sky-500 text-white scale-110 shadow-lg shadow-sky-500/40'
                          : 'bg-slate-950/80 text-sky-200 group-hover:scale-110'
                        }`}
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {isCurrent && (
                    <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white shadow ${
                      isPlaying ? 'bg-emerald-500' : 'bg-sky-500'
                    }`}>
                      {isPlaying ? 'Playing ▶' : 'Selected 🎬'}
                    </span>
                  )}
                  {vid.isPermanent && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/80 text-white shadow backdrop-blur-sm flex items-center gap-1">
                      <Heart className="w-2.5 h-2.5 fill-white" /> Permanent
                    </span>
                  )}
                </div>

                {/* Video Info */}
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-white group-hover:text-sky-300 transition truncate">
                    {vid.title}
                  </h4>
                  {vid.note && (
                    <p className="text-xs text-slate-400 italic line-clamp-2">
                      "{vid.note}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
