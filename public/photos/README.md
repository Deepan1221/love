# 📸 Couple Photos Folder

Place your own photos in this folder (`public/photos/`).

For example:
- `our-first-date.jpg`
- `beach-trip.jpg`
- `goofy-selfie.jpg`
- `anniversary.jpg`

Once placed here, Vite makes them available at `/photos/<filename>`.
You can then link them in `src/data/anniversaryData.js` like:

```javascript
{
  id: 1,
  title: "Our Sweet Date",
  date: "November 2025",
  category: "Dates",
  src: "/photos/our-first-date.jpg",
  note: "The day we had coffee together."
}
```
