'use client';
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import SongCard from '@/app/components/SongCard';
import Audioplayer from './components/audioplayer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchMusic, setSearchMusic] = useState('');
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  const handleSearch = (e) => {
    const input = e.target.value;
    setSearchMusic(input);
  };
  const handleClear = (e) => {
    setSearchMusic('');
  };

  const getSongs = async () => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        throw error;
      }

      const formattedSongs = data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          src: item.audio_url,
          image: item.cover_url,
          artist: item.artist,
        };
      });

      setSongs(formattedSongs);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  useEffect(() => {
    if (!api || !selectedSong) return;
    const idx = filteredSongs.findIndex((song) => song.id === selectedSong.id);
    if (idx !== -1) {
      api.scrollTo(idx);
    }
  }, [selectedSong, api]);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => api.off('select', onSelect);
  }, [api]);

  const filteredSongs = songs.filter((song) => {
    return (
      song.title.toLowerCase().includes(searchMusic.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchMusic.toLowerCase())
    );
  });
  const index = filteredSongs.findIndex((song) => song.id === selectedSong?.id);

  const nextSong = () => {
    if (filteredSongs.length === 0) return;

    if (shuffle) {
      let randomIndex;
      if (filteredSongs.length === 1) {
        randomIndex = 0;
      } else {
        do {
          randomIndex = Math.floor(Math.random() * filteredSongs.length);
        } while (filteredSongs[randomIndex].id === selectedSong?.id);
      }
      setSelectedSong(filteredSongs[randomIndex]);
      return;
    }

    if (selectedSong === null || index === -1) {
      setSelectedSong(filteredSongs[0]);
    } else {
      if (index === filteredSongs.length - 1) {
        setSelectedSong(filteredSongs[0]);
      } else {
        setSelectedSong(filteredSongs[index + 1]);
      }
    }
  };

  const prevSong = () => {
    if (filteredSongs.length === 0) return;

    if (selectedSong === null || index === -1) {
      setSelectedSong(filteredSongs[filteredSongs.length - 1]);
    } else {
      if (index === 0) {
        setSelectedSong(filteredSongs[filteredSongs.length - 1]);
      } else {
        setSelectedSong(filteredSongs[index - 1]);
      }
    }
  };

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#050816] pt-50 lg:pt-60 text-white'>
      <SearchBar
        onSearch={handleSearch}
        clearSearch={handleClear}
        searchMusic={searchMusic}
      />
      <div className='pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl' />

      <div className='pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl' />

      <div className='relative mx-auto w-full max-w-6xl px-4 sm:px-8 py-3'>
        {loading ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`w-full max-w-[240px] mx-auto rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl ${
                  index === 0
                    ? ''
                    : index === 1
                      ? 'hidden sm:block'
                      : 'hidden lg:block'
                }`}
              >
                <Skeleton className='aspect-square w-full rounded-xl bg-white/10' />

                <Skeleton className='mt-4 h-4 w-3/4 bg-white/10' />

                <Skeleton className='mt-2 h-3 w-1/2 bg-white/10' />
              </div>
            ))}
          </div>
        ) : error ? (
          error.message
        ) : filteredSongs.length === 0 ? (
          <div>
            <h3 className='text-base font-semibold text-white'>
              No results found
            </h3>

            <p className='mt-2 max-w-sm text-sm text-white/40'>
              Try searching for another song or artist.
            </p>
          </div>
        ) : (
          <>
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              setApi={setApi}
              className='w-full'
            >
              <div className='flex items-center gap-2'>
                <CarouselPrevious className='hidden min-[376px]:flex !static !top-auto !translate-y-0 size-9 sm:size-12 shrink-0 border-white/10 bg-white/[0.08] text-white backdrop-blur-md hover:bg-white/[0.16] hover:text-white' />

                <div className='min-w-0 flex-1'>
                  <CarouselContent className='ml-0'>
                    {filteredSongs.map((song) => (
                      <CarouselItem
                        key={song.id}
                        className='basis-full px-3 sm:basis-1/2 lg:basis-1/4'
                      >
                        <SongCard
                          song={song}
                          selected={selectedSong?.id === song.id}
                          onSelect={() => setSelectedSong(song)}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </div>

                <CarouselNext className='hidden min-[376px]:flex !static !top-auto !translate-y-0 size-9 sm:size-12 shrink-0 border-white/10 bg-white/[0.08] text-white backdrop-blur-md hover:bg-white/[0.16] hover:text-white' />
              </div>
            </Carousel>

            <div className='flex min-[376px]:hidden justify-center gap-1.5 mt-3'>
              {filteredSongs.map((song, i) => (
                <button
                  key={song.id}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to song ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIndex ? 'w-4 bg-blue-400' : 'w-1.5 bg-white/25'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Audioplayer
        song={selectedSong}
        onNext={nextSong}
        onPrev={prevSong}
        shuffle={shuffle}
        onToggleShuffle={() => setShuffle((prev) => !prev)}
      />
    </div>
  );
}
