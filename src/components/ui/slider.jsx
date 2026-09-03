import { Slider as SliderPrimitive } from '@base-ui/react/slider';

import { cn } from '@/lib/utils';

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [value];

  return (
    <SliderPrimitive.Root
      className={cn('data-horizontal:w-full data-vertical:h-full', className)}
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment='edge'
      {...props}
    >
      <SliderPrimitive.Control className='relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col'>
        <SliderPrimitive.Track
          data-slot='slider-track'
          className='relative grow overflow-hidden rounded-full bg-white/10 select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1'
        >
          <SliderPrimitive.Indicator
            data-slot='slider-range'
            className='bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.7)] select-none data-horizontal:h-full data-vertical:w-full'
          />

          {/* {Array.from({ length: _values.length }, (_, index) => (
          ))} */}
          <SliderPrimitive.Thumb
            data-slot='slider-thumb'
            className='relative block size-2 shrink-0 rounded-full border border-white/80 bg-white shadow-[0_0_8px_rgba(96,165,250,0.9)] ring-blue-400/40 transition-[box-shadow,transform] select-none after:absolute after:-inset-2 hover:scale-125 hover:shadow-[0_0_12px_rgba(96,165,250,1)] focus-visible:ring-3 focus-visible:outline-hidden active:scale-125 disabled:pointer-events-none disabled:opacity-50'
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
