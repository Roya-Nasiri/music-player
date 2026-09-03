import { Card, CardContent } from '@/components/ui/card';

export default function SongCard({ song, selected, onSelect }) {
  return (
    <Card
      onClick={onSelect}
      className={`group mx-auto w-full max-w-[240px] cursor-pointer overflow-hidden border border-white/10 bg-white/[0.06] text-white shadow-2xl backdrop-blur-xl transition-all duration-300 ${
        selected
          ? 'scale-[1.03] border-blue-400/50 bg-blue-500/[0.12] shadow-blue-500/20'
          : 'scale-[1.01] hover:border-white/20 hover:bg-white/[0.1] hover:shadow-blue-500/10'
      }`}
    >
      <CardContent className='p-3'>
        <div className='relative overflow-hidden rounded-xl'>
          <img
            src={song.image}
            alt={song.artist}
            className='aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105'
          />

          {/* Image overlay */}
          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' />
        </div>

        <div className='mt-3 px-1'>
          <h3 className='truncate text-sm font-semibold tracking-wide'>
            {song.title}
          </h3>

          <p className='mt-1 truncate text-xs text-white/50'>{song.artist}</p>
        </div>
      </CardContent>
    </Card>
  );
}
