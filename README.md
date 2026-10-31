# 💙 Our 1st Anniversary Website

A premium, fully interactive, romantic 1st Anniversary website crafted with React, modern CSS (Tailwind CSS), and JavaScript.

---

## ✨ Features Included

1. **Romantic Blue-and-White Visual Identity**
   - Palette inspired by deep midnight sapphires, icy pastels, frosted glass (`backdrop-blur`), and glowing white stars.
   - Interactive floating hearts canvas particles that spawn extra hearts wherever you tap or click.

2. **Background Music Player (Web Audio API Synthesizer + Custom MP3)**
   - Floating music widget with visual equalizer waves, play/pause, and mute toggle.
   - Built-in procedural romantic piano chords using the Web Audio API (meaning music plays out of the box with zero external dependencies!).
   - Easily swap in your personal song or MP3 file in `src/data/anniversaryData.js`.

3. **Cinematic Hero Opening & Live Relationship Counter**
   - Glowing "Our First Anniversary" title with shimmer effect.
   - Real-time counter ticker showing elapsed days, hours, minutes, and seconds of your love story.
   - Interactive "Love Quote of the Moment" generator button.
   - Heart burst milestone button with confetti explosion.

4. **Relationship Timeline ("Our Love Story")**
   - Interactive milestones from Day 1 to Today (First Met, First Date, The Moment I Knew, Half-Year Adventure, Through Thick & Thin, 365 Days).
   - Milestone memory cards, photo previews, date tags, and a live love reaction counter.

5. **Polaroid Memories Gallery**
   - Nostalgic polaroid cards with pins, subtle tilt physics, and sweet notes.
   - Category filtering: "All", "Dates", "Goofy", "Romantic", "Adventures".
   - Fullscreen Lightbox Modal with zoom, love reactions, and image carousel navigation.

6. **Levi Ackerman Anime Tribute & Cute Animated Cats**
   - **Levi Ackerman Feature**: Scout Legion Wings of Freedom emblem, "Dedicate Your Heart" salute button with blade slash and blue-and-white confetti, and Captain Levi's witty cleaning duster.
   - **Cute Animated Cats**: Mochi & Luna chibi kitties that purr, talk via speech bubbles, enjoy fish treats 🐟, and display a "Purr Level" petting meter.

7. **Couple Mini-Games & Mystery Vault**
   - **The Love Quiz**: 4 personalized questions with hilarious choices, instant validation, and soulmate score celebration.
   - **Catch My Heart Arcade**: 25-second arcade mini-game where you move the love basket horizontally (mouse or touch) to catch falling hearts, roses, and treats!
   - **Date Night Wheel**: Interactive spinning wheel that lands on cute coupons (Massages, Candlelight Dinner, Midnight Treat Run, etc.).
   - **Secret Anniversary Vault**: 4-digit code puzzle (Default: `1010`) that unlocks a secret decrypted love certificate.

8. **Immersive Tamil Village Dream Page ("நமது கிராமத்து கனவு")**
   - Traditional Tamil farmhouse (ஓட்டு வீடு) with carved wooden Thinnai pillars, raised porch, and entrance Kolam.
   - Lush green paddy fields (பச்சை பசேல் வயல்வெளிகள்), swaying coconut palms, clay pathways, and flocking birds.
   - Dynamic sky mode toggle: **Morning Daylight**, **Golden Sunset**, and **Starlit Twilight**.
   - Traditional brass Kuthuvilakku lamp toggle and interactive temple bell chime sound 🔔.

9. **The Grand Finale: Wax-Sealed Love Letter**
   - 3D vintage wax-sealed envelope with `D ❤️ S` seal stamp.
   - Click to break seal and reveal the handwritten parchment love letter.
   - "Yes, I am Yours Forever! 💍✨" pledge button triggering a full-screen fireworks & confetti explosion.

---

## 🛠️ How to Customize in 2 Minutes

All photos, names, dates, quotes, music, and love letter text are located in **one single file**:

👉 `src/data/anniversaryData.js`

To customize:
1. Open `src/data/anniversaryData.js`.
2. Change `boyfriendName` and `girlfriendName`.
3. Set your `anniversaryDate` (e.g., `"2025-10-10"`).
4. Add your personal photos in the `gallery` array (replace the Unsplash URLs with your photos or put them in the `public/` folder).
5. Edit the love letter text, quiz questions, and secret vault PIN code.
6. (Optional) Put your favorite song in `public/music.mp3` and set `customAudioUrl: "/music.mp3"`.

---

## 🚀 Running the Project

Start the local development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```
