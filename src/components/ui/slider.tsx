import * as React from 'react';
import { Slider as RadixSlider } from 'radix-ui';

import { cn } from 'src/lib/utils';

export const Slider = React.forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSlider.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  const count = (Array.isArray(value) ? value.length : Array.isArray(defaultValue) ? defaultValue.length : 1) || 1;
  return (
    <RadixSlider.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <RadixSlider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--color-track)]">
        <RadixSlider.Range className="absolute h-full holographic-bg" />
      </RadixSlider.Track>
      {Array.from({ length: count }).map((_, i) => (
        <RadixSlider.Thumb
          key={i}
          className="block size-4 rounded-full border-2 border-cyan bg-[var(--color-control-thumb)] shadow-[var(--shadow-z1)] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      ))}
    </RadixSlider.Root>
  );
});
Slider.displayName = 'Slider';

/** 双端范围滑块：Slider 传入二元数组即双 thumb */
export function RangeSlider(props: React.ComponentPropsWithoutRef<typeof Slider>) {
  return <Slider {...props} />;
}
