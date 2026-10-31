import React, { useState, useEffect, useMemo } from 'react';
import {
  Camera,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Pin,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us.js';
import confetti from 'canvas-confetti';

export default function GallerySection() {
  // Always load permanent memories directly from anniversaryData.gallery (lines 102 to 399)
  const permanentPhotos = useMemo(() => anniversaryData?.gallery || [], []);

  // Manage additional user-uploaded photos with localStorage persistence
  const [customPhotos, setCustomPhotos] = useState(() => {
    try {
      // 1. Check custom uploads key
      const savedCustom = localStorage.getItem('anniversary_custom_uploads');
      if (savedCustom) {
        return JSON.parse(savedCustom);
      }
      // 2. Backward compatibility: if previous version saved full list, extract only user-uploaded photos
      const legacyPhotos = localStorage.getItem('anniversary_user_photos');
      if (legacyPhotos) {
        const parsed = JSON.parse(legacyPhotos);
        // Remove legacy full-override key so permanent photos are NEVER blocked
        localStorage.removeItem('anniversary_user_photos');
        if (Array.isArray(parsed)) {
          const userAddedOnly = parsed.filter((item) => item.isUserAdded);
          if (userAddedOnly.length > 0) {
            localStorage.setItem('anniversary_custom_uploads', JSON.stringify(userAddedOnly));
            return userAddedOnly;
          }
        }
      }
    } catch (err) {
      console.warn('LocalStorage access error:', err);
    }
    return [];
  });

  // Combine user-added photos + permanent gallery photos (lines 102-399)
  const photos = useMemo(() => {
    return [...customPhotos, ...permanentPhotos];
  }, [customPhotos, permanentPhotos]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [likes, setLikes] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding new photo
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState('Romantic');
  const [newNote, setNewNote] = useState('');
  const [newImagePreview, setNewImagePreview] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Categories dynamically include All, Romantic, Goofy, Dates, Adventures + any custom
  const categories = useMemo(() => {
    const base = ['All', 'Romantic', 'Goofy', 'Dates', 'Adventures'];
    const customCats = photos.map((p) => p.category).filter(Boolean);
    return ['All', ...new Set([...base.slice(1), ...customCats])];
  }, [photos]);

  // Save only user-added photos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('anniversary_custom_uploads', JSON.stringify(customPhotos));
      // Ensure legacy key is removed so permanent photos remain active
      localStorage.removeItem('anniversary_user_photos');
    } catch {
      // LocalStorage quota or privacy mode fallback
    }
  }, [customPhotos]);

  const filteredPhotos =
    selectedCategory === 'All'
      ? photos
      : photos.filter((item) => item.category === selectedCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleHeartLike = (id, e) => {
    e.stopPropagation();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Handle local image file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Submit new photo
  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    if (!newImagePreview) {
      setUploadError('Please select an image file or enter an image URL.');
      return;
    }

    const newPhotoItem = {
      id: Date.now(),
      title: newTitle.trim() || 'Our Beautiful Moment',
      date: newDate.trim() || 'A Sweet Day',
      category: newCategory,
      src: newImagePreview,
      note: newNote.trim() || 'A memory I will cherish forever.',
      isUserAdded: true,
    };

    setCustomPhotos((prev) => [newPhotoItem, ...prev]);
    setIsAddModalOpen(false);

    // Reset fields
    setNewTitle('');
    setNewDate('');
    setNewCategory('Romantic');
    setNewNote('');
    setNewImagePreview('');
    setUploadError('');

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#FFFFFF', '#60A5FA', '#F472B6'],
    });
  };

  // Delete a specific photo (only user-added photos can be deleted)
  const handleDeletePhoto = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this photo?')) {
      setCustomPhotos((prev) => prev.filter((p) => p.id !== id));
      if (lightboxIndex !== null) {
        closeLightbox();
      }
    }
  };

  // Reset custom uploads
  const handleResetPhotos = () => {
    if (customPhotos.length === 0) {
      alert(`All ${permanentPhotos.length} permanent memories (from lines 102 to 399) are already active! 💖`);
      return;
    }
    if (window.confirm(`Remove ${customPhotos.length} custom uploaded photo(s) and show the permanent collection (${permanentPhotos.length} memories)?`)) {
      setCustomPhotos([]);
      localStorage.removeItem('anniversary_custom_uploads');
      localStorage.removeItem('anniversary_user_photos');
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Polaroid Memories</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Captured Moments of Us
        </h2>
        <p className="text-sky-200/80 text-sm sm:text-base font-light">
          A snapshot for every laugh, every tender hug, and every unforgettable gaze. Click any polaroid to view the full memory!
        </p>

        {/* Action Buttons for Adding Photos */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="glass-button px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-sky-500/25"
          >
            <Plus className="w-4 h-4 text-sky-200" />
            <span>Add / Upload Pictures 📸</span>
          </button>

          <button
            onClick={handleResetPhotos}
            className="px-4 py-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/60 transition flex items-center gap-1.5"
            title="Reset gallery to default"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/25 border border-sky-300/40'
                : 'glass-card text-slate-300 hover:text-white border-slate-700/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPhotos.map((photo, idx) => {
          const tiltClass =
            idx % 3 === 0
              ? 'sm:-rotate-1 hover:rotate-0'
              : idx % 3 === 1
              ? 'sm:rotate-1 hover:rotate-0'
              : 'sm:-rotate-2 hover:rotate-0';

          const photoLikes = likes[photo.id] || 0;

          return (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className={`group cursor-pointer bg-slate-900/90 rounded-2xl p-4 border border-sky-300/20 shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-sky-500/20 ${tiltClass} relative`}
            >
              {/* Decorative pin */}
              <div className="flex justify-center -mt-7 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-300 to-blue-600 shadow-md flex items-center justify-center border border-white/40">
                  <Pin className="w-3.5 h-3.5 text-white transform -rotate-45" />
                </div>
              </div>

              {/* Delete Button for User Added Photos */}
              {photo.isUserAdded && (
                <button
                  onClick={(e) => handleDeletePhoto(photo.id, e)}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-slate-950/80 hover:bg-rose-900/90 text-rose-300 flex items-center justify-center transition border border-rose-500/30"
                  title="Remove this photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Polaroid Image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 mb-3 border border-slate-800">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900/80 backdrop-blur-md text-sky-200 border border-sky-400/30">
                    {photo.category}
                  </span>
                </div>
              </div>

              {/* Polaroid Caption */}
              <div className="px-1 py-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-sky-300 transition">
                    {photo.title}
                  </h3>
                  <span className="text-[11px] text-sky-300/70 font-mono">{photo.date}</span>
                </div>
                <p className="text-xs text-slate-300/90 italic line-clamp-2">"{photo.note}"</p>

                {/* Like Button */}
                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-sky-300/70">
                  <span>Click to expand</span>
                  <button
                    onClick={(e) => handleHeartLike(photo.id, e)}
                    className="flex items-center space-x-1 hover:text-white transition"
                  >
                    <Heart className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
                    <span>{photoLikes > 0 ? photoLikes : ''}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD / UPLOAD PHOTO */}
      {isAddModalOpen && (
        <div
          onClick={() => setIsAddModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-slate-900 border border-sky-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-sky-400" />
                <h3 className="text-xl font-serif font-bold text-white">
                  Add a Couple Memory
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
              {/* File Uploader */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-sky-300 mb-2">
                  Select Photo File:
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer glass-button px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white flex items-center gap-2 hover:opacity-90">
                    <Upload className="w-4 h-4" />
                    <span>Choose from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-slate-400 truncate max-w-[200px]">
                    {newImagePreview ? 'Image Selected ✅' : 'No file chosen'}
                  </span>
                </div>
              </div>

              {/* Or paste Image URL directly */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Or Paste Photo URL:
                </label>
                <input
                  type="text"
                  placeholder="https://... or /photos/my-photo.jpg"
                  value={newImagePreview.startsWith('data:') ? '' : newImagePreview}
                  onChange={(e) => setNewImagePreview(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                />
              </div>

              {/* Image Preview Box */}
              {newImagePreview && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-sky-400/40 bg-black">
                  <img
                    src={newImagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Title & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Title / Caption:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Our First Sunset"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date / Time:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. November 2025"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-400"
                >
                  <option value="Romantic">Romantic</option>
                  <option value="Dates">Dates</option>
                  <option value="Goofy">Goofy</option>
                  <option value="Adventures">Adventures</option>
                </select>
              </div>

              {/* Personal Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sweet Note / Memory:
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. You looked so beautiful in the golden sunlight..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                ></textarea>
              </div>

              {uploadError && (
                <p className="text-xs text-rose-400">{uploadError}</p>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full glass-button py-3 rounded-xl text-white font-semibold text-sm transition"
                >
                  Save to Our Gallery 💖
                </button>
              </div>
            </form>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400">
              💡 <strong>Permanent Option:</strong> You can also copy your photos into <code className="text-sky-300">public/photos/</code> and add them directly to <code className="text-sky-300">src/data/anniversaryData.js</code>!
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 border border-sky-400/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Image View */}
            <div className="md:w-3/5 bg-black relative flex items-center justify-center min-h-[300px] sm:min-h-[420px]">
              <img
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[70vh] w-full object-contain"
              />

              {/* Prev / Next controls */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition border border-slate-700"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition border border-slate-700"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Memory Sidebar Details */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-slate-900/90 overflow-y-auto">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {filteredPhotos[lightboxIndex].category} • {filteredPhotos[lightboxIndex].date}
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-sky-400 pl-3 whitespace-pre-line">
                  "{filteredPhotos[lightboxIndex].note}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Photo {lightboxIndex + 1} of {filteredPhotos.length}
                  </span>
                  <button
                    onClick={(e) => handleHeartLike(filteredPhotos[lightboxIndex].id, e)}
                    className="px-4 py-1.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/30 flex items-center gap-1.5 transition text-xs font-semibold"
                  >
                    <Heart className="w-4 h-4 text-sky-400 fill-sky-400" />
                    <span>
                      {likes[filteredPhotos[lightboxIndex].id]
                        ? `${likes[filteredPhotos[lightboxIndex].id]} Loves`
                        : 'Love This Memory'}
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-sky-300/60 text-center">
                  ✨ Permanent memory from our 1st Anniversary album
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
