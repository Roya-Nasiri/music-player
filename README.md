# 🎵 Music Player

A responsive music player web app built with Next.js, featuring a swipeable carousel, live search, shuffle/repeat modes, and a persistent bottom player — backed by Supabase for data and file storage.

**🔗 Live Demo:**(https://music-player-alpha-lilac.vercel.app/) <!-- replace with your actual Vercel URL -->

---

## ✨ Features

- **Swipeable song carousel** — browse songs as cards, swipe on mobile or use arrows on desktop
- **Live search** — filter songs instantly by title or artist
- **Persistent audio player** — sticky bottom bar with play/pause, seek, and track progress
- **Shuffle mode** — play songs in random order
- **Repeat & Repeat All** — loop a single track or the whole (filtered) playlist
- **Search-aware navigation** — Next/Previous respects the current search filter, not just the full library
- **Fully responsive** — custom breakpoints for small phones, large phones, tablets, and desktops, including a dot-indicator on very small screens instead of arrows
- **Loading skeletons** — smooth loading state while songs are fetched

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com/) (via shadcn) |
| Backend / Database | [Supabase](https://supabase.com/) (PostgreSQL) |
| File Storage | Supabase Storage (audio files & cover art) |
| Hosting | [Vercel](https://vercel.com/) |

## 📐 Architecture

This project follows a clean separation between the frontend and backend:

- **Vercel** hosts and serves the Next.js application — everything the user sees and interacts with.
- **Supabase** stores the actual data: a `songs` table (title, artist, sort order) and a Storage bucket holding the MP3 files and cover images. The frontend queries Supabase directly using the `@supabase/supabase-js` client — there's no custom backend server to maintain.

```
User's Browser
      │
      ▼
   Vercel (Next.js app)
      │
      ▼
   Supabase (Postgres + Storage)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project with:
  - A `songs` table: `id`, `title`, `artist`, `audio_url`, `cover_url`, `sort_order`
  - A public Storage bucket containing your audio and cover files

### Installation

```bash
git clone https://github.com/Roya-Nasiri/music-player.git
cd music-player
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in your Supabase project under **Settings → API**.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── audioplayer.jsx   # Sticky bottom player: playback, shuffle, repeat
│   │   ├── SongCard.jsx      # Individual song card in the carousel
│   │   └── SearchBar.jsx     # Live search input
│   └── page.jsx              # Main page: fetches songs, carousel, state
├── components/ui/            # shadcn/ui components (button, card, carousel, slider, skeleton)
└── lib/
    ├── supabaseClient.js     # Supabase client initialization
    └── utils.js
```

## 📝 Notes

This project was originally built with a self-hosted [Strapi](https://strapi.io/) backend, then migrated to Supabase to get free, permanent hosting without managing a server — a good example of adapting the backend approach based on real-world hosting constraints.

## 📄 License

This project is open source and available for learning purposes.
