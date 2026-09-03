'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Repeat1,
} from 'lucide-react';

import Image from 'next/image';

export default function Audioplayer({ song, onNext, onPrev }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [repeatAll, setRepeatAll] = useState(false);

  const audioRef = useRef(null);

  const playPause = () => {
    if (song !== null) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (song === null) {
      return;
    }

    setCurrentTime(0);
    setDuration(0);

    audioRef.current.play();
    setIsPlaying(true);
  }, [song]);

  const timeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const durationTime = () => {
    setDuration(audioRef.current.duration);
  };

  const handleChange = (value) => {
    audioRef.current.currentTime = value;
  };

  const handleEnd = () => {
    if (repeat === true) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    } else if (repeatAll === true) {
      onNext();
    } else {
      setIsPlaying(false);
    }
  };

  const handleRepeatAll = () => {
    setRepeatAll((prev) => !prev);
    setRepeat(false);
  };

  const handleRepeat = () => {
    setRepeat((prev) => !prev);
    setRepeatAll(false);
  };

  const formatTime = (time) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);

    return minute + ':' + String(second).padStart(2, '0');
  };

  return (
    <Card
      className={`fixed bottom-4 left-1/2 z-50 w-[calc(100%-1rem)] max-w-7xl -translate-x-1/2 rounded-2xl border bg-white/[0.07] text-white shadow-2xl backdrop-blur-2xl sm:bottom-6 sm:w-[calc(100%-2rem)] ${
        isPlaying
          ? ' border-white/20 bg-blue-500/[0.12] shadow-blue-500/20'
          : 'border-white/20 bg-white/10 shadow-blue-500/10'
      }`}
    >
      <CardContent className='mx-auto flex w-full flex-col gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:flex-row lg:items-center lg:gap-6 lg:px-12'>
        {/* Song Info + Controls */}
        <div className='flex w-full min-w-0 items-center justify-center gap-3 lg:w-[200px] lg:shrink-0'>
          {song && (
            <Image
              className='h-12 w-12 shrink-0 rounded-xl object-cover shadow-lg ring-1 ring-white/10 sm:h-14 sm:w-14'
              src={song.image}
              alt={song.title}
              width={500}
              height={500}
              unoptimized
            />
          )}
          <div className='min-w-0 lg:flex-1'>
            <div className='truncate text-sm font-semibold tracking-wide text-white'>
              {song ? song.title : 'Select a song'}
            </div>

            <div className='mt-1 truncate text-xs text-white/45'>
              {song ? song.artist : ''}
            </div>
          </div>
          {/* Controls - Mobile */}
          <div className='flex shrink-0 items-center gap-1 sm:gap-2 lg:hidden'>
            <Button
              size='icon'
              variant='ghost'
              onClick={onPrev}
              disabled={!song}
              className='size-9 border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/[0.16] hover:text-white sm:size-10'
            >
              <SkipBack className='size-4 sm:size-5' />
            </Button>

            <Button
              onClick={playPause}
              size='icon'
              style={{
                width: isPlaying ? '48px' : '44px',
                height: isPlaying ? '48px' : '44px',
              }}
              className={`rounded-full border text-white shadow-lg backdrop-blur-md transition-all duration-300 ${
                isPlaying
                  ? 'border-white/40 bg-white/[0.28] shadow-white/10'
                  : 'border-white/20 bg-white/[0.16]'
              } hover:scale-110 hover:bg-white/[0.24]`}
              disabled={!song}
            >
              {isPlaying ? (
                <Pause className='size-4 sm:size-5' />
              ) : (
                <Play className='size-4 sm:size-5' />
              )}
            </Button>

            <Button
              size='icon'
              variant='ghost'
              onClick={onNext}
              disabled={!song}
              className='size-9 border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/[0.16] hover:text-white sm:size-10'
            >
              <SkipForward className='size-4 sm:size-5' />
            </Button>
          </div>
        </div>

        {/* Controls - Desktop */}
        <div className='hidden shrink-0 items-center gap-2 lg:flex'>
          <Button
            size='icon'
            variant='ghost'
            onClick={onPrev}
            disabled={!song}
            className='border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/[0.16] hover:text-white'
          >
            <SkipBack className='size-5' />
          </Button>

          <Button
            onClick={playPause}
            size='icon'
            style={{
              width: isPlaying ? '48px' : '44px',
              height: isPlaying ? '48px' : '44px',
            }}
            className={`rounded-full border text-white shadow-lg backdrop-blur-md transition-all duration-300 ${
              isPlaying
                ? 'border-white/40 bg-white/[0.38] shadow-white/10'
                : 'border-white/20 bg-white/[0.16]'
            } hover:scale-110 hover:bg-white/[0.24]`}
            disabled={!song}
          >
            {isPlaying ? (
              <Pause className='size-5' />
            ) : (
              <Play className='size-5' />
            )}
          </Button>

          <Button
            size='icon'
            variant='ghost'
            onClick={onNext}
            disabled={!song}
            className='border border-white/10 bg-white/[0.08] text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/[0.16] hover:text-white'
          >
            <SkipForward className='size-5' />
          </Button>
        </div>

        {/* Progress */}
        <div className='flex w-full min-w-0 items-center gap-2 sm:gap-3'>
          <span className='w-9 shrink-0 text-right text-xs font-medium text-white/60'>
            {formatTime(currentTime)}
          </span>

          {duration > 0 && (
            <Slider
              min={0}
              max={duration}
              value={currentTime}
              onValueChange={handleChange}
              className='min-w-0 flex-1 cursor-pointer'
            />
          )}

          <span className='w-9 shrink-0 text-xs font-medium text-white/60'>
            {formatTime(duration)}
          </span>
        </div>

        {/* Repeat */}
        <div className='flex w-full shrink-0 items-center justify-center gap-2 lg:w-auto lg:justify-end'>
          <Button
            onClick={handleRepeat}
            variant='ghost'
            size='icon'
            className={`border backdrop-blur-md transition-all ${
              repeat
                ? 'relative border-blue-300/70 bg-blue-400/40 text-white shadow-lg shadow-blue-400/30 ring-1 ring-blue-300/20'
                : 'border-white/10 bg-white/[0.08] text-white/70 hover:bg-white/[0.16] hover:text-white'
            }`}
          >
            <Repeat1 className='size-5' />
          </Button>

          <Button
            onClick={handleRepeatAll}
            variant='ghost'
            size='icon'
            className={`border backdrop-blur-md transition-all ${
              repeatAll
                ? 'relative border-blue-300/70 bg-blue-400/40 text-white shadow-lg shadow-blue-400/30 ring-1 ring-blue-300/20'
                : 'border-white/10 bg-white/[0.08] text-white/70 hover:bg-white/[0.16] hover:text-white'
            }`}
          >
            <Repeat className='size-5' />
          </Button>
        </div>

        <audio
          onEnded={handleEnd}
          preload='metadata'
          onLoadedMetadata={durationTime}
          onTimeUpdate={timeUpdate}
          ref={audioRef}
          src={song?.src}
        />
      </CardContent>
    </Card>
  );
}
