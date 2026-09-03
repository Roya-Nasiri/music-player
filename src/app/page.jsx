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

  const index = songs.findIndex((song) => song.id === selectedSong?.id);

  const nextSong = () => {
    if (selectedSong === null) {
      setSelectedSong(songs[0]);
    } else {
      if (index === songs.length - 1) {
        setSelectedSong(songs[0]);
      } else {
        setSelectedSong(songs[index + 1]);
      }
    }
  };

  const prevSong = () => {
    if (selectedSong === null) {
      setSelectedSong(songs[songs.length - 1]);
    } else {
      if (index === 0) {
        setSelectedSong(songs[songs.length - 1]);
      } else {
        setSelectedSong(songs[index - 1]);
      }
    }
  };

  const filteredSongs = songs.filter((song) => {
    return (
      song.title.toLowerCase().includes(searchMusic.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchMusic.toLowerCase())
    );
  });

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-[#050816] pt-50 text-white'>
      <SearchBar
        onSearch={handleSearch}
        clearSearch={handleClear}
        searchMusic={searchMusic}
      />
      <div className='pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl' />

      <div className='pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl' />

      <div className='relative mx-auto w-full max-w-6xl px-12 py-3'>
        {loading ? (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className='rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl'
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
          <Carousel
            opts={{
              align: 'start',
              loop: false,
            }}
            className='w-full'
          >
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

            <CarouselPrevious className='-left-14 size-12 border-white/10 bg-white/[0.08] text-white backdrop-blur-md hover:bg-white/[0.16] hover:text-white' />

            <CarouselNext className='-right-14 size-12 border-white/10 bg-white/[0.08] text-white backdrop-blur-md hover:bg-white/[0.16] hover:text-white' />
          </Carousel>
        )}
      </div>
      <Audioplayer song={selectedSong} onNext={nextSong} onPrev={prevSong} />
    </div>
  );
}
