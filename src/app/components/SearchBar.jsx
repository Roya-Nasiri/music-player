import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, clearSearch, searchMusic }) {
  return (
    <div className='absolute left-1/2 top-24 z-10 w-full max-w-md -translate-x-1/2 px-4'>
      <div className='relative'>
        <input
          value={searchMusic}
          type='text'
          id='search'
          placeholder='Search songs or artists...'
          className='h-12 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-5 pr-12 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/35 focus:border-blue-400/40 focus:bg-white/[0.1] focus:ring-2 focus:ring-blue-400/10'
          onChange={onSearch}
        />

        <div className='absolute right-4 top-1/2 -translate-y-1/2 text-white/40'>
          {searchMusic === '' ? (
            <Search />
          ) : (
            <X onClick={clearSearch} className='cursor-pointer' />
          )}
        </div>
      </div>
    </div>
  );
}
